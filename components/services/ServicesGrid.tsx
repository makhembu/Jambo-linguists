import React from 'react';
import { Phone, Video, FileAudio, FileText, Users, Globe } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

export const ServicesGrid = () => {
  const services = [
    {
      title: "Telephone Interpreting",
      desc: "Instant access to qualified interpreters, connecting you with the right person in seconds.",
      gradient: "bg-gradient-to-br from-blue-800 to-blue-600 dark:from-blue-900 dark:to-blue-700",
      icon: Phone
    },
    {
      title: "Video Interpreting",
      desc: "Face-to-face virtual interpretation for a more personal touch.",
      gradient: "bg-gradient-to-br from-teal-600 to-teal-500 dark:from-teal-700 dark:to-teal-600",
      icon: Video
    },
    {
      title: "Transcription",
      desc: "Fast and precise transcription services for audio and video files.",
      gradient: "bg-gradient-to-br from-red-800 to-red-600 dark:from-red-900 dark:to-red-700",
      icon: FileAudio
    },
    {
      title: "Document Translation",
      desc: "Accurate and confidential translation of sensitive information, including legal and medical documents.",
      gradient: "bg-gradient-to-br from-green-700 to-green-600 dark:from-green-800 dark:to-green-700",
      icon: FileText
    },
    {
      title: "Face-to-Face Interpreting",
      desc: "Traditional in-person interpretation for a more personal connection.",
      gradient: "bg-gradient-to-br from-red-600 to-orange-500 dark:from-red-700 dark:to-orange-600",
      icon: Users
    },
    {
      title: "Intercultural Training",
      desc: "Our services are aimed at Swahili-speaking resettled refugees mainly from East Africa and the professionals supporting them to integrate in the UK. We offer solid preparation for everyday living and thus improving their intercultural skills.",
      gradient: "bg-gradient-to-br from-yellow-800 to-yellow-600 dark:from-yellow-900 dark:to-yellow-700",
      icon: Globe
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, idx) => (
          <ServiceCard 
            key={idx}
            title={s.title}
            description={s.desc}
            gradient={s.gradient}
            icon={s.icon}
          />
        ))}
      </div>
    </section>
  )
}