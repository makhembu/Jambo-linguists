
import React from 'react';
import { Conversation } from '@/data/types';
import { Briefcase, User } from 'lucide-react';

interface ConversationListProps {
  conversations: Conversation[];
  selectedPeerId?: string;
  selectedJobId?: string;
  onSelect: (peerId: string, jobId?: string) => void;
}

export const ConversationList = ({ conversations, selectedPeerId, selectedJobId, onSelect }: ConversationListProps) => {
  
  if (conversations.length === 0) {
      return <div className="p-6 text-center text-gray-400 text-sm">No messages yet.</div>;
  }

  return (
    <div className="divide-y divide-gray-100 dark:divide-white/5">
        {conversations.map((conv, idx) => {
            const isSelected = conv.peerId === selectedPeerId && conv.jobId === selectedJobId;
            const peerName = conv.peer ? `${conv.peer.firstName} ${conv.peer.lastName}` : 'Unknown User';
            const time = new Date(conv.lastMessage.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            
            return (
                <div 
                    key={`${conv.peerId}-${conv.jobId}-${idx}`}
                    onClick={() => onSelect(conv.peerId, conv.jobId)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative ${isSelected ? 'bg-jambo-50 dark:bg-jambo-900/10' : ''}`}
                >
                    <div className="flex items-start gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden shrink-0">
                                {conv.peer?.avatarUrl ? <img src={conv.peer.avatarUrl} className="w-full h-full object-cover" /> : <User size={16} />}
                            </div>
                            {conv.unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#1a1625]">
                                    {conv.unreadCount}
                                </span>
                            )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <h4 className={`text-sm font-bold truncate ${conv.unreadCount > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {peerName}
                                </h4>
                                <span className="text-[10px] text-gray-400 shrink-0">{time}</span>
                            </div>
                            
                            {conv.job && (
                                <div className="flex items-center gap-1 text-[10px] text-jambo-600 dark:text-jambo-400 font-bold uppercase tracking-wide mb-1">
                                    <Briefcase size={10} />
                                    <span className="truncate">{conv.job.title}</span>
                                </div>
                            )}
                            
                            <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'font-bold text-gray-800 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                                {conv.lastMessage.senderId !== conv.peerId && 'You: '}
                                {conv.lastMessage.content}
                            </p>
                        </div>
                    </div>
                    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-jambo-600"></div>}
                </div>
            );
        })}
    </div>
  );
};
