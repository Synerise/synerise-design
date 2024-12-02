import type { Key, ReactNode } from 'react';

export type InformationCardPropertyItemTypes = 'divider';
export type InformationCardPropertyItem = {
  label: ReactNode;
  value?: ReactNode;
  id?: Key;
  type?: InformationCardPropertyItemTypes;
};
export type InformationCardPropertyListProps = {
  items?: InformationCardPropertyItem[];
  summaryItems?: InformationCardPropertyItem[];
};
