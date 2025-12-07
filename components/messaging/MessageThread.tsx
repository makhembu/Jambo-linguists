
import React, { useState, useEffect, useRef } from 'react';
import { Message, User, Job } from '../../data/types';
import { MessageBubble } from './MessageBubble';
import { Send, ArrowLeft, MoreVertical, Briefcase, ExternalLink, Calendar } from 'lucide-react';
import { mockDb } from '../../data/mockDatabase';

interface MessageThreadProps {
  currentUserId: string;
  peerId: string;
  jobId?: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack: () => void; // For mobile
  onViewJob?: (jobId: string) => void;
}

export const MessageThread = ({ currentUserId, peerId, jobId, messages, onSendMessage, onBack, onViewJob }: MessageThreadProps) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const peer = mockDb.getAllUsers().find(u => u.id === peerId);
  const job = jobId ? mockDb.getAllJobs().find(j => j.id === jobId) : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim()) return;
      onSendMessage(input);
      setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50 dark:bg-black/20">
        
        {/* Header */}
        <div className="h-16 px-4 border-b border-gray-200 dark:border-white/5 flex items-center justify-between bg-white dark:bg-[#1a1625] shrink-0">
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="md:hidden p-1 text-gray-500">
                    <ArrowLeft size={20} />
                </button>
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center overflow-hidden">
                    {peer?.avatarUrl ? <img src={peer.avatarUrl} className="w-full h-full object-cover"/> : peer?.firstName[0]}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                        {peer ? `${peer.firstName} ${peer.lastName}` : 'Unknown'}
                    </h3>
                    {job ? (
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            Ref: {job.id} • {job.status}
                        </span>
                    ) : (
                        <span className="text-[10px] text-green-500 font-bold">Online</span>
                    )}
                </div>
            </div>
            
            {job && (
                <button 
                    onClick={() => onViewJob && onViewJob(job.id)}
                    className="text-xs font-bold text-jambo-600 dark:text-jambo-400 hover:bg-jambo-50 dark:hover:bg-jambo-900/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                >
                    Job Details <ExternalLink size={12} />
                </button>
            )}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            {job && (
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3 rounded-xl max-w-sm text-center">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Context: {job.category}</p>
                        <p className="text-sm font-bold text-gray-800 dark:text-white">{job.title}</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                            <Calendar size={10}/> {new Date(job.date).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            )}

            {messages.map(msg => (
                <MessageBubble 
                    key={msg.id} 
                    message={msg} 
                    isOwn={msg.senderId === currentUserId} 
                />
            ))}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-[#1a1625] border-t border-gray-200 dark:border-white/5">
            <form onSubmit={handleSend} className="flex items-center gap-2">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..." 
                    className="flex-1 bg-gray-100 dark:bg-white/5 border border-transparent focus:border-jambo-600 rounded-full px-4 py-2.5 text-sm outline-none dark:text-white transition-all"
                />
                <button 
                    type="submit" 
                    disabled={!input.trim()}
                    className="p-2.5 bg-jambo-600 text-white rounded-full hover:bg-jambo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    </div>
  );
};
