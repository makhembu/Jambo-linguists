
import { jsPDF } from "jspdf";
import { Job, mockDb } from "@/data/mockDatabase";
import { CONSTANTS, COLORS, getCompanyLogo, formatDateUK, formatCurrency } from "../../../portal/dashboard/finance/pdf/PDFConfig";
import { PDFHeader } from "../../../portal/dashboard/finance/pdf/PDFHeader";
import { PDFFooter } from "../../../portal/dashboard/finance/pdf/PDFFooter";
import { getInterpretingJobPayoutDetails } from "../../../../portal/dashboard/jobs/job-helpers";

export class JobDetailsPDF {
  static async generate(job: Job) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const logoUrl = await getCompanyLogo();
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    const margin = CONSTANTS.MARGIN;
    const footerHeight = 40; // Reserve space for footer at bottom

    let y = margin;

    // --- HEADER ---
    const header = new PDFHeader(doc);
    const meta = [
      { label: 'Job Ref', value: job.id },
      { label: 'Status', value: job.status },
      { label: 'Created', value: formatDateUK(job.history.find(h => h.type === 'CREATED')?.date || new Date().toISOString()) }
    ];
    
    let recipientUser = null;
    if (job.clientId) {
        recipientUser = mockDb.getAllUsers().find(u => u.id === job.clientId) || null;
    } else if (job.linguistId) {
        recipientUser = mockDb.getAllUsers().find(u => u.id === job.linguistId) || null;
    }

    y = header.render('JOB ORDER', recipientUser, meta, logoUrl, margin);

    // --- MAIN TITLE & TAGS ---
    y += 5; // Reduced from 10
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(COLORS.PRIMARY.r, COLORS.PRIMARY.g, COLORS.PRIMARY.b);
    const titleLines = doc.splitTextToSize(job.title, width - (margin * 2));
    doc.text(titleLines, margin, y);
    y += (titleLines.length * 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(COLORS.ORANGE.r, COLORS.ORANGE.g, COLORS.ORANGE.b);
    const tags = `${job.languagePair.toUpperCase()} • ${job.category.toUpperCase()} • ${job.type.toUpperCase()}`;
    doc.text(tags, margin, y);
    y += 8; // Reduced from 12

    // --- PAGE BREAK HELPER ---
    const checkPageBreak = (heightNeeded: number) => {
        if (y + heightNeeded > height - footerHeight) {
            doc.addPage();
            y = margin + 10; // Add a small margin at top of new page
            return true;
        }
        return false;
    };

    // --- DRAW SECTION HELPER ---
    const drawSection = (title: string, data: {label: string, value: string}[]) => {
        // Pre-calculate height with tighter spacing
        const rowHeight = 9; // Reduced from 12
        const rowCount = Math.ceil(data.length / 2);
        const estimatedHeight = 8 + (rowCount * rowHeight) + 4; // Reduced estimates

        checkPageBreak(estimatedHeight);

        // --- DRAWING ---
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(COLORS.SLATE_900.r, COLORS.SLATE_900.g, COLORS.SLATE_900.b);
        doc.text(title.toUpperCase(), margin, y);
        
        doc.setDrawColor(COLORS.SLATE_400.r, COLORS.SLATE_400.g, COLORS.SLATE_400.b);
        doc.setLineWidth(0.1);
        doc.line(margin, y + 2, width - margin, y + 2);
        
        y += 7; // Reduced from 8

        const colWidth = (width - (margin * 2)) / 2;

        data.forEach((item, i) => {
            const isRight = i % 2 !== 0;
            const x = isRight ? margin + colWidth : margin;
            
            // Label
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(COLORS.SLATE_500.r, COLORS.SLATE_500.g, COLORS.SLATE_500.b);
            doc.text(item.label, x, y);
            
            // Value
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(COLORS.SLATE_900.r, COLORS.SLATE_900.g, COLORS.SLATE_900.b);
            
            const maxValWidth = colWidth - 5;
            const valLines = doc.splitTextToSize(item.value || '-', maxValWidth);
            doc.text(valLines, x, y + 4.5); // Tighter vertical alignment

            if (isRight) {
                // Move to next row
                y += rowHeight; 
            }
        });
        
        // If odd items, advance Y for next section manually
        if (data.length % 2 !== 0) y += rowHeight;
        y += 4; // Reduced section spacing
    };

    // --- LOGISTICS ---
    drawSection('Logistics Details', [
        { label: 'Assignment Date', value: formatDateUK(job.date) },
        { label: 'Time', value: job.time || 'N/A' },
        { label: 'Location', value: job.location },
        { label: 'Duration', value: job.duration || 'N/A' },
        { label: 'Urgency', value: job.isUrgent ? 'High Priority' : 'Standard' },
        { label: 'Start / Deadline', value: job.deadlineTime || job.time || 'N/A' }
    ]);

    // --- FINANCIALS ---
    drawSection('Financial Information', [
        { label: 'Agreed Rate', value: job.rate },
        { label: 'Est. Total Payout', value: job.totalPayout ? formatCurrency(job.totalPayout) : 'Calculated on completion' },
        ...(job.hourlyRate ? [{ label: 'Hourly Rate', value: formatCurrency(job.hourlyRate) }] : []),
        ...(job.travelRate ? [{ label: 'Travel Rate', value: formatCurrency(job.travelRate) }] : []),
        ...(job.mileageRate ? [{ label: 'Mileage Rate', value: formatCurrency(job.mileageRate) }] : []),
    ]);

    // --- DESCRIPTION ---
    // Calculate Description Height accurately with tighter box
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const descLines = doc.splitTextToSize(job.description, width - (margin * 2) - 8);
    const lineHeight = 4.5;
    const boxPadding = 6;
    const boxHeight = (descLines.length * lineHeight) + (boxPadding * 2);
    
    const headerHeight = 8; 
    const totalDescHeight = headerHeight + boxHeight + 8;

    checkPageBreak(totalDescHeight);

    // Draw Description Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(COLORS.SLATE_900.r, COLORS.SLATE_900.g, COLORS.SLATE_900.b);
    doc.text('INSTRUCTIONS / DESCRIPTION', margin, y);
    doc.setDrawColor(COLORS.SLATE_400.r, COLORS.SLATE_400.g, COLORS.SLATE_400.b);
    doc.line(margin, y + 2, width - margin, y + 2);
    y += 6;

    // Draw Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, width - (margin * 2), boxHeight, 'FD');
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(COLORS.SLATE_700.r, COLORS.SLATE_700.g, COLORS.SLATE_700.b);
    doc.text(descLines, margin + 4, y + boxPadding + 1);
    y += boxHeight + 8;

    // --- ASSIGNMENT ---
    if (job.linguistId) {
        const linguist = mockDb.getAllUsers().find(u => u.id === job.linguistId);
        if (linguist) {
             drawSection('Assigned Linguist', [
                { label: 'Name', value: `${linguist.firstName} ${linguist.lastName}` },
                { label: 'Email', value: linguist.email },
                { label: 'Phone', value: linguist.phone || 'N/A' },
                { label: 'Qualifications', value: linguist.qualifications?.join(', ') || 'N/A' }
            ]);
        }
    }

    // --- FOOTERS (Apply to ALL pages) ---
    const pageCount = doc.getNumberOfPages();
    const footer = new PDFFooter(doc);
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        const bottomY = height - 40;
        footer.renderBottomInfo(null, `REF: ${job.id} • Page ${i} of ${pageCount}`, bottomY);
    }

    doc.save(`job-${job.id}-details.pdf`);
  }
}
