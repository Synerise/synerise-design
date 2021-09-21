import * as React from 'react';

export type Props = {
  actions: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  count?: number;
  className: string;
  maxToShow?: number;
};

export type State = {
  areAllShown: boolean;
};
