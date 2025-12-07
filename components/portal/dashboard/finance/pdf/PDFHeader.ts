
import { jsPDF } from "jspdf";
import { User } from "@/data/types";
import { COLORS, CONSTANTS } from "./PDFConfig";

export interface HeaderMeta {
  label: string;
  value: string;
}

export class PDFHeader {
  private doc: jsPDF;
  private width: number;
  private margin: number;

  constructor(doc: jsPDF) {
    this.doc = doc;
    this.width = doc.internal.pageSize.getWidth();
    this.margin = CONSTANTS.MARGIN;
  }

  render(title: string, user: User | null, meta: HeaderMeta[], logoDataUrl: string | null, startY: number): number {
    let y = startY;

    // 1. Logo (Disabled per request)
    /*
    if (logoDataUrl) {
      try {
        const isPng = logoDataUrl.toLowerCase().includes('image/png') || logoDataUrl.toLowerCase().includes('.png');
        const format = isPng ? 'PNG' : 'JPEG';
        this.doc.addImage(logoDataUrl, format, this.margin, y, 15, 15, undefined, 'FAST');
      } catch (e) {
        console.warn('PDF Logo Error (Ignored):', e);
      }
    }
    */

    // 2. Company Address (Fixed for Jambo)
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8);
    this.doc.setTextColor(COLORS.SLATE_500.r, COLORS.SLATE_500.g, COLORS.SLATE_500.b);
    
    const address = [
        "Jambo Linguists Ltd",
        "First Floor, Radley House",
        "Richardshaw Rd",
        "Pudsey, LS28 6LE",
        "United Kingdom"
    ];
    let ay = y + 20;
    address.forEach(l => { this.doc.text(l, this.margin, ay); ay += 3.5; });
    this.doc.text(`Tel: +44 7938 065 717 • jamii@jambolinguists.com`, this.margin, ay);

    // 3. Document Title (INVOICE or STATEMENT)
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(24);
    this.doc.setTextColor(COLORS.PRIMARY.r, COLORS.PRIMARY.g, COLORS.PRIMARY.b);
    this.doc.text(title, this.width - this.margin, y + 10, { align: 'right' });

    y = Math.max(ay + 10, y + 30);
    const contentStartY = y;

    // 4. Recipient Info (Billed To)
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9);
    this.doc.setTextColor(COLORS.SLATE_400.r, COLORS.SLATE_400.g, COLORS.SLATE_400.b);
    this.doc.text('PREPARED FOR', this.margin, contentStartY);
    
    let billY = contentStartY + 5;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(11);
    this.doc.setTextColor(COLORS.SLATE_900.r, COLORS.SLATE_900.g, COLORS.SLATE_900.b);

    if (user) {
        this.doc.text(`${user.firstName} ${user.lastName}`, this.margin, billY); 
        billY += 5;
        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(10);
        this.doc.setTextColor(COLORS.SLATE_500.r, COLORS.SLATE_500.g, COLORS.SLATE_500.b);
        if (user.location) { this.doc.text(user.location, this.margin, billY); billY += 5; }
        this.doc.text(user.email, this.margin, billY); 
        billY += 5;
    } else {
        this.doc.text('Unknown Recipient', this.margin, billY);
    }

    // 5. Meta Data (Right Side)
    let metaY = contentStartY;
    const metaX = this.width - this.margin;
    const labelX = metaX - 40;

    meta.forEach(item => {
        if (!item.value) return;
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(9);
        this.doc.setTextColor(COLORS.SLATE_400.r, COLORS.SLATE_400.g, COLORS.SLATE_400.b);
        this.doc.text(item.label, labelX, metaY, { align: 'right' });
        this.doc.setTextColor(COLORS.SLATE_900.r, COLORS.SLATE_900.g, COLORS.SLATE_900.b);
        this.doc.text(item.value, metaX, metaY, { align: 'right' });
        metaY += 5;
    });

    return Math.max(billY, metaY) + 12;
  }
}
