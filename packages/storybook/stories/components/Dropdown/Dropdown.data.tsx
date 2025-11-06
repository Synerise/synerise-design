import React from 'react';
import { action } from 'storybook/actions';

import Icon, {
  BooleanM,
  CalendarM,
  CopyClipboardM,
  DuplicateM,
  EditM,
  FolderM,
  HashM,
  ListM,
  TextM,
  TrashM,
} from '@synerise/ds-icon';

export const data = [
  { text: 'Preview' },
  { text: 'Edit' },
  { text: 'Duplicate' },
  { type: 'divider' },
  { text: 'Delete', type: 'danger' },
];

export const dataCopy = [
  { text: 'Edit', prefixel: <Icon component={<EditM />} /> },
  { text: 'Duplicate', prefixel: <Icon component={<DuplicateM />} /> },
  { text: 'Move To', prefixel: <Icon component={<FolderM />} /> },
  {
    text: 'Delete',
    type: 'danger' as const,
    prefixel: <Icon component={<TrashM />} />,
  },
  { type: 'divider' },
  {
    text: 'Copy ID',
    copyable: {
      copyValue: 'Fake ID',
      copiedLabel: 'Copied!',
    },
    prefixel: <Icon component={<CopyClipboardM />} />,
  },
];

export const menuData = [
  { text: 'Preview', onClick: action('Preview clicked') },
  { text: 'Edit', onClick: action('Edit clicked') },
  { text: 'Duplicate', onClick: action('Duplicate clicked') },
];

const subItems = [
  { text: 'sub 1' },
  { text: 'sub 1' },
  { text: 'sub 1' },
  { text: 'sub 1' },
  { text: 'sub 1' },
  { text: 'sub 1' },
  { text: 'sub 1' },
  { text: 'sub 1' },
  { text: 'sub 1' },
  { text: 'sub 1' },
  { text: 'sub 1' },
];
export const dataItems = [
  { text: 'Item 1' },
  { text: 'Item 2', prefixel: <Icon component={<CalendarM />} /> },
  { text: 'Item 3' },
  { text: 'Item 4', subMenu: subItems },
];

export const tabsWithIcons = [
  {
    icon: <CalendarM />,
  },
  {
    icon: <TextM />,
  },
  {
    icon: <HashM />,
  },
  {
    icon: <BooleanM />,
  },
  {
    icon: <ListM />,
  },
];

export const PLACEMENTS = {
  topLeft: 'Top left',
  topRight: 'Top right',
  topCenter: 'Top center',
  bottomLeft: 'Bottom left',
  bottomRight: 'Bottom right',
  bottomCenter: 'Bottom center',
};
