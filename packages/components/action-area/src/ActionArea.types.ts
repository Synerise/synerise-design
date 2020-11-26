import * as React from 'react';

export type ActionAreaProps = {
  label?: string | React.ReactNode;
  description: string | React.ReactNode;
  action: () => void;
  actionLabel: string | React.ReactNode;
};
