
import React from 'react';
import { CheckCircle, Briefcase, Shield, GraduationCap } from 'lucide-react';
import { Notification } from '../../../../data/mockDatabase';
import { Card } from '../../../ui/Card';

export const RecentActivity = ({ notifications, onItemClick }: { notifications: Notification[], onItemClick: (link: string) => void }) => {
    const getIcon = (type: string) => {
        switch(type) {
            case 'check': return CheckCircle;
            case 'briefcase': return Briefcase;
            case 'shield': return Shield;
            default: return GraduationCap;
        }
    };

    return (
        <Card className="p-6">
            <h4 className="font-serif font-bold text-lg mb-6 flex items-center justify-between text-jambo-950 dark:text-white">
                Recent Activity
                <span className="text-xs font-sans font-normal text-jambo-600 dark:text-jambo-400 cursor-pointer hover:underline">View All</span>
            </h4>
            <div className="space-y-6">
                {notifications.slice(0, 5).map((notif) => {
                    const Icon = getIcon(notif.iconType);
                    return (
                        <div 
                            key={notif.id} 
                            onClick={() => notif.linkTo && onItemClick(notif.linkTo)}
                            className="flex gap-4 group cursor-pointer"
                        >
                            <div className={`w-10 h-10 rounded-full ${notif.bg} ${notif.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                <Icon size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight mb-1 group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors">{notif.title}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">{notif.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
