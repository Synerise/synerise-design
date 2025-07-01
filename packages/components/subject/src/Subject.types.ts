import type { ReactNode, ReactText } from 'react';

export const ALL_TYPES = ['event', 'parameter', 'context'] as const;
export type SubjectType = (typeof ALL_TYPES)[number] | string;

export type SubjectItem = {
  id: ReactText;
  name: string;
  icon: ReactNode;
};

export type SubjectProps = {
  onShowPreview?: () => void;
  onActivate?: (fieldType: string) => void;
  onDeactivate?: () => void;
  getPopupContainerOverride?: (trigger: HTMLElement | null) => HTMLElement;
  placeholder: ReactNode;
  iconPlaceholder: ReactNode;
  onSelectItem: (item: SubjectItem) => void;
  selectedItem?: SubjectItem | undefined;
  type?: SubjectType;
  items: SubjectItem[];
  texts: {
    searchPlaceholder: string;
    noResults: string;
  };
  opened?: boolean;
};

export type SubjectListProps = Pick<
  SubjectProps,
  'items' | 'onSelectItem' | 'texts'
> & { hideDropdown: () => void };

export type SubjectTriggerProps = Pick<
  SubjectProps,
  'placeholder' | 'iconPlaceholder' | 'selectedItem'
> & {
  color: string;
  onClick: () => void;
};
