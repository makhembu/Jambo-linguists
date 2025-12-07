import { GoogleGenAI } from "@google/genai";
import { SeoConfig, GlobalSeoSettings } from "../types";

export interface ContentAnalysis {
    score: number;
    readabilityLevel: string;
    suggestions: string[];
    tone: string;
}

export class AiWritingService {
    private ai: GoogleGenAI | null = null;
    private model = 'gemini-2.5-flash';
    private isEnabled: boolean = false;

    constructor() {
        // Only initialize if API key is available
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        
        if (apiKey) {
            try {
                this.ai = new GoogleGenAI({ apiKey });
                this.isEnabled = true;
                console.log('✅ AI Service enabled');
            } catch (error) {
                console.warn('⚠️ AI Service initialization failed:', error);
                this.isEnabled = false;
            }
        } else {
            console.log('ℹ️ AI Service disabled: No API key found (this is OK for development)');
            this.isEnabled = false;
        }
    }

    async generateSeoData(content: string, title: string): Promise<Partial<SeoConfig>> {
        // Return mock data if AI is not enabled
        if (!this.isEnabled || !this.ai) {
            return {
                metaTitle: title.substring(0, 60),
                metaDescription: content.substring(0, 160),
                keywords: ['jambo', 'linguists', 'swahili', 'translation', 'interpretation']
            };
        }

        const prompt = `
            Act as an SEO expert for "Jambo Linguists", a premium Swahili interpretation agency.
            Analyze the following blog content and title.
            Generate a JSON object with:
            1. "metaTitle": SEO-optimized title (max 60 chars).
            2. "metaDescription": Compelling description (150-160 chars).
            3. "keywords": Array of 5-8 focus keywords.
            
            Maintain a professional, authoritative, yet accessible tone.
            
            Title: ${title}
            Content: ${content.substring(0, 3000)}...
        `;

        try {
            const response = await this.ai.models.generateContent({
                model: this.model,
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });
            
            if (response.text) {
                return JSON.parse(response.text);
            }
        } catch (error) {
            console.error("AI SEO Generation Failed:", error);
        }
        
        // Fallback to mock data
        return {
            metaTitle: title.substring(0, 60),
            metaDescription: content.substring(0, 160),
            keywords: ['jambo', 'linguists', 'swahili', 'translation', 'interpretation']
        };
    }

    async generateSiteSeo(companyInfo: any): Promise<Partial<GlobalSeoSettings>> {
        // Return mock data if AI is not enabled
        if (!this.isEnabled || !this.ai) {
            return {
                siteTitle: 'Jambo Linguists | Professional Swahili Translation Services',
                siteDescription: 'Expert Swahili interpretation and translation services in the UK. Professional, certified linguists for all your language needs.',
                defaultKeywords: ['swahili translation', 'interpretation services', 'jambo linguists', 'uk translation', 'certified translators', 'swahili interpreters', 'professional translation', 'language services'],
                structuredData: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": "Jambo Linguists",
                    "description": "Professional Swahili translation and interpretation services"
                }, null, 2)
            };
        }

        const prompt = `
            Act as a technical SEO expert for "Jambo Linguists Limited".
            Using the company details below, generate a global SEO strategy JSON object.
            
            Company Info:
            ${JSON.stringify(companyInfo)}
            
            Return JSON with:
            1. "siteTitle": A catchy, SEO-friendly global title suffix (e.g. "Jambo Linguists | Swahili Experts").
            2. "siteDescription": A powerful meta description (160 chars) highlighting services and location.
            3. "defaultKeywords": Array of 10 high-value keywords for Swahili interpretation in UK.
            4. "structuredData": A valid JSON-LD string for Schema.org "LocalBusiness" or "Organization", including contact points, address, and logo. Ensure it is stringified JSON.
        `;

        try {
            const response = await this.ai.models.generateContent({
                model: this.model,
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });

            if (response.text) {
                const data = JSON.parse(response.text);
                // Ensure structuredData is a string if the AI returned an object
                if (typeof data.structuredData === 'object') {
                    data.structuredData = JSON.stringify(data.structuredData, null, 2);
                }
                return data;
            }
        } catch (error) {
            console.error("AI Site SEO Generation Failed:", error);
        }
        
        // Fallback to mock data
        return {
            siteTitle: 'Jambo Linguists | Professional Swahili Translation Services',
            siteDescription: 'Expert Swahili interpretation and translation services in the UK. Professional, certified linguists for all your language needs.',
            defaultKeywords: ['swahili translation', 'interpretation services', 'jambo linguists', 'uk translation', 'certified translators', 'swahili interpreters', 'professional translation', 'language services'],
            structuredData: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Jambo Linguists",
                "description": "Professional Swahili translation and interpretation services"
            }, null, 2)
        };
    }

    async analyzeContent(content: string): Promise<ContentAnalysis> {
        // Return mock data if AI is not enabled
        if (!this.isEnabled || !this.ai) {
            return {
                score: 75,
                readabilityLevel: 'Grade 10',
                tone: 'Professional',
                suggestions: [
                    'AI analysis unavailable - using mock data',
                    'Add an API key to enable AI-powered content analysis'
                ]
            };
        }

        const prompt = `
            Analyze this blog post draft for "Jambo Linguists".
            Evaluate based on:
            1. Clarity & Readability
            2. Professional Tone (Must be authoritative but welcoming)
            3. Structure
            
            Return JSON:
            {
                "score": number (0-100),
                "readabilityLevel": string (e.g. "Grade 8", "University"),
                "tone": string,
                "suggestions": array of strings (specific improvements)
            }

            Content: ${content.substring(0, 3000)}...
        `;

        try {
            const response = await this.ai.models.generateContent({
                model: this.model,
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });

            if (response.text) {
                return JSON.parse(response.text);
            }
        } catch (error) {
            console.error("AI Content Analysis Failed:", error);
        }
        
        return { 
            score: 0, 
            readabilityLevel: 'Unknown', 
            tone: 'Unknown', 
            suggestions: ['AI Analysis Unavailable'] 
        };
    }
}