import { jsPDF } from "jspdf";
import { COLORS, CONSTANTS } from "./PDFConfig";

export class CertificateTemplate {
  private doc: jsPDF;
  private width: number;
  private height: number;

  constructor(doc: jsPDF) {
    this.doc = doc;
    this.width = CONSTANTS.A4_LANDSCAPE_WIDTH;
    this.height = CONSTANTS.A4_LANDSCAPE_HEIGHT;
  }

  drawBackground(logoUrl: string | null) {
    // --- TOP LEFT DECORATION ---
    // Large Purple Triangle
    this.doc.setFillColor(COLORS.PRIMARY.r, COLORS.PRIMARY.g, COLORS.PRIMARY.b);
    // Draw triangle: (x1,y1, x2,y2, x3,y3)
    this.doc.triangle(0, 0, 100, 0, 0, 100, 'F');

    // Smaller Orange Triangle overlay
    this.doc.setFillColor(COLORS.ORANGE.r, COLORS.ORANGE.g, COLORS.ORANGE.b);
    this.doc.triangle(0, 0, 80, 0, 0, 80, 'F');

    // --- LOGO RENDERING ---
    if (logoUrl && typeof logoUrl === 'string' && logoUrl.length > 20) {
      try {
        let format = 'JPEG';
        if (logoUrl.includes('image/png')) {
            format = 'PNG';
        }
        // Add Logo on top of decoration
        this.doc.addImage(logoUrl, format, 15, 15, 40, 15);
      } catch (e: any) {
        console.warn("[PDF] Failed to add logo image to certificate:", e);
      }
    }

    // --- BOTTOM RIGHT DECORATION ---
    // Large Gold Triangle
    this.doc.setFillColor(COLORS.GOLD.r, COLORS.GOLD.g, COLORS.GOLD.b);
    this.doc.triangle(
        this.width, this.height, 
        this.width - 80, this.height, 
        this.width, this.height - 80, 
        'F'
    );

    // Medium Purple Triangle
    this.doc.setFillColor(COLORS.PRIMARY.r, COLORS.PRIMARY.g, COLORS.PRIMARY.b);
    this.doc.triangle(
        this.width, this.height, 
        this.width - 60, this.height, 
        this.width, this.height - 60, 
        'F'
    );

    // --- FRAME BORDER ---
    this.doc.setDrawColor(COLORS.GOLD.r, COLORS.GOLD.g, COLORS.GOLD.b);
    this.doc.setLineWidth(1.5);
    this.doc.rect(8, 8, this.width - 16, this.height - 16);
  }
}