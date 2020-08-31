import * as React from 'react';

export const ALL_TYPES = ['event', 'parameter', 'context'] as const;
export type SubjectType = typeof ALL_TYPES[number];

export type SubjectItem = {
  id: React.ReactText;
  name: string;
  icon: React.ReactNode;
};

export type SubjectProps = {
  showPreview: () => void;
  placeholder: string | React.ReactNode;
  iconPlaceholder: React.ReactNode;
  selectItem: (item: SubjectItem) => void;
  selectedItem: SubjectItem;
  type?: SubjectType;
  items: SubjectItem[];
};

export type SubjectListProps = Pick<SubjectProps, 'items' | 'selectItem'> & { hideDropdown: () => void };

export type SubjectTriggerProps = Pick<SubjectProps, 'placeholder' | 'iconPlaceholder' | 'selectedItem'> & {
  color: string;
  onClick: () => void;
};
