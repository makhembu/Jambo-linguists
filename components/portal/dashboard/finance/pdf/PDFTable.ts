import { jsPDF } from "jspdf";
import { COLORS, CONSTANTS } from "./PDFConfig";

export interface PDFTableColumn {
  header: string;
  weight: number;
  align: 'left' | 'right' | 'center';
}

export class PDFTable {
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

  render(columns: PDFTableColumn[], rows: string[][], startY: number): number {
    let y = startY;
    const availW = this.width - this.margin * 2;
    
    // Calculate Column Widths
    const totalWeight = columns.reduce((sum, c) => sum + c.weight, 0);
    const colWidths = columns.map(c => (c.weight / totalWeight) * availW);
    const colX = columns.reduce<number[]>((acc, _, i) => {
        acc.push(i === 0 ? this.margin : acc[i-1] + colWidths[i-1]);
        return acc;
    }, []);

    const headerH = 10;
    const rowPadding = 3;

    // Helper: Draw Header
    const drawHeader = (currY: number) => {
        this.doc.setFillColor(COLORS.PRIMARY.r, COLORS.PRIMARY.g, COLORS.PRIMARY.b);
        this.doc.rect(this.margin, currY, availW, headerH, 'F'); 
        this.doc.setTextColor(255, 255, 255);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(9);
        columns.forEach((col, i) => {
            let px = colX[i] + 3; // Default left
            if (col.align === 'right') px = colX[i] + colWidths[i] - 3;
            if (col.align === 'center') px = colX[i] + (colWidths[i] / 2);
            
            this.doc.text(col.header, px, currY + 6.5, { align: col.align });
        });
        return currY + headerH;
    };

    y = drawHeader(y);

    // Draw Rows
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9);

    for (let i = 0; i < rows.length; i++) {
        const rowData = rows[i];
        
        let maxLines = 1;
        columns.forEach((_, cIdx) => {
            const text = rowData[cIdx] ? String(rowData[cIdx]) : '';
            const lines = this.doc.splitTextToSize(text, colWidths[cIdx] - 6);
            if(lines.length > maxLines) {
                maxLines = lines.length;
            }
        });

        const rowH = (maxLines * 4) + (rowPadding * 2) + 2;

        // Page Break Logic - Check if row fits on page (with buffer for footer)
        if (y + rowH > this.height - this.margin - 20) {
            this.doc.addPage();
            y = this.margin;
            y = drawHeader(y);
        }
        
        // Zebra Stripe
        if (i % 2 === 0) {
            this.doc.setFillColor(COLORS.SLATE_50.r, COLORS.SLATE_50.g, COLORS.SLATE_50.b);
            this.doc.rect(this.margin, y, availW, rowH, 'F');
        }

        this.doc.setTextColor(COLORS.SLATE_700.r, COLORS.SLATE_700.g, COLORS.SLATE_700.b);
        const cy = y + rowPadding + 3.5;

        // Render Cells
        columns.forEach((col, cIdx) => {
            const text = rowData[cIdx] ? String(rowData[cIdx]) : '';
            const cellLines = this.doc.splitTextToSize(text, colWidths[cIdx] - 6);
            
            let px = colX[cIdx] + 3; 
            if (col.align === 'right') px = colX[cIdx] + colWidths[cIdx] - 3;
            if (col.align === 'center') px = colX[cIdx] + (colWidths[cIdx] / 2);

            if (cIdx === columns.length - 1) this.doc.setFont('helvetica', 'bold');
            else this.doc.setFont('helvetica', 'normal');

            this.doc.text(cellLines, px, cy, { align: col.align });
        });

        // Bottom Line
        this.doc.setDrawColor(226, 232, 240);
        this.doc.setLineWidth(0.1);
        this.doc.line(this.margin, y + rowH, this.width - this.margin, y + rowH);
        
        y += rowH;
    }

    return y;
  }
}