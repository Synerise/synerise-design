export const COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 254,
    fixed: 'left',
    key: 'name',
    sorter: (a, b) => {
      return a.name - b.name ? -1 : 1;
    }
  },
  {
    title: 'City',
    dataIndex: 'city',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    key: 'city',
    sorter: (a, b) => {
      return a.city - b.city ? -1 : 1;
    }
  },
  {
    title: 'System',
    dataIndex: 'system',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    key: 'system',
  },
  {
    title: 'Format',
    dataIndex: 'format',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    key: 'format',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    fixed: 'right',
    key: 'age',
    sorter: (a, b) => {
      return a.age - b.age ? -1 : 1;
    }
  },
];
