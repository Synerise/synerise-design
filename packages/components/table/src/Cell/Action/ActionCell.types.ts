import * as React from 'react';

export type ContentAlign = 'left' | 'right' | 'center';
export interface Props {
  children: React.ReactNode | React.ReactNode[];
  gapSize?: number;
  contentAlign?: ContentAlign;
}