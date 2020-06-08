export const dataSource = [
  {
    key: '2',
    name: 'John Doe',
    create: false,
    read: false,
    edit: true,
    delete: false,
    children: [
      {
        key: '3',
        name: 'John Doe',
        create: false,
        read: false,
        edit: true,
        delete: false,
      },
      {
        key: '4',
        name: 'John Doe',
        create: false,
        read: false,
        edit: false,
        delete: true,
        children: [
          {
            key: '20',
            name: 'John Doe',
            create: true,
            read: false,
            edit: false,
            delete: false,
          },
          {
            key: '21',
            name: 'John Doe',
            create: false,
            read: true,
            edit: false,
            delete: false,
          },
          {
            key: '22',
            name: 'John Doe',
            create: false,
            read: true,
            edit: false,
            delete: false,
          },
          {
            key: '23',
            name: 'John Doe',
            create: false,
            read: false,
            edit: true,
            delete: false,
          },
        ]
      }
    ]
  },
  {
    key: '7',
    name: 'John Doe',
    create: true,
    read: false,
    edit: false,
    delete: false,
    children: [
      {
        key: '8',
        name: 'John Doe',
        create: false,
        read: false,
        edit: false,
        delete: true,
      },
      {
        key: '9',
        name: 'John Doe',
        create: false,
        read: true,
        edit: false,
        delete: false,
      }
    ]
  }
];
