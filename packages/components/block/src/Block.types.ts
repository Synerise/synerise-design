import * as React from 'react';

export type BlockProps = {
  children: React.ReactNode | string;
  isDragging: boolean;
  icon: React.ReactNode;
};
