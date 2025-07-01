import type React from 'react';

export type Props = {
  content: React.ReactNode;
  title: React.ReactText | React.ReactNode;
  expanded?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  collapsedSummary?: string | React.ReactNode;
};
