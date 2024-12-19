import React from 'react';

import Icon, {
  BooleanM,
  CalendarM,
  CopyClipboardM,
  DuplicateM,
  EditM,
  FolderM,
  HashM, ListM,
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
  { text: 'Edit', prefixel:<Icon component={<EditM />}/> },
  { text: 'Duplicate' , prefixel:<Icon component={<DuplicateM />}/> },
  { text: 'Move To' , prefixel:<Icon component={<FolderM />}/>},
  { text: 'Delete', type: 'danger',prefixel:<Icon component={<TrashM />}/>},
  { type: 'divider' },
  {
    text: 'ID:6b7c3084-b6c...', copyHint: 'Copy ID',
    copyTooltip: 'Copied!',
    copyValue: 'Fake ID',
    copyable: true,
    prefixel: <Icon component={<CopyClipboardM/>}/>,
  }
];

const subItems = [ { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }]
export const dataItems = [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }, { text: 'Item 4', subMenu: subItems } ];

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


