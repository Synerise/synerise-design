import React from 'react';

import {
  InfoFillS,
  VarTypeBooleanM,
  VarTypeDateM,
  VarTypeListM,
  VarTypeNumberM,
  VarTypeStringM,
} from '@synerise/ds-icon';
import { DSColumnType } from '@synerise/ds-table';
import { GROUP_BY } from '@synerise/ds-column-manager';

import { AVATAR_IMAGE } from '../../../constants';
import { randomDate } from '../../../utils';
import { AdditionalColumnData } from '../Table.types';
import { chromaticCellRender } from '../Table.utils';

export type ViewsType = typeof VIEWS[number];
export type CategoriesType = typeof CATEGORIES[number];

export type RowType = typeof DATA_SOURCE[number];
export type ColumnType = DSColumnType<RowType> & AdditionalColumnData;

export const COLUMNS: ColumnType[] = [
  {
    id: '0',
    name: 'First name',
    key: 'first_name',
    visible: true,
    type: 'text',
    fixed: undefined,
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    className: 'chromatic-ignore',
  },
  {
    id: '1',
    name: 'Last name',
    key: 'last_name',
    visible: true,
    type: 'boolean',
    fixed: undefined,
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    className: 'chromatic-ignore',
  },
  {
    id: '2',
    name: 'City',
    key: 'city',
    visible: true,
    type: 'text',
    fixed: undefined,
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: chromaticCellRender,
  },
  {
    id: '3',
    name: 'Age',
    key: 'age',
    visible: true,
    type: 'number',
    fixed: undefined,
    icon: { component: <VarTypeNumberM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: chromaticCellRender,
  },
  {
    id: '4',
    name: 'Last activity',
    key: 'last_activity',
    dataIndex: 'last_activity',
    type: 'date',
    visible: true,
    fixed: undefined,
    icon: { component: <VarTypeDateM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: chromaticCellRender,
  },
];

export const DATA_SOURCE = [
  {
    key: 0,
    first_name: 'Adrian',
    last_name: 'Nowak',
    city: 'Kraków',
    age: 34,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 1,
    first_name: 'Maciej',
    last_name: 'Nowak',
    city: 'Warszawa',
    age: 23,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 2,
    first_name: 'Jan',
    last_name: 'Nowak',
    city: 'Kraków',
    age: 56,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 3,
    first_name: 'Kamil',
    last_name: 'Kowalski',
    city: 'Kraków',
    age: 34,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 4,
    first_name: 'Tomasz',
    last_name: 'Kowalski',
    city: 'Warszawa',
    age: 23,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 5,
    first_name: 'Hubert',
    last_name: 'Kowalski',
    city: 'Kraków',
    age: 56,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 10,
    first_name: 'Kazimierz',
    last_name: 'Jonak',
    city: 'Poznań',
    age: 18,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 11,
    first_name: 'Józef',
    last_name: 'Kazimierzak',
    city: 'Olsztyn',
    age: 89,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 12,
    first_name: 'Jan',
    last_name: 'Nowak',
    city: 'Kraków',
    age: 56,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 13,
    first_name: 'Łukasz',
    last_name: 'Szumilas',
    city: 'Warszawa',
    age: 45,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 14,
    first_name: 'Adam',
    last_name: 'Nosowski',
    city: 'Łódź',
    age: 41,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 15,
    first_name: 'Marek',
    last_name: 'Mostowiak',
    city: 'Katowice',
    age: 56,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 20,
    first_name: 'Kazimierz',
    last_name: 'Jonak',
    city: 'Poznań',
    age: 18,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 21,
    first_name: 'Adam',
    last_name: 'Nowak',
    city: 'Wrocław',
    age: 41,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 22,
    first_name: 'Jan',
    last_name: 'Polak',
    city: 'Lublin',
    age: 64,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 23,
    first_name: 'Maciej',
    last_name: 'Lewandowski',
    city: 'Wrocałw',
    age: 15,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 24,
    first_name: 'Antoni',
    last_name: 'Kaczorowski',
    city: 'Kraków',
    age: 72,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
  {
    key: 25,
    first_name: 'Marek',
    last_name: 'Nowak',
    city: 'Warszawa',
    age: 33,
    last_activity: randomDate(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
  },
];

export const VIEWS = [
  {
    label: 'All views',
    hasMore: false,
    items: [
      {
        id: '0000',
        name: 'My view #1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
        columns: COLUMNS,
        groupSettings: {
          column: COLUMNS[0],
          settings: {
            type: GROUP_BY.value,
            interval: false,
            ranges: false,
          },
        },
      },
      {
        id: '0001',
        name: 'View #2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        user: {
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: COLUMNS,
        groupSettings: {
          column: COLUMNS[3],
          settings: {
            type: GROUP_BY.interval,
            interval: 3,
            ranges: false,
          },
        },
      },
      {
        id: '0002',
        name: 'View #3',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        user: {
          avatar_url: AVATAR_IMAGE,
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: COLUMNS,
        groupSettings: {
          column: COLUMNS[2],
          settings: {
            type: GROUP_BY.ranges,
            interval: false,
            ranges: [
              {
                from: {
                  value: 'A',
                  error: undefined,
                },
                to: {
                  value: 'K',
                  error: undefined,
                },
              },
              {
                from: {
                  value: 'L',
                  error: undefined,
                },
                to: {
                  value: 'R',
                  error: undefined,
                },
              },
            ],
          },
        },
      },
    ],
  },
];

export const EMPTY_VIEW = {
  id: '0003',
  name: '',
  created: randomDate(),
  canUpdate: true,
  canDelete: true,
  canDuplicate: true,
  categories: ['All views', 'My views'],
  user: {
    avatar_url: AVATAR_IMAGE,
    firstname: 'Kamil',
    lastname: 'Kowalski',
  },
  columns: COLUMNS,
};

export const CATEGORIES = [
  {
    label: 'All filters',
    hasMore: false,
    items: [
      {
        id: '0000',
        name: 'Filter #1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
        columns: COLUMNS,
      },
      {
        id: '0001',
        name: 'Filter #2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        columns: COLUMNS,
      },
      {
        id: '0002',
        name: 'Filter #3',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        user: {
          avatar_url: AVATAR_IMAGE,
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: COLUMNS,
      },
    ],
  },
];

export const COLUMN_MANAGER_TEXTS = {
  activateItemTitle: 'By activating this view, you will cancel your unsaved view settings',
  activate: 'Activate',
  cancel: 'Cancel',
  deleteConfirmationTitle: 'Delete view',
  deleteConfirmationDescription:
    'Deleting this view will permanently remove it from templates library. All tables using this view will be reset.',
  deleteConfirmationYes: 'Yes',
  deleteConfirmationNo: 'No',
  deleteLabel: 'Delete',
  noResults: 'No results',
  searchPlaceholder: 'Search',
  searchClearTooltip: 'Clear',
  title: 'Views',
  itemActionRename: 'Rename',
  itemActionDuplicate: 'Duplicate',
  itemActionDelete: 'Delete',
};

export const COLUMN_ICONS = {
  text: <VarTypeStringM />,
  number: <VarTypeNumberM />,
  list: <VarTypeListM />,
  boolean: <VarTypeBooleanM />,
  date: <VarTypeDateM />,
};

export const PARAMETERS = COLUMNS.map(column => ({
  text: column.name,
  icon: COLUMN_ICONS[column.type || 'text'],
}));
