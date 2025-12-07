
import React, { useState, useEffect } from 'react';
import { mockDb, Conversation } from '../../../../data/mockDatabase';
import { ConversationList } from '../../../messaging/ConversationList';
import { MessageThread } from '../../../messaging/MessageThread';
import { Search, Edit } from 'lucide-react';
import { AdminJobModal } from '../../../admin/jobs/AdminJobModal';
import { JobDetailsModal } from '../jobs/JobDetailsModal';

interface PortalMessagesProps {
    // Props if needed
}

export const PortalMessages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedPeerId, setSelectedPeerId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>(undefined);
  const [viewingJobId, setViewingJobId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mobile View State
  const [showThread, setShowThread] = useState(false);

  const currentUser = mockDb.auth.getCurrentUser();

  const refreshConversations = () => {
      if (currentUser) {
          setConversations(mockDb.getConversations(currentUser.id));
      }
  };

  useEffect(() => {
      refreshConversations();
      const unsubscribe = mockDb.subscribe(refreshConversations);
      return unsubscribe;
  }, [currentUser]);

  // Handle selection
  const handleSelectConversation = (peerId: string, jobId?: string) => {
      setSelectedPeerId(peerId);
      setSelectedJobId(jobId);
      setShowThread(true);
      
      // Mark as read immediately on selection
      if (currentUser) {
          mockDb.markAsRead(currentUser.id, peerId, jobId);
      }
  };

  const handleSendMessage = (content: string) => {
      if (!currentUser || !selectedPeerId) return;
      mockDb.sendMessage(currentUser.id, selectedPeerId, content, selectedJobId);
      // Conversations will auto-refresh via subscription, bumping thread to top
  };

  const filteredConversations = conversations.filter(c => {
      const name = c.peer ? `${c.peer.firstName} ${c.peer.lastName}` : 'Unknown';
      const jobTitle = c.job ? c.job.title : '';
      const term = searchTerm.toLowerCase();
      return name.toLowerCase().includes(term) || jobTitle.toLowerCase().includes(term);
  });

  if (!currentUser) return null;

  // Resolve current thread messages
  const activeMessages = selectedPeerId 
      ? mockDb.getThread(currentUser.id, selectedPeerId, selectedJobId) 
      : [];

  return (
    <div className="h-[calc(100vh-140px)] min-h-[500px] flex bg-white dark:bg-[#1a1625] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden animate-in fade-in duration-500">
        
        {/* Sidebar (List) - Hidden on mobile if thread is open */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-gray-200 dark:border-white/5 flex flex-col ${showThread ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-gray-100 dark:border-white/5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Messages</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-jambo-600 dark:text-white transition-all"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <ConversationList 
                    conversations={filteredConversations}
                    selectedPeerId={selectedPeerId || undefined}
                    selectedJobId={selectedJobId}
                    onSelect={handleSelectConversation}
                />
            </div>
        </div>

        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col ${!showThread ? 'hidden md:flex' : 'flex'}`}>
            {selectedPeerId ? (
                <MessageThread 
                    currentUserId={currentUser.id}
                    peerId={selectedPeerId}
                    jobId={selectedJobId}
                    messages={activeMessages}
                    onSendMessage={handleSendMessage}
                    onBack={() => setShowThread(false)}
                    onViewJob={setViewingJobId}
                />
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                        <Edit size={32} className="opacity-50" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300">Select a conversation</h3>
                    <p className="text-sm">Choose a thread from the list to start messaging.</p>
                </div>
            )}
        </div>

        {/* View Job Modal Logic */}
        {viewingJobId && (
            // Determine which modal to show based on Role
            currentUser.role === 'admin' ? (
                <AdminJobModal 
                    job={mockDb.getAllJobs().find(j => j.id === viewingJobId)!} 
                    onClose={() => setViewingJobId(null)}
                    onUpdate={() => {}}
                />
            ) : (
                <JobDetailsModal 
                    job={mockDb.getAllJobs().find(j => j.id === viewingJobId)!}
                    onClose={() => setViewingJobId(null)}
                    onNavigate={() => {}}
                    showToast={() => {}} // Dummy prop for this context
                />
            )
        )}
    </div>
  );
};
