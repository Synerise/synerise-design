import type React from 'react';

export type ResultProps = {
  className?: string;
  title?: string | React.ReactNode;
  type:
    | string
    | 'info'
    | 'warning'
    | 'error'
    | 'success'
    | 'progress'
    | 'no-results';
  description?: string | React.ReactNode;
  buttons?: React.ReactNode;
  panel?: React.ReactNode;
  customIcon?: React.ReactElement;
  /** @deprecated */
  noSearchResults?: boolean;
};
