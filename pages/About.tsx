
import React from 'react';
import { AboutHero } from '../components/about/AboutHero';
import { FounderSection } from '../components/about/FounderSection';
import { CorporateOverviewSection } from '../components/about/CorporateOverviewSection';
import { AboutSwahiliSection } from '../components/about/AboutSwahiliSection';
import { SeoHead } from '../components/seo/SeoHead';

export const AboutPage = () => {
  const schema = {
    "@type": "AboutPage",
    "name": "About Jambo Linguists",
    "description": "Jambo Linguists is a specialist agency for Swahili translation and interpretation services, founded by Linah Makembu to bridge cultural gaps in the UK.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Jambo Linguists Limited",
      "founder": {
        "@type": "Person",
        "name": "Linah Makembu",
        "jobTitle": "Founding Director"
      },
      "foundingDate": "2023",
      "areaServed": "United Kingdom"
    }
  };

  return (
    <>
      <SeoHead 
        title="About Us - Swahili Experts & Advocates"
        description="Jambo Linguists: Professional Swahili interpretation & translation agency. Founded by Linah Makembu to bridge language barriers in Legal, Medical & Asylum sectors."
        path="/about"
        structuredData={schema}
      />
      <AboutHero />
      <FounderSection />
      <CorporateOverviewSection />
      <AboutSwahiliSection />
    </>
  );
};
