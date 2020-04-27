import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { FileDownloadM, FileTypeTableM } from '@synerise/ds-icon/dist/icons';

import { ItemRollElement, ItemsRollProps } from '../ItemsRoll.types';

const randomId = () => `${Math.random()}-${Date.now()}`;

type PropsFactoryArgs = Omit<ItemsRollProps, 'intl' | 'items' | 'searchValue' | 'searchPlaceholder'>;

type ItemFunctionsArgs = {
  onClick?: Function;
  onRemoveElement?: Function;
  groups?: string[];
};

export const ITEM_TEXT = 'Test_Item';

const hundredItems = [...Array(100).keys()];
const getItems = ({ onClick, onRemoveElement, groups }: ItemFunctionsArgs) =>
  hundredItems.map(num => ({
    text: `${ITEM_TEXT}-${num}`,
    id: randomId(),
    index: num,
    onClick,
    onRemoveElement,
    ...(groups
      ? {
          group: Math.random() > 0.5 ? groups[0] : groups[1],
        }
      : {}),
  }));

export const propsFactory = (options: PropsFactoryArgs, itemFns: ItemFunctionsArgs, customValue?: boolean) => ({
  items: getItems(itemFns) as ItemRollElement[],
  searchValue: customValue ? '5' : '',
  searchPlaceholder: 'Search...',
  ...options,
});

export const ACTIONS = [
  {
    id: '1',
    onClick: () => {},
    text: 'Import',
    prefixel: <Icon component={<FileTypeTableM />} />,
  },
  {
    id: '2',
    onClick: 'OnExportClick',
    text: 'Export',
    prefixel: <Icon component={<FileDownloadM />} />,
  },
] as ItemRollElement[];
