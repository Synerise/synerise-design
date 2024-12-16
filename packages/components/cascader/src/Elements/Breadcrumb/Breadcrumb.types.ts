import { ListItemProps } from '@synerise/ds-list-item';
import type { CSSProperties, ReactNode } from 'react';

export type BreadcrumbProps = ListItemProps & {
  prefixel?: ReactNode;
  disabled?: boolean;
  isNavigation?: boolean;
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
