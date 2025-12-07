
import { GoogleGenAI } from "@google/genai";
import { SeoConfig, GlobalSeoSettings } from "../types";

export interface ContentAnalysis {
    score: number;
    readabilityLevel: string;
    suggestions: string[];
    tone: string;
}

export class AiWritingService {
    private ai: GoogleGenAI;
    private model = 'gemini-2.5-flash';

    constructor() {
        this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }

    async generateSeoData(content: string, title: string): Promise<Partial<SeoConfig>> {
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
        return {};
    }

    async generateSiteSeo(companyInfo: any): Promise<Partial<GlobalSeoSettings>> {
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
        return {};
    }

    async analyzeContent(content: string): Promise<ContentAnalysis> {
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
        
        return { score: 0, readabilityLevel: 'Unknown', tone: 'Unknown', suggestions: ['AI Analysis Unavailable'] };
    }
}
