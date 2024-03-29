import randomDate from '../../../utils/randomDate';
import { InfoFillS, VarTypeBooleanM, VarTypeListM, VarTypeNumberM, VarTypeStringM } from '@synerise/ds-icon';
import * as React from 'react';

export const COLUMNS = [
  {
    id: '0',
    name: 'Name',
    key: 'name',
    visible: true,
    type: 'text',
    fixed: undefined,
    width: 254,
    icon: { component: <VarTypeStringM/>},
    iconTooltip: { component: <InfoFillS/>},
  },
  {
    id: '1',
    name: 'Status',
    key: 'active',
    visible: true,
    type: 'boolean',
    fixed: undefined,
    width: 254,
    icon: { component: <VarTypeBooleanM/>},
    iconTooltip: { component: <InfoFillS/>},
  },
  {
    id: '2',
    name: 'Country',
    key: 'country',
    visible: true,
    type: 'text',
    fixed: undefined,
    width: 254,
    icon: { component: <VarTypeStringM/>},
    iconTooltip: { component: <InfoFillS/>},
  },
  {
    id: '3',
    name: 'Age',
    key: 'age',
    visible: true,
    type: 'number',
    fixed: undefined,
    icon: { component: <VarTypeNumberM/>},
    iconTooltip: { component: <InfoFillS/>},
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
          avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: COLUMNS,
      }
    ]
  }
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
      }
    ]
  }
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
