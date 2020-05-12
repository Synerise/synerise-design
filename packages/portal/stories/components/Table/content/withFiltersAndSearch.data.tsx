export const COLUMNS = [
  {
    id: '0',
    name: 'Name',
    key: 'name',
    visible: true,
    type: 'text',
    fixed: undefined
  },
  {
    id: '1',
    name: 'Status',
    key: 'active',
    visible: true,
    type: 'boolean',
    fixed: undefined
  },
  {
    id: '2',
    name: 'Country',
    key: 'country',
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
];

export const FILTERS = [
  {
    id: '0000',
    name: 'Filter #1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
    created: '01-05-2020 12:02',
    canUpdate: true,
    canDelete: true,
    canDuplicate: true,
    categories: ['My filters', 'All filters'],
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
    created: '01-12-2019 12:02',
    canUpdate: false,
    canDelete: false,
    canDuplicate: true,
    categories: ['All filters'],
    user: {
      firstname: 'Kamil',
      lastname: 'Kowalski',
    },
    columns: COLUMNS,
  },
  {
    id: '0002',
    name: 'Filter #3',
    created: '01-12-2019 12:02',
    canUpdate: false,
    canDelete: false,
    canDuplicate: true,
    categories: ['All filters'],
    user: {
      avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
      firstname: 'Kamil',
      lastname: 'Kowalski',
    },
    columns: COLUMNS,
  }
];

export const VIEWS = [
  {
    id: '0000',
    name: 'My view #1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
    created: '01-05-2020 12:02',
    canUpdate: true,
    canDelete: true,
    canDuplicate: true,
    categories: ['My views', 'All views'],
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
    created: '01-12-2019 12:02',
    canUpdate: false,
    canDelete: false,
    canDuplicate: true,
    categories: ['All views'],
    user: {
      firstname: 'Kamil',
      lastname: 'Kowalski',
    },
    columns: COLUMNS,
  },
  {
    id: '0002',
    name: 'View #3',
    created: '01-12-2019 12:02',
    canUpdate: false,
    canDelete: false,
    canDuplicate: true,
    categories: ['All views'],
    user: {
      avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
      firstname: 'Kamil',
      lastname: 'Kowalski',
    },
    columns: COLUMNS,
  }
];

export const EMPTY_FILTER = {
  id: '0003',
  name: '',
  created: '01-12-2019 12:02',
  canUpdate: true,
  canDelete: true,
  canDuplicate: true,
  categories: ['All filters', 'My filters'],
  user: {
    avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
    firstname: 'Kamil',
    lastname: 'Kowalski',
  },
  columns: COLUMNS,
};
