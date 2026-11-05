import type { ReactNode } from 'react';

export type Props = {
  content: ReactNode;
  title: ReactNode;
  expanded?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  collapsedSummary?: ReactNode;
};
