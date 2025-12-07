import React from 'react';
import { Message } from '../../data/types';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  const time = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex w-full ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[75%] md:max-w-[60%] flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        <div 
          className={`
            px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
            ${isOwn 
              ? 'bg-jambo-600 text-white rounded-tr-none' 
              : 'bg-white dark:bg-white/10 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-white/5 rounded-tl-none'
            }
          `}
        >
          {message.content}
        </div>
        <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
          <span>{time}</span>
          {isOwn && (
            <span>
              {message.isRead ? <CheckCheck size={12} className="text-blue-500" /> : <Check size={12} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};