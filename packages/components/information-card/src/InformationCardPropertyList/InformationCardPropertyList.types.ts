import type { ReactNode } from 'react';

export type InformationCardPropertyItemTypes = 'divider';
export type InformationCardPropertyItem = {
  label: ReactNode;
  value?: ReactNode;
  type?: InformationCardPropertyItemTypes;
};
export type InformationCardPropertyListProps = {
  items?: InformationCardPropertyItem[];
  summaryItems?: InformationCardPropertyItem[];
};
