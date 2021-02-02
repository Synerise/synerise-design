import * as React from 'react';
import { CalendarM, ClockM, EditM, FolderAddM, StarM, StopM, TilesM } from '@synerise/ds-icon/dist/icons';
import { TagsListItem, TagVisibility } from '@synerise/ds-tagslist/dist/TagsList.types';

export const TOP_MENU_ITEMS: { icon: React.ReactNode; text: string }[] = [
  {
    icon: <TilesM />,
    text: 'All campaigns',
  },
  {
    icon: <ClockM />,
    text: 'Recent',
  },
  {
    icon: <EditM />,
    text: 'Draft',
  },
  {
    icon: <CalendarM />,
    text: 'Scheduled',
  },
  {
    icon: <StopM />,
    text: 'Finished',
  },
];

export const MIDDLE_MENU_ITEMS: { icon: React.ReactNode; text: string }[] = [
  {
    icon: <FolderAddM />,
    text: 'Templates',
  },
];

export const ADD_TAGS: TagsListItem[] = [
  {
    id: '111',
    name: 'Tag 1',
    description: 'Tags 1 description',
  },
  {
    id: '112',
    name: 'Tag 2',
    description: 'Tags 2 description',
  },
  {
    id: '113',
    name: 'Tag 3',
    description: 'Tags 3 description',
  },
  {
    id: '114',
    name: 'Tag 4',
    description: 'Tags 4 description',
  },
  {
    id: '115',
    name: 'Tag 5',
    description: 'Tags 5 description',
  },
  {
    id: '116',
    name: 'Tag 6',
    description: 'Tags 6 description',
  },
  {
    id: '117',
    name: 'Tag 7',
    description: 'Tags 7 description',
  },
  {
    id: '118',
    name: 'Tag 8',
    description: 'Tags 8 description',
  },
  {
    id: '119',
    name: 'Tag 9',
    description: 'Tags 9 description',
  },
  {
    id: '120',
    name: 'Tag 10',
    description: 'Tags 10 description',
  },
]

export const FOLDERS: TagsListItem[] = [
  {
    id: '1',
    name: 'Analytics',
    favourite: true,
    checked: false,
    visibility: TagVisibility.Show,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '2',
    name: 'Behavioral',
    favourite: false,
    visibility: TagVisibility.ShowIfUsed,
    checked: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '3',
    name: 'Campaigns',
    favourite: false,
    checked: false,
    visibility: TagVisibility.Hide,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '4',
    name: 'Campaigns 2',
    favourite: false,
    checked: false,
    visibility: TagVisibility.Hide,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '5',
    name: 'Metrics',
    favourite: false,
    checked: false,
    visibility: TagVisibility.Hide,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '6',
    name: 'Schema',
    favourite: false,
    checked: false,
    visibility: TagVisibility.Hide,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '7',
    name: 'Recent',
    favourite: true,
    checked: false,
    visibility: TagVisibility.Hide,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '8',
    name: 'Upcoming',
    favourite: false,
    checked: false,
    visibility: TagVisibility.Hide,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '9',
    name: 'Automation',
    favourite: false,
    checked: false,
    visibility: TagVisibility.Hide,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '11',
    name: 'Promotion - Promo Promo!',
    favourite: true,
    checked: false,
    visibility: TagVisibility.Hide,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '12',
    name: 'The Promotion 3 - Promotion',
    favourite: true,
    checked: false,
    visibility: TagVisibility.Hide,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '13',
    name: 'Promotion 4 with very long name',
    favourite: true,
    checked: false,
    visibility: TagVisibility.Hide,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
];
