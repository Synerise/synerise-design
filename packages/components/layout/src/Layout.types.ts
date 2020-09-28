import * as React from 'react';

export interface Style<T> {
  left?: T;
  leftInner?: T;
  main?: T;
  mainInner?: T;
  right?: T;
  rightInner?: T;
}

export type LayoutProps = {
  header?: React.ReactNode;
  subheader?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  styles?: Style<React.CSSProperties>;
  leftOpened?: boolean;
  rightOpened?: boolean;
};
