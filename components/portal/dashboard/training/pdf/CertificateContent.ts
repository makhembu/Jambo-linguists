import { jsPDF } from "jspdf";
import { EnrichedCourse, User } from "@/data/types";
import { COLORS, CONSTANTS, formatDateUK } from "./PDFConfig";

export class CertificateContent {
  private doc: jsPDF;
  private centerX: number;

  constructor(doc: jsPDF) {
    this.doc = doc;
    this.centerX = CONSTANTS.A4_LANDSCAPE_WIDTH / 2;
  }

  drawText(user: User, course: EnrichedCourse) {
    // --- MAIN TITLES ---
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(50);
    this.doc.setTextColor(COLORS.PRIMARY.r, COLORS.PRIMARY.g, COLORS.PRIMARY.b);
    this.doc.text('Certificate', this.centerX, 60, { align: 'center' });

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(20);
    this.doc.setTextColor(COLORS.SLATE_700.r, COLORS.SLATE_700.g, COLORS.SLATE_700.b);
    this.doc.text('OF ACHIEVEMENT', this.centerX, 72, { align: 'center' });
    
    // --- RECIPIENT ---
    this.doc.setFontSize(14);
    this.doc.setTextColor(COLORS.SLATE_500.r, COLORS.SLATE_500.g, COLORS.SLATE_500.b);
    this.doc.text('This is to certify that', this.centerX, 90, { align: 'center' });
    
    this.doc.setFont('times', 'bold');
    this.doc.setFontSize(36);
    this.doc.setTextColor(COLORS.SLATE_900.r, COLORS.SLATE_900.g, COLORS.SLATE_900.b);
    this.doc.text(`${user.firstName} ${user.lastName}`, this.centerX, 105, { align: 'center' });

    // --- COURSE DETAILS ---
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(14);
    this.doc.setTextColor(COLORS.SLATE_500.r, COLORS.SLATE_500.g, COLORS.SLATE_500.b);
    this.doc.text('has successfully completed the course', this.centerX, 120, { align: 'center' });

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(18);
    this.doc.setTextColor(COLORS.ORANGE.r, COLORS.ORANGE.g, COLORS.ORANGE.b);
    this.doc.text(course.title, this.centerX, 130, { align: 'center' });
    
    // --- SIGNATURES & DATE ---
    const lineY = 165;
    const sigWidth = 60;
    const dateX = this.centerX - 80;
    const sigX = this.centerX + 80;

    // Date Line
    this.doc.setDrawColor(COLORS.SLATE_500.r, COLORS.SLATE_500.g, COLORS.SLATE_500.b);
    this.doc.setLineWidth(0.5);
    this.doc.line(dateX - sigWidth/2, lineY, dateX + sigWidth/2, lineY);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(10);
    this.doc.text('Date', dateX, lineY + 7, { align: 'center' });
    const completionDate = course.progress?.completedAt ? formatDateUK(course.progress.completedAt) : '';
    this.doc.setFont('times', 'italic');
    this.doc.setFontSize(14);
    this.doc.setTextColor(COLORS.SLATE_700.r, COLORS.SLATE_700.g, COLORS.SLATE_700.b);
    this.doc.text(completionDate, dateX, lineY - 2, { align: 'center' });

    // Signature Line
    this.doc.line(sigX - sigWidth/2, lineY, sigX + sigWidth/2, lineY);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(10);
    this.doc.setTextColor(COLORS.SLATE_500.r, COLORS.SLATE_500.g, COLORS.SLATE_500.b);
    this.doc.text('Signature', sigX, lineY + 7, { align: 'center' });
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(11);
    this.doc.setTextColor(COLORS.PRIMARY.r, COLORS.PRIMARY.g, COLORS.PRIMARY.b);
    this.doc.text('Jambo Linguists Limited', sigX, lineY - 2, { align: 'center' });
  }
}
