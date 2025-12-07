import { jsPDF } from "jspdf";
import { User } from "../../../../../data/types";
import { COLORS, CONSTANTS } from "./PDFConfig";

export interface SummaryRow {
  label: string;
  value: string;
  isTotal?: boolean;
}

export class PDFFooter {
  private doc: jsPDF;
  private width: number;
  private height: number;
  private margin: number;

  constructor(doc: jsPDF) {
    this.doc = doc;
    this.width = doc.internal.pageSize.getWidth();
    this.height = doc.internal.pageSize.getHeight();
    this.margin = CONSTANTS.MARGIN;
  }

  renderSummaryBox(rows: SummaryRow[], startY: number): number {
    let y = startY + 5;
    const boxW = 80;
    const boxX = this.width - this.margin - boxW;

    rows.forEach(row => {
        const h = row.isTotal ? 10 : 7;
        
        if (y + h > this.height - this.margin - 40) { // Keep space for bottom info
            this.doc.addPage();
            y = this.margin;
        }

        if (row.isTotal) {
             this.doc.setFillColor(COLORS.PRIMARY.r, COLORS.PRIMARY.g, COLORS.PRIMARY.b);
             this.doc.roundedRect(boxX, y, boxW, h, 1, 1, 'F');
             this.doc.setTextColor(255, 255, 255);
             this.doc.setFont('helvetica', 'bold');
             this.doc.setFontSize(11);
             this.doc.text(row.label, boxX + 4, y + 6.5);
             this.doc.text(row.value, boxX + boxW - 4, y + 6.5, { align: 'right' });
        } else {
             this.doc.setTextColor(COLORS.SLATE_500.r, COLORS.SLATE_500.g, COLORS.SLATE_500.b);
             this.doc.setFont('helvetica', 'bold');
             this.doc.setFontSize(9);
             this.doc.text(row.label, boxX + 4, y + 5);
             this.doc.setTextColor(COLORS.SLATE_900.r, COLORS.SLATE_900.g, COLORS.SLATE_900.b);
             this.doc.text(row.value, boxX + boxW - 4, y + 5, { align: 'right' });
        }
        y += h;
    });

    return y;
  }

  renderBottomInfo(user: User | null, refText: string, startY: number): number {
    let y = startY;
    const neededHeight = 25;
    if (y + neededHeight > this.height - this.margin - 15) { // Keep space for page footer
        this.doc.addPage();
        y = this.margin;
    }
    y += 5;
    
    this.doc.setDrawColor(COLORS.SLATE_400.r, COLORS.SLATE_400.g, COLORS.SLATE_400.b);
    this.doc.setLineWidth(0.1);
    this.doc.line(this.margin, y, this.width - this.margin, y);
    y += 5;
    
    const contentY = y;
    
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(8);
    this.doc.setTextColor(COLORS.SLATE_700.r, COLORS.SLATE_700.g, COLORS.SLATE_700.b);
    this.doc.text('PAYMENT DETAILS', this.margin, contentY + 3);
    
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(COLORS.SLATE_500.r, COLORS.SLATE_500.g, COLORS.SLATE_500.b);

    if (user && user.bankDetails) {
        this.doc.text(`${user.bankDetails.bankName} • Sort: ${user.bankDetails.sortCode} • Acc: ${user.bankDetails.accountNumber}`, this.margin, contentY + 8);
        this.doc.text(`Beneficiary: ${user.firstName} ${user.lastName}`, this.margin, contentY + 12);
    } else {
        this.doc.text('Bank Details: Not provided in profile', this.margin, contentY + 8);
    }

    this.doc.text(`Ref: ${refText}`, this.margin, contentY + 16);

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(10);
    this.doc.setTextColor(COLORS.PRIMARY.r, COLORS.PRIMARY.g, COLORS.PRIMARY.b);
    this.doc.text('Thank you for your business', this.width - this.margin, contentY + 8, { align: 'right' });
    
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8);
    this.doc.setTextColor(COLORS.SLATE_400.r, COLORS.SLATE_400.g, COLORS.SLATE_400.b);
    this.doc.text(`Jambo Linguists Ltd • Reg: 15333696`, this.width - this.margin, contentY + 13, { align: 'right' });
    
    return y + neededHeight;
  }

  renderPageFooter(pageNumber: number, totalPages: number) {
    const footerY = this.height - (this.margin / 2);
    this.doc.setFont('helvetica', 'italic');
    this.doc.setFontSize(7);
    this.doc.setTextColor(COLORS.SLATE_400.r, COLORS.SLATE_400.g, COLORS.SLATE_400.b);
    
    const disclaimer = "This is a computer-generated document and does not require a signature.";
    this.doc.text(disclaimer, this.width / 2, footerY, { align: 'center' });

    const pageStr = `Page ${pageNumber} of ${totalPages}`;
    const textWidth = this.doc.getStringUnitWidth(pageStr) * this.doc.getFontSize() / this.doc.internal.scaleFactor;
    this.doc.text(pageStr, this.width - this.margin, footerY);
  }
}
