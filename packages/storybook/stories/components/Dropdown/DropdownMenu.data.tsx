import React from 'react';
import styled from 'styled-components';

import { type DropdownMenuListItemProps } from '@synerise/ds-dropdown';
import Icon, {
  CopyClipboardM,
  DuplicateM,
  EditM,
  FileViewM,
  TrashM,
} from '@synerise/ds-icon';

export const MENU_ITEMS: DropdownMenuListItemProps[] = [
  { text: 'Preview', id: '1', prefixel: <Icon component={<FileViewM />} /> },
  { text: 'Edit', id: '2', prefixel: <Icon component={<EditM />} /> },
  { text: 'Duplicate', id: '3', prefixel: <Icon component={<DuplicateM />} /> },
  { type: 'divider' },
  {
    type: 'danger',
    text: 'Delete',
    id: '4',
    prefixel: <Icon component={<TrashM />} />,
  },
  { type: 'divider', style: { padding: '10px 0' } },
  {
    text: 'Copy ID',
    id: '5',
    copyable: {
      copyValue: 'fasd53dgasgdgq6qtdasd',
      copiedLabel: 'Copied',
    },
    prefixel: <Icon component={<CopyClipboardM />} />,
  },
];
const createItems = (count = 10, options = {}) => {
  return [...new Array(count)].map((i, k) => ({
    ...options,
    text: `Option ${k + 1}`,
    id: `item-${k}`,
  }));
};
export const MENU_ITEMS_MULTI_SELECT: DropdownMenuListItemProps[] = createItems(
  10,
  {
    type: 'select',
  },
);

export const MENU_ITEMS_PLAIN = MENU_ITEMS.map((item) => ({
  ...item,
  prefixel: undefined,
}));

export const PageWrapper = styled.div`
  position: relative;
`;
export const TopLeftWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
`;
export const TopRightWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;
export const BottomLeftWrapper = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
`;
export const BottomRightWrapper = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;
