import type React from 'react';

export type BlockProps = {
  className?: string;
  children: React.ReactNode | string;
  isDragging: boolean;
  icon: React.ReactNode;
};
