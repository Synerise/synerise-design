import type { Key, ReactNode } from 'react';

export type InformationCardPropertyItemTypes = 'divider';

export type InformationCardPropertyDivider = {
  type: InformationCardPropertyItemTypes;
  id?: Key;
};

export type InformationCardPropertyItem =
  | {
      id?: Key;
      label: ReactNode;
      value?: ReactNode;
    }
  | InformationCardPropertyDivider;

export type InformationCardPropertyListProps = {
  items?: InformationCardPropertyItem[];
  summaryItems?: InformationCardPropertyItem[];
};
