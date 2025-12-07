'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Hero } from '@/components/home/Hero';
import { InfoCard } from '@/components/home/InfoCard';
import { TranslatorDemo } from '@/components/home/TranslatorDemo';
import { SeoHead } from '@/components/seo/SeoHead';

export const HomePage = () => {
  const router = useRouter();

  const schema = {
    "@type": "WebSite",
    "name": "Jambo Linguists Limited",
    "url": "https://jambolinguists.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://jambolinguists.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "description": "Professional Swahili interpretation and translation services for UK Legal, Medical, and Government sectors."
  };

  return (
    <>
      <SeoHead 
        title="Jambo Linguists | Swahili Translation & Interpretation Services UK"
        description="Leading UK agency for Swahili interpreters & translators. Expert support for Legal, NHS, and Immigration cases. Face-to-face, video & document translation available 24/7."
        path="/"
        structuredData={schema}
      />
      
      <Hero />
      
      {/* Content Cards Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 md:-mt-20 lg:-mt-24 relative z-20 pb-16 md:pb-20">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <InfoCard 
            variant="pink"
            title="What we do"
            content="We bridge communication barriers with our comprehensive range of language services. From instant telephone and video interpreting to face-to-face interpretation, document translation, transcription, and Intercultural Training."
            buttonText="More About Us"
            onClick={() => router.push('/about')}
          />
          <InfoCard 
            variant="teal"
            title="Our purpose"
            content="At Jambo Linguists, we're dedicated to breaking down communication barriers and connecting people worldwide. Our vision is to become the world's greatest language solutions provider, driven by our mission to help individuals and organizations."
            buttonText="Our Services"
            onClick={() => router.push('/services')}
          />
        </div>
      </section>

      {/* AI Translator Section */}
      <TranslatorDemo />
    </>
  );
};