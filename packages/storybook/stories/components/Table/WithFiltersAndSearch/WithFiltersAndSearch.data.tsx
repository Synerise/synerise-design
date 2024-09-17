import React from 'react';
import { faker } from '@faker-js/faker';

import { InfoFillS, VarTypeBooleanM, VarTypeDateM, VarTypeListM, VarTypeNumberM, VarTypeStringM } from '@synerise/ds-icon';

import { randomDate } from '../../../utils';

export type ViewsType = typeof VIEWS[number];
export type CategoriesType = typeof CATEGORIES[number];

export const DATA_SOURCE = [...new Array(55)].map((i, k) => ({
  key: k + 1,
  name: faker.person.fullName(),
  active: faker.datatype.boolean(),
  disabled: Math.random() < 0.2,
  unavailable: Math.random() < 0.1,
  country: faker.helpers.arrayElement([
    { code: 'us', name: 'USA' },
    { code: 'pl', name: 'Poland' },
    { code: 'de', name: 'Germany' },
    { code: 'it', name: 'Italy' },
    { code: 'es', name: 'Spain' },
    { code: 'ru', name: 'Russia' },
  ]),
  age: (Math.random() * 50 + 10).toFixed(0),
}));


export const COLUMNS = [
  {
    id: '0',
    name: 'Name',
    key: 'name',
    visible: true,
    type: 'text',
    fixed: undefined,
    width: 254,
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
  },
  {
    id: '1',
    name: 'Status',
    key: 'active',
    visible: true,
    type: 'boolean',
    fixed: undefined,
    width: 254,
    icon: { component: <VarTypeBooleanM /> },
    iconTooltip: { component: <InfoFillS /> },
  },
  {
    id: '2',
    name: 'Country',
    key: 'country',
    visible: true,
    type: 'text',
    fixed: undefined,
    width: 254,
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
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
  },
];

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
        categories: []
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
        categories: []
      },
      {
        id: '0002',
        name: 'Filter #3',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        user: {
          avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: COLUMNS,
        categories: []
      },
    ],
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
        categories: []
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
        categories: []
      },
      {
        id: '0002',
        name: 'View #3',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        user: {
          avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: COLUMNS,
        categories: []
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
    avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
    firstname: 'Kamil',
    lastname: 'Kowalski',
  },
  columns: COLUMNS,
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
}