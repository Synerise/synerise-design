import * as React from 'react';

export type Props = {
  content: React.ReactNode;
  title: React.ReactText | React.ReactNode;
  expanded?: boolean;
  onCollapseChange?: () => void;
};
