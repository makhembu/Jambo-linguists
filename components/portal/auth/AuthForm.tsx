
import React, { useState } from 'react';
import { ArrowRight, User, Mail, Phone, Lock, CheckCircle, FileText, AlertCircle, Loader2, Key, Eye, EyeOff } from 'lucide-react';
import { mockDb } from '../../../data/mockDatabase';
import { COMPANY_INFO } from '../../../data/constants';

interface AuthFormProps {
  onStartOnboarding?: () => void;
  onLogin: () => void;
  title?: string;
  subtitle?: string;
  allowRegister?: boolean;
  defaultEmail?: string;
  demoConfig?: {
    email: string;
    password?: string;
    label: string;
  };
}

export const AuthForm = ({ 
  onStartOnboarding, 
  onLogin, 
  title = "Jambo Linguist Portal",
  subtitle = "Freelancer Partner Network",
  allowRegister = true,
  defaultEmail = '',
  demoConfig
}: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [email, setEmail] = useState(defaultEmail || (demoConfig?.email || '')); 
  const [password, setPassword] = useState(''); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
        setError("Please enter both email and password.");
        return;
    }

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
        if (isLogin) {
            const result = mockDb.auth.login(email, password);
            if (result.success) {
                onLogin();
            } else {
                setError(result.error || 'Login failed. Please check your credentials.');
                setIsLoading(false);
            }
        } else {
            // Register
            if (!allowRegister) return;
            
            if (password.length < 6) {
                setError('Password must be at least 6 characters long.');
                setIsLoading(false);
                return;
            }
            
            if (!firstName || !lastName) {
                setError('Please fill in all required fields.');
                setIsLoading(false);
                return;
            }
            const result = mockDb.auth.register({
                email,
                firstName,
                lastName,
                phone,
                password
            });
            
            if (result.success) {
                if (onStartOnboarding) onStartOnboarding();
            } else {
                setError(result.error || 'Registration failed');
                setIsLoading(false);
            }
        }
    }, 1200);
  };

  const fillDemo = () => {
      if (demoConfig) {
          setEmail(demoConfig.email);
          setPassword(demoConfig.password || '');
      }
  };

  return (
    <div className="flex-grow lg:flex-grow-0 lg:w-7/12 bg-gray-50 dark:bg-[#0f0a15] flex items-center justify-center p-6 md:p-12 relative transition-colors duration-300">
         <div className="w-full max-w-md bg-white dark:bg-[#1a1625] rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-white/5 transition-colors duration-300">
            {/* Header (Mobile & Desktop for simple layout) */}
            <div className="mb-8 text-center">
              {/* Logo for mobile view */}
              <div className="flex lg:hidden justify-center mb-6">
                 <img 
                    src={COMPANY_INFO.logoUrl} 
                    alt={COMPANY_INFO.name} 
                    className="h-16 w-auto object-contain rounded-md" 
                 />
              </div>

              <div className="inline-block px-3 py-1 bg-jambo-50 dark:bg-white/5 text-jambo-600 dark:text-jambo-400 text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-jambo-100 dark:border-white/10">
                {subtitle}
              </div>
              <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
            </div>

            {/* Tabs (Only show if registration is allowed) */}
            {allowRegister && (
                <div className="flex mb-8 border-b border-gray-100 dark:border-white/10">
                <button 
                    onClick={() => { setIsLogin(true); setError(''); }}
                    className={`flex-1 pb-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${isLogin ? 'text-jambo-600 dark:text-jambo-400 border-jambo-600 dark:border-jambo-400' : 'text-gray-400 dark:text-gray-500 border-transparent hover:text-gray-600 dark:hover:text-gray-300'}`}
                >
                    Login
                </button>
                <button 
                    onClick={() => { setIsLogin(false); setError(''); }}
                    className={`flex-1 pb-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${!isLogin ? 'text-jambo-600 dark:text-jambo-400 border-jambo-600 dark:border-jambo-400' : 'text-gray-400 dark:text-gray-500 border-transparent hover:text-gray-600 dark:hover:text-gray-300'}`}
                >
                    Register
                </button>
                </div>
            )}

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg mb-6 flex items-center gap-2 border border-red-100 dark:border-red-900/50 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
               {!isLogin && allowRegister && (
                 <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                        <input 
                            type="text" 
                            required 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-gray-800 dark:text-white focus:outline-none focus:border-jambo-600 dark:focus:border-jambo-500 focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                            placeholder="Jane" 
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Last Name</label>
                      <div className="relative">
                        <input 
                            type="text" 
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-800 dark:text-white focus:outline-none focus:border-jambo-600 dark:focus:border-jambo-500 focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                            placeholder="Doe" 
                        />
                      </div>
                    </div>
                 </div>
               )}

               <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-gray-800 dark:text-white focus:outline-none focus:border-jambo-600 dark:focus:border-jambo-500 focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                        placeholder="linguist@example.com"
                    />
                  </div>
               </div>
               
               {!isLogin && allowRegister && (
                  <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-gray-800 dark:text-white focus:outline-none focus:border-jambo-600 dark:focus:border-jambo-500 focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                        placeholder="+44 7..." 
                      />
                    </div>
                  </div>
               )}

               <div className="space-y-1">
                  <div className="flex justify-between">
                     <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Password</label>
                     {isLogin && <a href="#" className="text-xs text-jambo-600 dark:text-jambo-400 hover:underline">Forgot?</a>}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                    <input 
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-gray-800 dark:text-white focus:outline-none focus:border-jambo-600 dark:focus:border-jambo-500 focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                        placeholder={isLogin ? "••••••••" : "Min 6 chars"} 
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
               </div>

               {!isLogin && allowRegister && (
                 <div className="pt-2">
                   <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center mt-0.5">
                        <input type="checkbox" required className="peer h-4 w-4 opacity-0 absolute" />
                        <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded peer-checked:bg-jambo-600 dark:peer-checked:bg-jambo-500 peer-checked:border-jambo-600 dark:peer-checked:border-jambo-500 transition-colors"></div>
                        <CheckCircle className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" size={12} />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                        I agree to the <span className="text-jambo-600 dark:text-jambo-400 font-bold hover:underline">Code of Conduct</span>, <span className="text-jambo-600 dark:text-jambo-400 font-bold hover:underline">Privacy Policy</span>, and <span className="text-jambo-600 dark:text-jambo-400 font-bold hover:underline">Freelancer Terms</span>.
                      </p>
                   </label>
                 </div>
               )}

               <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-jambo-600 dark:bg-jambo-500 hover:bg-jambo-700 dark:hover:bg-jambo-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-jambo-600/30 transition-all flex items-center justify-center gap-2 group mt-6 cursor-pointer disabled:opacity-70 disabled:shadow-none"
               >
                 {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                 ) : (
                    <>
                        {isLogin ? 'Access Portal' : 'Start Onboarding'}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                 )}
               </button>
            </form>

            {/* Demo Credentials Box */}
            {demoConfig && isLogin && (
                <div 
                    onClick={fillDemo}
                    className="mt-6 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-jambo-300 dark:hover:border-jambo-600 transition-colors group"
                >
                    <div className="bg-white dark:bg-white/10 p-2 rounded-lg text-jambo-600 dark:text-jambo-400 border border-gray-100 dark:border-white/5 shadow-sm group-hover:scale-105 transition-transform">
                        <Key size={16} />
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-mono flex-1">
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold mb-0.5">{demoConfig.label} (Tap to Fill)</p>
                        <p className="truncate">User: <span className="font-bold text-gray-900 dark:text-white select-all">{demoConfig.email}</span></p>
                        <p>Pass: <span className="font-bold text-gray-900 dark:text-white select-all">{demoConfig.password || '******'}</span></p>
                    </div>
                </div>
            )}

            {allowRegister && (
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-3">
                    <div className="bg-brand-orange/10 dark:bg-brand-orange/20 p-2 rounded-full">
                        <FileText className="text-brand-orange" size={16} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">Compliance Reminder</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Ensure your DBS certificate and Indemnity Insurance are up to date before logging in.</p>
                    </div>
                </div>
                </div>
            )}
         </div>
         
         <div className="absolute bottom-6 text-center text-xs text-gray-400 dark:text-gray-600">
            Need help? <a href="mailto:support@jambolinguists.com" className="text-jambo-600 dark:text-jambo-400 hover:underline">Contact Support</a>
         </div>
      </div>
  );
};
