import { jsPDF } from "jspdf";
import { Invoice, User, mockDb } from "@/data/mockDatabase";
import { CONSTANTS, COLORS, formatCurrency, formatDateUK, getCompanyLogo } from "./PDFConfig";
import { HeaderMeta, PDFHeader } from "./PDFHeader";
import { PDFTable, PDFTableColumn } from "./PDFTable";
import { PDFFooter, SummaryRow } from "./PDFFooter";
import { getInterpretingJobPayoutDetails } from "../../jobs/job-helpers";

export class InvoicePDF {
  
  static async generate(invoice: Invoice, user: User | null) {
    // 1. Data Preparation
    const { columns, tableRows } = this.getTableData(invoice);
    
    // 2. Document Initialization
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const logoUrl = await getCompanyLogo();
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    const margin = CONSTANTS.MARGIN;

    // 3. Header
    const header = new PDFHeader(doc);
    const meta: HeaderMeta[] = [
        { label: 'Invoice No.', value: invoice.reference },
        { label: 'Issue Date', value: formatDateUK(invoice.date) },
        { label: 'Due Date', value: formatDateUK(invoice.dueDate) },
        { label: 'Status', value: invoice.status },
    ];
    
    let recipientUser = user;
    if (!user && invoice.customRecipient) {
        recipientUser = {
            id: 'custom',
            firstName: invoice.customRecipient.name,
            lastName: '',
            email: invoice.customRecipient.email || '',
            location: invoice.customRecipient.address || '',
            role: 'client',
            isVerified: true,
            createdAt: ''
        } as User;
    }

    let currentY = header.render('INVOICE', recipientUser, meta, logoUrl, margin);

    // 4. Table
    const table = new PDFTable(doc);
    currentY = table.render(columns, tableRows, currentY);

    // 5. Summary and Footer
    const footer = new PDFFooter(doc);
    const summary = this.getSummaryData(invoice);

    // Determine position for summary box and footer info
    let summaryY = currentY + 5;
    const summaryHeight = 24; // approx for subtotal, vat, total
    const bottomInfoHeight = 40; // approx for payment details, thank you, line

    if (summaryY + summaryHeight + bottomInfoHeight > height - margin) {
        doc.addPage();
        summaryY = margin;
    }
    
    const summaryBottomY = footer.renderSummaryBox(summary, summaryY);
    
    // The footer info starts after the summary box. This will draw the line, then payment details and thank you.
    footer.renderBottomInfo(recipientUser, invoice.reference, summaryBottomY + 5);


    // 6. Add Page Footers to all pages
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        footer.renderPageFooter(i, totalPages);
    }

    doc.save(`invoice-${invoice.reference}.pdf`);
  }

  private static getTableData(invoice: Invoice) {
    const allJobs = mockDb.getAllJobs();
    
    const columns: PDFTableColumn[] = [
        { header: 'Description', weight: 4, align: 'left' },
        { header: 'Qty/Ref', weight: 2.5, align: 'left' },
        { header: 'Date', weight: 2, align: 'left' },
        { header: 'Rate', weight: 2.5, align: 'left' },
        { header: 'Amount', weight: 2, align: 'right' }
    ];

    const tableRows: string[][] = [];

    for (const item of invoice.items) {
      const job = item.jobId ? allJobs.find(j => j.id === item.jobId) : undefined;
      
      if (!job) {
          // Manual Item
          tableRows.push([
              item.description, 
              item.quantity ? String(item.quantity) : '—', 
              item.date ? formatDateUK(item.date) : '—', 
              item.rate ? formatCurrency(item.rate) : '—', 
              formatCurrency(item.amount)
          ]);
          continue;
      }

      // Job Linked Item Logic
      if (job.category === 'Interpreting') {
          const details = getInterpretingJobPayoutDetails(job);
          if (details) {
              if (details.sessionPay > 0) {
                  tableRows.push([
                      `Interpreting Session: ${job.title}`,
                      job.id,
                      formatDateUK(job.date),
                      `${details.hours.toFixed(2)} hrs @ ${formatCurrency(job.hourlyRate || 0)}/hr`,
                      formatCurrency(details.sessionPay)
                  ]);
              }
              if (details.mileagePay > 0) {
                  tableRows.push([
                      'Travel - Mileage',
                      job.id,
                      formatDateUK(job.date),
                      `${job.distance} mi @ ${formatCurrency(job.mileageRate || 0)}/mi`,
                      formatCurrency(details.mileagePay)
                  ]);
              }
              if (details.travelPay > 0) {
                  tableRows.push([
                      'Travel - Time',
                      job.id,
                      formatDateUK(job.date),
                      `${job.travelHours || 0} hrs @ ${formatCurrency(job.travelRate || 0)}/hr`,
                      formatCurrency(details.travelPay)
                  ]);
              }
          } else {
               tableRows.push([
                  `${job.category}: ${job.title}`,
                  job.id, formatDateUK(job.date), job.duration || 'N/A', formatCurrency(item.amount)
              ]);
          }
      } else if (job.category === 'Translation') {
          const wordCount = job.wordCount || 0;
          const rateDetail = job.fixedRate 
              ? 'Fixed Rate' 
              : `${wordCount.toLocaleString()} words @ ${formatCurrency(job.wordRate || 0)}/word`;

          tableRows.push([
              `Translation: ${job.title}`,
              job.id,
              formatDateUK(job.date),
              rateDetail,
              formatCurrency(item.amount)
          ]);
      } else if (job.category === 'Transcription') {
          const duration = job.duration || 'N/A';
          const rateDetail = `${duration} @ ${formatCurrency(job.minuteRate || 0)}/min`;
           tableRows.push([
              `Transcription: ${job.title}`,
              job.id,
              formatDateUK(job.date),
              rateDetail,
              formatCurrency(item.amount)
          ]);
      } else {
          tableRows.push([
              `${job.category}: ${job.title}`,
              job.id, formatDateUK(job.date), job.duration || 'N/A', formatCurrency(item.amount)
          ]);
      }
    }

    return { columns, tableRows };
  }

  private static getSummaryData(invoice: Invoice): SummaryRow[] {
    const summary: SummaryRow[] = [];
    if (invoice.vatRate && invoice.vatRate > 0) {
        const subtotal = invoice.subtotal || (invoice.amount / (1 + invoice.vatRate / 100));
        const vatAmount = invoice.amount - subtotal;
        
        summary.push({ label: 'Subtotal', value: formatCurrency(subtotal) });
        summary.push({ label: `VAT (${invoice.vatRate}%)`, value: formatCurrency(vatAmount) });
    } else {
        summary.push({ label: 'Subtotal', value: formatCurrency(invoice.amount) });
    }
    summary.push({ label: 'Total Due', value: formatCurrency(invoice.amount), isTotal: true });
    return summary;
  }
}