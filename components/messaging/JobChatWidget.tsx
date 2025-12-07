
import React, { useState, useEffect, useRef } from 'react';
import { mockDb, Message } from '@/data/mockDatabase';
import { MessageBubble } from './MessageBubble';
import { Send, MessageSquare, X } from 'lucide-react';

interface JobChatWidgetProps {
  jobId: string;
  currentUserId: string;
  peerId?: string; // If known (e.g. assigned linguist/client). If null, might disable or show placeholder.
}

export const JobChatWidget = ({ jobId, currentUserId, peerId }: JobChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Calculate unread
  const unreadCount = messages.filter(m => m.recipientId === currentUserId && !m.isRead).length;

  const refreshMessages = () => {
      if (peerId) {
          const msgs = mockDb.getThread(currentUserId, peerId, jobId);
          setMessages(msgs);
      }
  };

  useEffect(() => {
      refreshMessages();
      const unsubscribe = mockDb.subscribe(refreshMessages);
      return unsubscribe;
  }, [jobId, peerId]);

  // Mark as read when opened
  useEffect(() => {
      if (isOpen && peerId) {
          mockDb.markAsRead(currentUserId, peerId, jobId);
          refreshMessages(); 
      }
  }, [isOpen, messages]);

  useEffect(() => {
      if (isOpen) {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || !peerId) return;
      mockDb.sendMessage(currentUserId, peerId, input, jobId);
      setInput('');
  };

  if (!peerId) return null; // Don't show chat if no counterpart assigned

  return (
    <>
        {/* Toggle Button - Fixed to viewport to stay visible over modal content */}
        <div className={`fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[10000] transition-all duration-300 ${isOpen ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
            <button 
                onClick={() => setIsOpen(true)}
                className="bg-jambo-600 hover:bg-jambo-700 text-white rounded-full p-3 md:p-4 shadow-2xl flex items-center justify-center relative transition-transform hover:scale-105 border-2 border-white dark:border-[#1a1625]"
                aria-label="Open Chat"
            >
                <MessageSquare size={24} />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1a1625]">
                        {unreadCount}
                    </span>
                )}
            </button>
        </div>

        {/* Chat Panel - Fixed positioning for mobile/desktop handling */}
        <div 
            className={`
                fixed inset-0 md:inset-y-0 md:right-0 md:left-auto md:w-96 
                bg-white dark:bg-[#1a1625] shadow-2xl md:border-l border-gray-200 dark:border-white/10 
                z-[10001] transform transition-transform duration-300 flex flex-col
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
        >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5 shadow-sm relative z-10 shrink-0">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <MessageSquare size={18} className="text-jambo-600 dark:text-jambo-400" /> 
                    Job Chat
                </h3>
                <div className="flex items-center gap-1">
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors text-gray-500 dark:text-gray-400"
                        title="Close Chat"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-gray-50 dark:bg-black/10">
                {messages.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 text-sm">
                        <p>No messages yet.</p>
                        <p className="text-xs mt-1">Start the conversation about this job.</p>
                    </div>
                ) : (
                    messages.map(msg => (
                        <MessageBubble key={msg.id} message={msg} isOwn={msg.senderId === currentUserId} />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1625] flex gap-2 shrink-0 safe-area-bottom">
                <input 
                    className="flex-1 bg-gray-100 dark:bg-white/5 border-transparent focus:border-jambo-600 border rounded-full px-4 py-2 text-sm outline-none dark:text-white transition-all"
                    placeholder="Message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button 
                    type="submit" 
                    disabled={!input.trim()}
                    className="p-2 bg-jambo-600 text-white rounded-full hover:bg-jambo-700 disabled:opacity-50 transition-colors shadow-sm shrink-0"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    </>
  );
};
