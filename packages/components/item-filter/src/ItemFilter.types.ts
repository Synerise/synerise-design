import { ItemProps } from '@synerise/ds-manageable-list/dist/Item/Item';
import * as React from 'react';
import { IntlFormatters } from 'react-intl';

export type Category = {
  label: string;
  items: Item[];
  hasMore: boolean;
};

interface Item extends ItemProps {
  categories: string[];
}

export type ItemFilterProps = {
  visible: boolean;
  hide: () => void;
  fetchData: (category: Category) => void;
  loading?: boolean;
  removeItem?: (removeParams: { id: string }) => void;
  editItem?: (editParams: { id: string; name: string }) => void;
  duplicateItem?: (duplicateParams: { id: string }) => void;
  selectItem: (selectParams: { id: string }) => void;
  categories: Category[];
  selectedItemId: string | undefined;
  maxToShowItems?: number;
  texts?: {
    [k: string]: string | React.ReactNode;
  };
  theme: {
    [k: string]: string;
  };
  intl: IntlFormatters;
  search?: {
    onChange: (value: string) => void;
    onClear: () => void;
    value: string;
  };
};
