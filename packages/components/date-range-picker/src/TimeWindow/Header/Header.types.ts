import * as React from 'react';

export type Props = {
  title: string | React.ReactNode;
  actions: Action[];
  style?: React.CSSProperties;
};
export type Action = {
  key: React.ReactText;
  onClick: () => void;
  label: string | React.ReactNode;
};
