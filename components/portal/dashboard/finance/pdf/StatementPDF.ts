import { jsPDF } from "jspdf";
import { Invoice, User } from "../../../../../data/mockDatabase";
import { CONSTANTS, formatCurrency, formatDateUK, getCompanyLogo } from "./PDFConfig";
import { HeaderMeta, PDFHeader } from "./PDFHeader";
import { PDFTable, PDFTableColumn } from "./PDFTable";
import { PDFFooter, SummaryRow } from "./PDFFooter";

export class StatementPDF {
  
  static async generate(invoices: Invoice[], user: User | null, periodLabel: string) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const logoUrl = await getCompanyLogo();
    
    // Stats Calc
    const totalBilled = invoices.reduce((sum, i) => sum + i.amount, 0);
    const totalPaid = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
    const balanceDue = totalBilled - totalPaid;

    // 1. Header
    const header = new PDFHeader(doc);
    const meta: HeaderMeta[] = [
        { label: 'Statement Date', value: formatDateUK(new Date().toISOString()) },
        { label: 'Period', value: periodLabel },
        { label: 'Total Invoices', value: invoices.length.toString() },
    ];
    let currentY = header.render('STATEMENT OF ACCOUNT', user, meta, logoUrl, CONSTANTS.MARGIN);
  
    // 2. Table
    const table = new PDFTable(doc);
    const columns: PDFTableColumn[] = [
        { header: 'Date', weight: 2, align: 'left' },
        { header: 'Invoice No.', weight: 3, align: 'left' },
        { header: 'Status', weight: 2, align: 'center' },
        { header: 'Billed', weight: 2, align: 'right' },
        { header: 'Paid', weight: 2, align: 'right' },
    ];
  
    const rows = invoices.map(inv => {
        const isPaid = inv.status === 'Paid';
        return [
            formatDateUK(inv.date),
            inv.reference,
            inv.status.toUpperCase(),
            formatCurrency(inv.amount),
            isPaid ? formatCurrency(inv.amount) : '£0.00'
        ];
    });
  
    currentY = table.render(columns, rows, currentY);
  
    // 3. Footer & Summary
    const footer = new PDFFooter(doc);
    const summary: SummaryRow[] = [
        { label: 'Total Billed', value: formatCurrency(totalBilled) },
        { label: 'Total Paid', value: formatCurrency(totalPaid) },
        { label: 'Balance Due', value: formatCurrency(balanceDue), isTotal: true },
    ];
    
    const summaryHeight = 40; // Estimate for summary box
    if (currentY + summaryHeight > doc.internal.pageSize.getHeight() - CONSTANTS.MARGIN - 20) {
        doc.addPage();
        currentY = CONSTANTS.MARGIN;
    }

    currentY = footer.renderSummaryBox(summary, currentY);

    // 4. Add Page Footers to all pages
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      footer.renderPageFooter(i, totalPages);
    }
  
    doc.save(`statement-${user ? `${user.lastName}-` : ''}${new Date().toISOString().split('T')[0]}.pdf`);
  }
}