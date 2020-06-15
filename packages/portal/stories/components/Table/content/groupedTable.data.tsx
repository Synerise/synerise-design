import randomDate from '../../../utils/randomDate';

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


export const groupDataSource = [
  {
    column: 'last_name',
    key: 0,
    value: 'Nowak',
    rows: [
      {
        key: 0,
        first_name: 'Adrian',
        last_name: 'Nowak',
        city: 'Kraków',
        age: 34,
      },
      {
        key: 1,
        first_name: 'Maciej',
        last_name: 'Nowak',
        city: 'Warszawa',
        age: 23,
      },
      {
        key: 2,
        first_name: 'Jan',
        last_name: 'Nowak',
        city: 'Kraków',
        age: 56,
      },
    ]
  },
  {
    column: 'last_name',
    key: 1,
    value: 'Kowalski',
    rows: [
      {
        key: 3,
        first_name: 'Kamil',
        last_name: 'Kowalski',
        city: 'Kraków',
        age: 34,
      },
      {
        key: 4,
        first_name: 'Tomasz',
        last_name: 'Kowalski',
        city: 'Warszawa',
        age: 23,
      },
      {
        key: 5,
        first_name: 'Hubert',
        last_name: 'Kowalski',
        city: 'Kraków',
        age: 56,
      },
    ]
  },
];
