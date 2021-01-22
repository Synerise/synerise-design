import { FolderItem } from '@synerise/ds-folders/dist/Folders.types';
import * as React from 'react';
import { CalendarM, ClockM, EditM, FolderAddM, StarM, StopM, TilesM } from '@synerise/ds-icon/dist/icons';
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
export const FOLDERS: FolderItem[] = [
  {
    id: '1',
    name: 'Analytics',
    favourite: true,
    checked: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '2',
    name: 'Behavioral',
    favourite: false,
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
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '4',
    name: 'Campaigns 2',
    favourite: false,
    checked: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '5',
    name: 'Metrics',
    favourite: false,
    checked: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '6',
    name: 'Schema',
    favourite: false,
    checked: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '7',
    name: 'Recent',
    favourite: true,
    checked: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '8',
    name: 'Upcoming',
    favourite: false,
    checked: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '9',
    name: 'Automation',
    favourite: false,
    checked: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '11',
    name: 'Promotion',
    favourite: true,
    checked: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '12',
    name: 'Promotion 3',
    favourite: true,
    checked: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '13',
    name: 'Promotion 4 with very long name',
    favourite: true,
    checked: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
];
