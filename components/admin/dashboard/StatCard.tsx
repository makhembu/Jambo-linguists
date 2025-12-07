
import React from 'react';
import { StatCard as UIStatCard } from '../../ui/StatCard';

// Wrapper for backward compatibility
export const StatCard = (props: any) => (
  <UIStatCard {...props} />
);
