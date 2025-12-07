import React, { useState } from 'react';
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Quote, Loader2, Play } from 'lucide-react';

const AI_MODEL = "gemini-2.5-flash";

interface TranslationResult {
  translation: string;
  context: string;
  detectedLanguage?: string;
}

export const TranslatorDemo = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        You are an expert English/Swahili translator. 
        Analyze the input: "${input}".
        1. If it is English, translate it to Swahili.
        2. If it is Swahili, translate it to English.
        3. Provide a brief cultural context or usage note in English.
        
        Return JSON only.
      `;

      const schema: Schema = {
        type: Type.OBJECT,
        properties: {
          translation: { type: Type.STRING, description: "The translated text" },
          context: { type: Type.STRING, description: "Cultural context or usage notes" },
          detectedLanguage: { type: Type.STRING, description: "The detected source language (English or Swahili)" }
        },
        required: ["translation", "context"]
      };

      const response = await ai.models.generateContent({
        model: AI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema
        }
      });
      
      const jsonText = response.text;
      if (jsonText) {
        setResult(JSON.parse(jsonText));
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to translation service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-transparent transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-4xl text-jambo-600 dark:text-jambo-300 font-bold serif mb-4">Experience the Language</h2>
            <div className="w-16 h-1 bg-brand-pink mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-jambo-100 max-w-2xl mx-auto">
                Try our AI-powered translator to understand the depth of Swahili culture. 
                Type a phrase below to see instant translation with cultural context.
            </p>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10 flex flex-col md:flex-row hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 backdrop-blur-sm">
            {/* Input Side */}
            <div className="p-8 md:p-12 md:w-1/2 bg-white dark:bg-transparent flex flex-col justify-center">
                 <label className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-3">Input Text</label>
                 <div className="relative">
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleTranslate()}
                      placeholder="e.g. Habari or Hello"
                      className="w-full text-2xl md:text-3xl font-serif text-gray-800 dark:text-white border-b-2 border-gray-200 dark:border-white/20 py-4 focus:border-jambo-600 dark:focus:border-jambo-400 outline-none transition-colors placeholder:text-gray-300 bg-transparent"
                    />
                 </div>
                 <div className="mt-8 flex justify-between items-center">
                    <span className="text-sm text-gray-400">Supports English & Swahili</span>
                    <button 
                      onClick={handleTranslate}
                      disabled={loading || !input}
                      className="bg-jambo-600 dark:bg-jambo-500 hover:bg-jambo-700 dark:hover:bg-jambo-400 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-jambo-600/30 disabled:opacity-50 disabled:shadow-none flex items-center gap-2 cursor-pointer"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <>Translate <Play size={16} fill="currentColor" /></>}
                    </button>
                 </div>
            </div>

            {/* Output Side - Dark Tech Look */}
            <div className="p-8 md:p-12 md:w-1/2 bg-jambo-950 dark:bg-black/30 text-white relative flex flex-col justify-center min-h-[300px] border-t md:border-t-0 md:border-l border-gray-100 dark:border-white/5">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Quote size={100} />
                 </div>
                 
                 {!result && !loading && (
                    <div className="text-center opacity-30">
                        <p className="font-serif text-2xl italic">"Language is the road map of a culture."</p>
                    </div>
                 )}

                {loading && (
                    <div className="flex flex-col items-center gap-3 opacity-70">
                        <div className="flex gap-2">
                           <span className="w-2 h-2 bg-brand-teal rounded-full animate-bounce"></span>
                           <span className="w-2 h-2 bg-brand-teal rounded-full animate-bounce delay-75"></span>
                           <span className="w-2 h-2 bg-brand-teal rounded-full animate-bounce delay-150"></span>
                        </div>
                        <span className="text-xs uppercase tracking-widest">Processing...</span>
                    </div>
                )}

                 {result && (
                     <div className="relative z-10 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="mb-8">
                            <span className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-2 block">Translation</span>
                            <p className="text-4xl md:text-5xl font-serif leading-tight">{result.translation}</p>
                        </div>
                        
                        <div className="bg-white/10 p-5 rounded-xl border-l-4 border-brand-pink backdrop-blur-sm">
                            <span className="text-brand-pink text-xs font-bold uppercase tracking-widest mb-1 block">Context</span>
                            <p className="text-gray-300 font-light leading-relaxed">{result.context}</p>
                        </div>
                     </div>
                 )}
            </div>
        </div>
      </div>
    </section>
  );
};