import * as React from 'react';

export const ALL_TYPES = ['event', 'parameter', 'context'] as const;
export type SubjectType = typeof ALL_TYPES[number] | string;

export type SubjectItem = {
  id: React.ReactText;
  name: string;
  icon: React.ReactNode;
};

export type SubjectProps = {
  onShowPreview?: () => void;
  onActivate?: () => void;
  getPopupContainerOverride?: (trigger: HTMLElement | null) => HTMLElement;
  placeholder: string | React.ReactNode;
  iconPlaceholder: React.ReactNode;
  onSelectItem: (item: SubjectItem) => void;
  selectedItem?: SubjectItem | undefined;
  type?: SubjectType;
  items: SubjectItem[];
  texts: {
    searchPlaceholder: string;
    noResults: string;
  };
};

export type SubjectListProps = Pick<SubjectProps, 'items' | 'onSelectItem' | 'texts'> & { hideDropdown: () => void };

export type SubjectTriggerProps = Pick<SubjectProps, 'placeholder' | 'iconPlaceholder' | 'selectedItem'> & {
  color: string;
  onClick: () => void;
};
