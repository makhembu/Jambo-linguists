
import React from 'react';
import { Badge } from './Badge';
import { Clock, CheckCircle, AlertCircle, PlayCircle, FileText, XCircle, Globe } from 'lucide-react';

export const JobStatusBadge = ({ status, className = '' }: { status: string, className?: string }) => {
  let variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand' = 'neutral';
  let icon = null;

  switch (status) {
    case 'Open':
      variant = 'brand'; // Brand color for "Marketplace/Available"
      icon = <Globe size={10} />;
      break;
    case 'Scheduled':
      variant = 'info'; // Blue for booked/scheduled
      icon = <Clock size={10} />;
      break;
    case 'In Progress':
      variant = 'info'; // Use info but add pulse in parent usually, or handle here
      icon = <PlayCircle size={10} />;
      break;
    case 'Pending Approval':
      variant = 'warning'; // Orange for review
      icon = <Clock size={10} />;
      break;
    case 'Revision':
      variant = 'danger'; // Red/Amber for attention
      icon = <AlertCircle size={10} />;
      break;
    case 'Completed':
      variant = 'success'; // Green for done
      icon = <CheckCircle size={10} />;
      break;
    case 'Cancelled':
      variant = 'neutral'; // Gray for dead
      icon = <XCircle size={10} />;
      break;
    default:
      variant = 'neutral';
  }

  // Override for specific visual tweaks not covered by standard Badge variants if needed
  const extraClasses = status === 'In Progress' ? 'animate-pulse' : '';

  return (
    <Badge variant={variant} icon={icon} className={`${extraClasses} ${className}`}>
      {status}
    </Badge>
  );
};
