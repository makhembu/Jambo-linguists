import React from 'react';
import { FileCheck, Shield, Lock, GraduationCap } from 'lucide-react';

export const ProfileComplianceForm = () => {
  return (
    <div className="p-8 md:p-10 bg-jambo-50/30">
        <h3 className="text-xl font-bold text-jambo-950 flex items-center gap-3 mb-8">
          <div className="bg-jambo-100 p-2 rounded-lg">
             <FileCheck size={24} className="text-jambo-700" />
          </div>
          Compliance Documents
        </h3>
        
        <div className="grid md:grid-cols-1 gap-4">
           {/* Upload Item 1 */}
           <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-brand-teal transition-all flex items-center justify-between group cursor-pointer relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 group-hover:bg-brand-teal transition-colors"></div>
              <div className="flex items-center gap-5 pl-2">
                 <div className="w-12 h-12 rounded-full bg-jambo-50 flex items-center justify-center text-jambo-600 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                    <Shield size={20} />
                 </div>
                 <div>
                    <p className="font-bold text-gray-900 text-sm group-hover:text-brand-teal transition-colors">Enhanced DBS Certificate</p>
                    <p className="text-xs text-gray-500">Must be issued within last 12 months</p>
                 </div>
              </div>
              <button className="text-xs font-bold uppercase tracking-wider text-jambo-600 bg-jambo-50 px-4 py-2 rounded-lg group-hover:bg-brand-teal group-hover:text-white transition-colors">
                Upload File
              </button>
           </div>

           {/* Upload Item 2 */}
           <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-brand-teal transition-all flex items-center justify-between group cursor-pointer relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 group-hover:bg-brand-teal transition-colors"></div>
              <div className="flex items-center gap-5 pl-2">
                 <div className="w-12 h-12 rounded-full bg-jambo-50 flex items-center justify-center text-jambo-600 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                    <Lock size={20} />
                 </div>
                 <div>
                    <p className="font-bold text-gray-900 text-sm group-hover:text-brand-teal transition-colors">Professional Indemnity Insurance</p>
                    <p className="text-xs text-gray-500">Proof of valid policy</p>
                 </div>
              </div>
              <button className="text-xs font-bold uppercase tracking-wider text-jambo-600 bg-jambo-50 px-4 py-2 rounded-lg group-hover:bg-brand-teal group-hover:text-white transition-colors">
                 Upload File
              </button>
           </div>

           {/* Upload Item 3 */}
           <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-brand-teal transition-all flex items-center justify-between group cursor-pointer relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 group-hover:bg-brand-teal transition-colors"></div>
              <div className="flex items-center gap-5 pl-2">
                 <div className="w-12 h-12 rounded-full bg-jambo-50 flex items-center justify-center text-jambo-600 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                    <GraduationCap size={20} />
                 </div>
                 <div>
                    <p className="font-bold text-gray-900 text-sm group-hover:text-brand-teal transition-colors">Qualifications (DPSI, DPI, etc)</p>
                    <p className="text-xs text-gray-500">Scan of original certificates</p>
                 </div>
              </div>
              <button className="text-xs font-bold uppercase tracking-wider text-jambo-600 bg-jambo-50 px-4 py-2 rounded-lg group-hover:bg-brand-teal group-hover:text-white transition-colors">
                 Upload File
              </button>
           </div>
        </div>
     </div>
  );
};