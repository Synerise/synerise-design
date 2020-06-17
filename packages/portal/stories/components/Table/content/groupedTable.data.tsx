import randomDate from '../../../utils/randomDate';
import { GROUP_BY } from '@synerise/ds-column-manager/dist/ColumnManagerGroupSettings/ColumnManagerGroupSettings.types';

export const COLUMNS = [
  {
    id: '0',
    name: 'First name',
    key: 'first_name',
    visible: true,
    type: 'text',
    fixed: undefined
  },
  {
    id: '1',
    name: 'Last name',
    key: 'last_name',
    visible: true,
    type: 'boolean',
    fixed: undefined
  },
  {
    id: '2',
    name: 'City',
    key: 'city',
    visible: true,
    type: 'text',
    fixed: undefined
  },
  {
    id: '3',
    name: 'Age',
    key: 'age',
    visible: true,
    type: 'number',
    fixed: undefined
  },
  {
    id: '4',
    name: 'Last activity',
    key: 'last_activity',
    dataIndex: 'last_activity',
    type: 'date',
    visible: true,
    fixed: undefined,
  }
];

export const DATA_SOURCE = [
  {
    key: 0,
    first_name: 'Adrian',
    last_name: 'Nowak',
    city: 'Kraków',
    age: 34,
    last_activity: randomDate(),
  },
  {
    key: 1,
    first_name: 'Maciej',
    last_name: 'Nowak',
    city: 'Warszawa',
    age: 23,
    last_activity: randomDate(),
  },
  {
    key: 2,
    first_name: 'Jan',
    last_name: 'Nowak',
    city: 'Kraków',
    age: 56,
    last_activity: randomDate(),
  },
  {
    key: 3,
    first_name: 'Kamil',
    last_name: 'Kowalski',
    city: 'Kraków',
    age: 34,
    last_activity: randomDate(),
  },
  {
    key: 4,
    first_name: 'Tomasz',
    last_name: 'Kowalski',
    city: 'Warszawa',
    age: 23,
    last_activity: randomDate(),
  },
  {
    key: 5,
    first_name: 'Hubert',
    last_name: 'Kowalski',
    city: 'Kraków',
    age: 56,
    last_activity: randomDate(),
  },
];



export const VIEWS = [
  {
    label: 'All filters',
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
          }
        }
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
          }
        }
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
                }
              },
              {
                from: {
                  value: 'L',
                  error: undefined,
                },
                to: {
                  value: 'R',
                  error: undefined,
                }
              },
            ],
          }
        }
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
