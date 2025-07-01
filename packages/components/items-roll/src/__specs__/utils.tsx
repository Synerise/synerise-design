import React from 'react';

import Icon, { FileDownloadM, FileTypeTableM } from '@synerise/ds-icon';
import { type MenuItemProps } from '@synerise/ds-menu';

import { type ItemRollElement, type ItemsRollProps } from '../ItemsRoll.types';

const randomId = () => `${Math.random()}-${Date.now()}`;

type PropsFactoryArgs = Omit<
  ItemsRollProps,
  'intl' | 'items' | 'searchValue' | 'searchPlaceholder'
>;

type ItemOptionsArgs =
  | {
      groups: string[];
    }
  | undefined;

export const ITEM_TEXT = 'Test_Item';

const hundredItems = [...Array(100).keys()];
const getItems = (options: ItemOptionsArgs) =>
  hundredItems.map((num) => ({
    text: `${ITEM_TEXT}-${num}`,
    id: randomId(),
    ...(options
      ? {
          group: Math.random() > 0.5 ? options.groups[0] : options.groups[1],
        }
      : {}),
  }));

export const propsFactory = (
  options: PropsFactoryArgs,
  itemOptions?: ItemOptionsArgs,
  customValue?: boolean,
) => ({
  items: getItems(itemOptions) as ItemRollElement[],
  searchValue: customValue ? '5' : '',
  searchPlaceholder: 'Search...',
  ...options,
});

export const ACTIONS: ItemRollElement<MenuItemProps>[] = [
  {
    id: '1',
    onClick: () => {},
    text: 'Import',
    prefixel: <Icon component={<FileTypeTableM />} />,
  },
  {
    id: '2',
    onClick: () => {},
    text: 'Export',
    prefixel: <Icon component={<FileDownloadM />} />,
  },
];
