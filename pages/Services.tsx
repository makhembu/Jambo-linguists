
import React from 'react';
import { ServicesHero } from '../components/services/ServicesHero';
import { ServicesGrid } from '../components/services/ServicesGrid';
import { QuoteFormSection } from '../components/services/QuoteFormSection';
import { SeoHead } from '../components/seo/SeoHead';

export const ServicesPage = () => {
  const schema = {
    "@type": "Service",
    "serviceType": "Language Services",
    "provider": {
      "@type": "Organization",
      "name": "Jambo Linguists Limited"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Interpretation Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Telephone Interpreting" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Video Interpreting" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Face-to-Face Interpreting" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Document Translation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Intercultural Training" } }
      ]
    }
  };

  return (
    <>
      <SeoHead 
        title="Our Services | Swahili Interpreting, Translation & Transcription"
        description="Comprehensive language solutions: Face-to-Face, Telephone & Video Interpreting, Certified Document Translation, and Cultural Competence Training for UK professionals."
        path="/services"
        type="service"
        structuredData={schema}
      />
      <ServicesHero />
      <ServicesGrid />
      <QuoteFormSection />
    </>
  );
};
