import type { CSSProperties, ReactNode } from 'react';

export type BreadcrumbProps = {
  prefixel?: ReactNode;
  disabled?: boolean;
  path: string[];
  highlight?: string;
  className?: string;
  description?: ReactNode;
  onPathClick?: (path: string & { id?: number | string }) => void;
  compact?: boolean;
  startWithArrow?: boolean;
  gradientOverlap?: boolean;
  highlightActivePath?: boolean;
  style?: CSSProperties;
};
