import * as React from 'react';

export interface CardSelectGroupProps {
  className?: string;
  children: React.ReactNode;
  width?: 'small' | 'large';
  columns?: number;
}