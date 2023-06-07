import { FolderM, FileM } from '@synerise/ds-icon';
import Tag from '@synerise/ds-tags/dist/Tag/Tag';
import  { TagShape } from '@synerise/ds-tags/dist/Tag/Tag.types';
import * as React from 'react';
import { theme } from '@synerise/ds-core';

import avatarImage from '../Avatar/av-anonym-004.png';

export const ITEMS: any = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Default',
    canAdd: true,
    canUpdate: false,
    canDelete: false,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Basic',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'My folder',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'My folder 2',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'My folder 3',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    name: 'My folder 4',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    name: 'My folder 5',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
];

export const EMPTY_ITEM = {
  id: '',
  name: '',
  canAdd: true,
  canUpdate: true,
  canDelete: true,
  icon: <FolderM />,
};

export const CONTENT_ITEMS: any = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Position 0',
    canAdd: true,
    canUpdate: false,
    canDelete: false,
    tag: <Tag name={'A'} shape={TagShape.SINGLE_CHARACTER_SQUARE} color={theme.palette['grey-200']} textColor={theme.palette['grey-500']} />,
    content: <div>content</div>,
    expanded: true,
    disableExpander:true
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Position 1',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    tag: <Tag name={'1'} shape={TagShape.SINGLE_CHARACTER_ROUND} color={theme.palette['grey-200']} textColor={theme.palette['grey-500']} />,
    content: <div>content</div>,

  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Position 2',
    canAdd: true,
    canUpdate: true,
    canDuplicate: true,
    canDelete: true,
    icon: <FileM />,
  },
];

export const EMPTY_CONTENT_ITEM = {
  id: '',
  name: 'New Item',
  canAdd: true,
  canUpdate: true,
  canDelete: true,
  tag: <Tag name={'A'} shape={TagShape.SINGLE_CHARACTER_SQUARE} color={theme.palette['grey-200']} textColor={theme.palette['grey-500']} />,
  content: <div>content</div>,
};

export const FILTER_LIST_ITEMS = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Position 0',
    description: 'The last 10 days of all customers sales ',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canDuplicate: true,
    user: {
      firstname: 'Jan',
      lastname: 'Nowak',
      avatar_url: avatarImage,
    },
    created: '2020-02-14T08:50:05+00:00',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Position 1',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    user: {
      firstname: 'Jan',
      lastname: 'Nowak',
    },
    created: '2020-02-12T08:50:05+00:00',
  },
];
export const ACCORDION_ITEMS: any = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Position 0',
    tag: <Tag name={'A'} shape={TagShape.SINGLE_CHARACTER_SQUARE} color={theme.palette['grey-200']} textColor={theme.palette['grey-500']} />,
    content: <div>content</div>,
    expanded: true,
    disableExpander:true
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Position 1',
    tag: <Tag name={'1'} shape={TagShape.SINGLE_CHARACTER_ROUND} color={theme.palette['grey-200']} textColor={theme.palette['grey-500']} />,
    content: <div>content</div>,

  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Position 2',
    icon: <FileM />,
    content: <div>content</div>,
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Position 3',
    icon: <FileM />,
    content: <div>content</div>,
  },
];

