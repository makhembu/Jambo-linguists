
import { BlogPost } from '../types';

export const initialBlogPosts: BlogPost[] = [
    {
        id: 'blog-1',
        title: 'The Importance of Cultural Competence in Medical Interpreting',
        slug: 'cultural-competence-medical-interpreting',
        excerpt: 'Why understanding cultural nuances is just as critical as language fluency when navigating healthcare scenarios.',
        content: `
Medical interpreting is more than just swapping words from one language to another. It requires a deep understanding of cultural contexts, especially when dealing with sensitive health issues.

### The Bridge Between Cultures

In many East African cultures, discussing terminal illness directly with a patient can be seen as taboo. An interpreter must navigate these cultural waters carefully, ensuring the doctor's message is conveyed accurately while respecting the patient's cultural framework.

### Building Trust

Trust is the foundation of any doctor-patient relationship. When a patient feels that their interpreter understands not just their language but their background, they are more likely to be open about their symptoms and concerns.

**Key Takeaways:**
*   Learn the cultural background of your target demographic.
*   Understand that body language varies significantly across cultures.
*   Always maintain professional boundaries while being empathetic.
        `,
        coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
        tags: ['Medical', 'Interpreting', 'Culture'],
        authorId: 'u-admin-001',
        status: 'published',
        publishedAt: '2024-10-15T09:00:00Z',
        createdAt: '2024-10-15T09:00:00Z',
        updatedAt: '2024-10-15T09:00:00Z',
        deletedAt: null,
        seo: {
            metaTitle: 'Cultural Competence in Medical Interpreting | Jambo Linguists',
            metaDescription: 'Learn why cultural competence is critical for medical interpreters. Explore the impact of cultural nuances in healthcare settings for Swahili speakers.',
            keywords: ['medical interpreting', 'cultural competence', 'Swahili medical interpreter', 'healthcare translation'],
            canonicalUrl: 'https://jambolinguists.com/blog/cultural-competence-medical-interpreting',
            noIndex: false
        }
    },
    {
        id: 'blog-2',
        title: '5 Tips for Working with a Telephone Interpreter',
        slug: 'tips-working-telephone-interpreter',
        excerpt: 'Maximize the efficiency of your remote interpreting sessions with these essential guidelines for professionals.',
        content: `
Remote interpreting is becoming the standard for quick consultations. Here is how to make the most of it.

1.  **Brief the Interpreter:** Before the client gets on the line, give the interpreter a 30-second summary of the situation.
2.  **Speak Clearly:** Phone lines can distort audio. Enunciate your words.
3.  **One Concept at a Time:** Don't monologue. Pause frequently to allow for interpretation.
4.  **Check for Understanding:** Ask the client to repeat back key instructions.
5.  **Avoid Jargon:** Unless you know the interpreter is a specialist, keep technical terms to a minimum or explain them.
        `,
        coverImage: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=1200',
        tags: ['Tips', 'Telephone', 'Best Practices'],
        authorId: 'u-admin-001',
        status: 'published',
        publishedAt: '2024-10-20T14:30:00Z',
        createdAt: '2024-10-20T14:30:00Z',
        updatedAt: '2024-10-20T14:30:00Z',
        deletedAt: null,
        seo: {
            metaTitle: '5 Tips for Telephone Interpreting Success | Jambo Linguists',
            metaDescription: 'Maximize efficiency in remote interpreting sessions. 5 essential tips for professionals working with telephone interpreters.',
            keywords: ['telephone interpreting', 'remote interpreting', 'interpreter tips', 'over the phone interpretation'],
            noIndex: false
        }
    },
    {
        id: 'blog-3',
        title: 'Understanding Swahili Dialects: A Guide',
        slug: 'understanding-swahili-dialects',
        excerpt: 'Swahili is not a monolith. Explore the variations between coastal, inland, and Congolese Swahili.',
        content: `
Swahili (Kiswahili) is the lingua franca of East Africa, but it varies significantly by region.

### Standard Swahili (Kiswahili Sanifu)
Based on the dialect of Zanzibar, this is what is taught in schools and used in official government business in Tanzania and Kenya.

### Congolese Swahili
Spoken in the DRC, this variation borrows heavily from French and Lingala. An interpreter from Mombasa might struggle with the specific vocabulary used in Goma.

### Sheng
A slang-heavy creole of Swahili and English spoken in Nairobi. While not formal, understanding it is crucial for community work with youth.
        `,
        coverImage: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80&w=1200',
        tags: ['Language', 'Swahili', 'Education'],
        authorId: 'u-admin-001',
        status: 'published',
        publishedAt: '2024-10-25T10:00:00Z',
        createdAt: '2024-10-25T10:00:00Z',
        updatedAt: '2024-10-25T10:00:00Z',
        deletedAt: null,
        seo: {
            metaTitle: 'Swahili Dialects Explained: Sanifu vs Congolese vs Sheng',
            metaDescription: 'Not all Swahili is the same. Discover the key differences between Standard Swahili, Congolese variations, and Sheng slang.',
            keywords: ['Swahili dialects', 'Kiswahili Sanifu', 'Congolese Swahili', 'Sheng', 'African languages'],
            noIndex: false
        }
    }
];
