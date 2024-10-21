import type { Column } from '@synerise/ds-column-manager';
import type { Category } from '@synerise/ds-item-filter';
import moment from 'moment';

const randomDate = () => {
  return moment(new Date(+new Date() - Math.floor(Math.random() * 10000000000))).format();
};

export const COLUMNS: Column[] = [
  {
    id: '0',
    key: 'user_name',
    name: 'User name',
    visible: true,
    type: 'text',
    fixed: 'left',
  },
  {
    id: '1',
    key: 'city',
    name: 'City',
    visible: true,
    type: 'text',
    fixed: undefined,
  },
  {
    id: '2',
    key: 'language',
    name: 'Language',
    visible: true,
    type: 'text',
    fixed: undefined,
  },
  {
    id: '3',
    key: 'clients_number',
    name: 'Clients numbers',
    visible: false,
    type: 'number',
    fixed: undefined,
  },
  {
    id: '4',
    key: 'clients',
    name: 'Clients - last 3 years dasdad dasdas dasdad as',
    visible: false,
    type: 'list',
    fixed: undefined,
  },
  {
    id: '5',
    key: 'clients',
    name: 'Client - last week',
    visible: false,
    type: 'list',
    fixed: undefined,
  },
  {
    id: '6',
    key: 'clients',
    name: 'Client - all time',
    visible: false,
    type: 'list',
    fixed: undefined,
  },
  {
    id: '7',
    key: 'clients',
    name: 'Active',
    visible: false,
    type: 'boolean',
    fixed: undefined,
  },
];

export const CATEGORIES: Category[] = [
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
        name: 'My view #2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        user: {
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: COLUMNS,
      },
      {
        id: '0002',
        name: 'View',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        user: {
          avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: [],
      },
    ],
  },
  {
    label: 'My views',
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
        name: 'My view #2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        user: {
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: COLUMNS,
      },
    ],
  },
];

export const EMPTY_FILTER = {
  id: '0002',
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
