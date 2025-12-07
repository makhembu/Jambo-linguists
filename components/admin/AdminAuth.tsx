
import React, { useState } from 'react';
import { AlertCircle, Lock } from 'lucide-react';
import { AuthForm } from '../portal/auth/AuthForm';
import { mockDb } from '../../data/mockDatabase';

interface AdminAuthProps {
  onLoginSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminAuth = ({ onLoginSuccess, onNavigateHome }: AdminAuthProps) => {
  const [authError, setAuthError] = useState('');

  const handleLogin = () => {
    // AuthForm handles the actual mockDb.auth.login() call before triggering this
    // We just need to verify the user state that was set
    const user = mockDb.auth.getCurrentUser();
    
    if (user && user.role === 'admin') {
      onLoginSuccess();
      setAuthError('');
    } else {
      mockDb.auth.logout();
      setAuthError('Access Denied. You do not have administrator privileges.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-jambo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <button 
          onClick={onNavigateHome} 
          className="absolute -top-12 left-0 text-white/50 hover:text-white text-sm font-bold flex items-center gap-2 transition-colors"
        >
          ← Back to Website
        </button>

        {authError && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <div className="text-sm">
              <p className="font-bold">Authorization Failed</p>
              <p className="opacity-90">{authError}</p>
            </div>
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          <div className="h-2 bg-gradient-to-r from-jambo-600 via-brand-pink to-brand-orange"></div>
          
          <div className="[&>div]:bg-transparent [&>div]:shadow-none [&>div]:border-none [&>div]:w-full [&>div]:p-0">
            <AuthForm 
              onLogin={handleLogin} 
              title="Admin Console" 
              subtitle="Authorized Personnel Only"
              allowRegister={false}
              demoConfig={{
                email: "admin@jambolinguists.com",
                password: "admin",
                label: "Admin Credentials (Demo)"
              }}
            />
          </div>
        </div>

        <div className="text-center mt-8 text-white/30 text-xs font-mono">
          <p className="flex items-center justify-center gap-2">
            <Lock size={12} /> 
            Secure System • IP Logged
          </p>
        </div>
      </div>
    </div>
  );
};
