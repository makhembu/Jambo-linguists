
import { jsPDF } from 'jspdf';
import { EnrichedCourse, User } from '../../../../../data/types';
import { CertificateTemplate } from './CertificateTemplate';
import { CertificateContent } from './CertificateContent';
import { getCompanyLogo } from './PDFConfig';

export const generateCertificatePDF = async (course: EnrichedCourse, user: User | null) => {
    if (!user) {
        console.error("[PDF Gen] User not found, cannot generate certificate.");
        return;
    }

    try {
        console.log(`[PDF Gen] Starting generation for course "${course.title}" and user "${user.firstName}".`);
        
        console.log("[PDF Gen] Initializing jsPDF...");
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        
        const template = new CertificateTemplate(doc);
        const content = new CertificateContent(doc);
        
        console.log("[PDF Gen] Fetching logo...");
        let logoUrl: string | null = null;
        try {
            logoUrl = await getCompanyLogo();
        } catch (logoErr: any) {
            console.warn(`[PDF Gen] Error getting logo: ${logoErr.message}`);
        }

        console.log("[PDF Gen] Drawing background...");
        template.drawBackground(logoUrl);

        console.log("[PDF Gen] Drawing content...");
        content.drawText(user, course);

        const filename = `Jambo_Certificate_${course.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
        console.log(`[PDF Gen] Saving file: ${filename}`);
        doc.save(filename);
        
        console.log(`[PDF Gen] Complete.`);
    } catch (err: any) {
        console.error("[PDF Gen] CRITICAL FAILURE:", err);
        throw err; 
    }
};
