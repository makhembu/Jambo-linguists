
import { ComplianceDocument } from '../types';

const INITIAL_CONDUCT_HTML = `
<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">1. Professionalism & Integrity</h4>
<p class="mb-4">
  Freelancers must maintain the highest standards of professionalism. This includes punctuality, appropriate dress codes for face-to-face assignments, and polite communication. You represent Jambo Linguists in every interaction.
</p>
<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">2. Confidentiality (GDPR)</h4>
<p class="mb-4">
  Strict adherence to GDPR is mandatory. No client data may be stored on personal devices after an assignment is complete. Any notes taken during interpretation must be shredded immediately.
</p>
<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">3. Accuracy & Neutrality</h4>
<p class="mb-4">
  Interpreters must translate precisely what is said, without adding, omitting, or changing meaning. You must remain neutral and unbiased, regardless of the sensitive nature of the assignment (e.g., Court, NHS, Police).
</p>
<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">4. Quality Assurance</h4>
<p class="mb-4">
  We conduct random spot checks and client feedback reviews. Falling below our quality threshold may result in removal from the portal.
</p>

<div class="my-8 p-4 bg-jambo-50 rounded-lg border border-jambo-100 text-jambo-800 text-sm">
   <strong>Important Note:</strong> Failure to adhere to these standards may result in immediate suspension from the platform.
</div>
`;

const INITIAL_PRIVACY_HTML = `
<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">1. Data Collection</h4>
<p class="mb-4">We collect personal data required for your assignment and payment processing. This includes name, contact details, and bank information.</p>

<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">2. Data Usage</h4>
<p class="mb-4">Your data is used solely for the purpose of matching you with assignments and ensuring compliance with UK employment laws.</p>

<h4 class="text-jambo-600 font-bold mb-2 text-lg font-serif">3. Your Rights</h4>
<p class="mb-4">You have the right to request access to your data or request deletion, subject to legal retention requirements.</p>
`;

export const initialComplianceDocs: ComplianceDocument[] = [
    {
        id: 'doc-conduct',
        title: 'Code of Conduct',
        type: 'conduct',
        content: INITIAL_CONDUCT_HTML,
        lastUpdated: '2024-10-01T09:00:00Z',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-10-01T09:00:00Z',
        deletedAt: null
    },
    {
        id: 'doc-privacy',
        title: 'Privacy Policy & GDPR',
        type: 'privacy',
        content: INITIAL_PRIVACY_HTML,
        lastUpdated: '2023-11-15T10:00:00Z',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-11-15T10:00:00Z',
        deletedAt: null
    }
];
