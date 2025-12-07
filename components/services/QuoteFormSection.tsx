import React from 'react';

export const QuoteFormSection = () => {
  return (
    <section className="py-24 px-6 bg-[#16a34a] dark:bg-[#0f7234]"> {/* Green similar to image */}
       <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Get a Quote</h2>
          <p className="text-white/90 font-light text-lg">
            Fill in the form below and we'll get back to you within 72 working hours.
          </p>
       </div>

       <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-2xl shadow-2xl">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-1">
                 <input type="text" placeholder="Your name" className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:bg-white/30 focus:border-white transition-all" />
               </div>
               <div className="space-y-1">
                 <input type="text" placeholder="Your company name" className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:bg-white/30 focus:border-white transition-all" />
               </div>
               <div className="space-y-1">
                 <input type="email" placeholder="Your email" className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:bg-white/30 focus:border-white transition-all" />
               </div>
               <div className="space-y-1">
                 <input type="tel" placeholder="Your phone number" className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:bg-white/30 focus:border-white transition-all" />
               </div>
            </div>
            
            <div className="space-y-1">
               <input type="text" placeholder="Message subject" className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:bg-white/30 focus:border-white transition-all" />
            </div>

            <div className="space-y-1">
              <textarea placeholder="Brief project details" rows={6} className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:bg-white/30 focus:border-white transition-all resize-none"></textarea>
            </div>

            <div className="space-y-2">
               <label className="text-white text-sm font-medium">Upload a File to Support Your Details (10MB Maximum)</label>
               <div className="flex items-center gap-4 bg-white/20 p-2 rounded-lg border border-white/30">
                  <button type="button" className="bg-gray-100 hover:bg-white text-gray-800 px-4 py-1.5 rounded text-sm font-medium transition-colors border border-gray-300 cursor-pointer">
                    Choose File
                  </button>
                  <span className="text-white/70 text-sm italic">No file chosen</span>
               </div>
            </div>

            <div className="pt-6">
              <button type="button" className="bg-white text-green-700 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 cursor-pointer">
                Get a Quote
              </button>
            </div>
          </form>
       </div>
    </section>
  )
}