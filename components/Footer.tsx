'use client'

import React from 'react';
import { Facebook, Instagram, Linkedin, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-jambo-600 dark:bg-black/30 pt-20 pb-10 px-6 text-white border-t border-white/5 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1 */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg border-b border-white/20 pb-2 inline-block">Visit Us</h4>
          <address className="text-jambo-100 not-italic leading-loose font-light text-sm">
            <strong className="text-white font-medium block mb-1">Jambo Linguists Ltd</strong>
            First Floor, Radley House,<br />
            Richardshaw Rd,<br />
            Pudsey, LS28 6LE
          </address>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg border-b border-white/20 pb-2 inline-block">Contact</h4>
          <div className="space-y-3 text-sm">
            <a href="mailto:jamii@jambolinguists.com" className="block text-white font-medium hover:text-jambo-200 transition-colors flex items-center gap-2 cursor-pointer w-fit">
               jamii@jambolinguists.com
            </a>
            <p className="text-jambo-100 font-mono">+44 7938 065 717</p>
            <p className="text-jambo-100 font-mono">+44 7938 065 718</p>
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg border-b border-white/20 pb-2 inline-block">Social</h4>
          <div className="flex gap-4">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-jambo-600 transition-all hover:-translate-y-1 cursor-pointer">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg border-b border-white/20 pb-2 inline-block">Memberships</h4>
          <div className="flex gap-4 items-center">
            {/* Styled Placeholders imitating logos */}
            <div className="bg-white p-2 rounded-full h-14 w-14 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                <div className="text-[10px] text-jambo-600 font-bold leading-none text-center">AITI</div>
            </div>
            <div className="bg-white px-3 py-1 rounded h-10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                <div className="text-[10px] text-gray-800 font-bold uppercase">
                    <span className="bg-gray-800 text-white px-1 mr-1">CIOL</span>Associate
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-jambo-200">
        <p>© {new Date().getFullYear()} Jambo Linguists. Company House No: 15333696</p>
        <div className="flex gap-6 mt-4 md:mt-0 items-center">
          <a href="#" className="hover:text-white transition-colors underline decoration-white/30 hover:decoration-white cursor-pointer">Privacy & Cookie Policy</a>
          <button 
            onClick={() => router.push('/admin')} 
            className="flex items-center gap-1 hover:text-white transition-colors opacity-70 hover:opacity-100"
          >
            <Lock size={10} /> Staff Login
          </button>
        </div>
      </div>
    </footer>
  );
};