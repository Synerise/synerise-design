import { FolderItem } from '@synerise/ds-folders/dist/Folders.types';
import * as React from 'react';
import { CalendarM, ClockM, EditM, FolderAddM, StopM, TilesM } from '@synerise/ds-icon/dist/icons';
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
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '2',
    name: 'Behavioral',
    favourite: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '3',
    name: 'Campaigns',
    favourite: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '4',
    name: 'Campaigns 2',
    favourite: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '5',
    name: 'Metrics',
    favourite: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '6',
    name: 'Schema',
    favourite: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '7',
    name: 'Recent',
    favourite: true,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '8',
    name: 'Upcoming',
    favourite: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '9',
    name: 'Automation',
    favourite: false,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
  {
    id: '11',
    name: 'Promotion',
    favourite: true,
    canUpdate: true,
    canDelete: true,
    canEnterSettings: true,
  },
];
