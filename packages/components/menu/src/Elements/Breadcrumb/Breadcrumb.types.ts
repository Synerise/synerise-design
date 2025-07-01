import type React from 'react';

export interface BreadcrumbProps {
  prefixel?: React.ReactNode;
  disabled?: boolean;
  path: string[];
  highlight?: string;
  description?: string | React.ReactNode;
  onPathClick?: (path: string & { id?: number | string }) => void;
  compact?: boolean;
  startWithArrow?: boolean;
  gradientOverlap?: boolean;
  highlightActivePath?: boolean;
}
