import * as React from 'react';

export interface Props {
  children: React.ReactNode | React.ReactNode[];
  active?: boolean;
  onClick?: () => void;
  theme: {
    [k: string]: string;
  };
}