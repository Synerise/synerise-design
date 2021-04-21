import { ItemProps } from '@synerise/ds-manageable-list/dist/Item/Item.types';
import * as React from 'react';

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
  removeItem?: (removeParams: { id: React.ReactText }) => void;
  editItem?: (editParams: { id: React.ReactText; name: string }) => void;
  duplicateItem?: (duplicateParams: { id: React.ReactText }) => void;
  selectItem: (selectParams: { id: React.ReactText }) => void;
  categories: Category[];
  selectedItemId: string | undefined;
  maxToShowItems?: number;
  texts?: {
    [k: string]: string | React.ReactNode;
  };
  theme: {
    [k: string]: string;
  };
  search?: {
    onChange: (value: string) => void;
    onClear: () => void;
    value: string;
  };
};
