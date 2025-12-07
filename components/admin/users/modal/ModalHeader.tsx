
import React, { useMemo } from 'react';
import { Edit2, Save, Loader2 } from 'lucide-react';
import { User } from '@/data/types';

interface ModalHeaderProps {
  user: User;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onSave: () => void;
  onCancel: () => void;
  processing: boolean;
}

const FALLBACK_COVERS = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", // Corporate Office
    "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200", // Abstract Gradient
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200", // Tech Globe
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200", // Team Collaboration
];

export const ModalHeader = ({ user, isEditing, setIsEditing, onSave, onCancel, processing }: ModalHeaderProps) => {
  
  // Use user's specific header or pick a deterministic fallback based on ID
  const coverImage = useMemo(() => {
      if (user.headerUrl) return user.headerUrl;
      const charCodeSum = user.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return FALLBACK_COVERS[charCodeSum % FALLBACK_COVERS.length];
  }, [user.id, user.headerUrl]);

  return (
    <div className="h-40 relative shrink-0 overflow-hidden bg-gray-900">
        {/* Background Image */}
        <img 
            src={coverImage} 
            alt="Profile Cover" 
            className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Edit Actions */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
            {!isEditing ? (
                <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors border border-white/20 shadow-lg"
                >
                    <Edit2 size={14} /> Edit Profile
                </button>
            ) : (
                <div className="flex gap-2">
                    <button 
                        onClick={onCancel}
                        className="bg-black/40 hover:bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors border border-white/10"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onSave}
                        disabled={processing}
                        className="bg-jambo-600 hover:bg-jambo-700 text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-lg border border-transparent"
                    >
                        {processing ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Changes
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};
