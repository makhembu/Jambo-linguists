
import React from 'react';
import { StatCard as UIStatCard } from '../../../ui/StatCard';

// Re-exporting the UI component to maintain backward compatibility if imported elsewhere without checking
// Ideally, other components should import from ui/StatCard directly.
export const StatsCard = (props: any) => (
  <UIStatCard {...props} variant="brand" />
);
