import { faker } from '@faker-js/faker';

export const DATA_SOURCE = [...new Array(10)].map((item, itemIndex) => {
  const children = [...new Array(Math.floor(Math.random() * 10))];
  return {
    key: `parent-row-${itemIndex}`,
    name: faker.person.fullName(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
    age: Math.floor(Math.random() * 100),
    sorter: false,
    children: children.length
      ? children.map((child, childIndex) => ({
          key: `child-row-${itemIndex}-${childIndex}`,
          name: faker.person.fullName(),
          unavailable: Math.random() < 0.1,
          disabled: Math.random() < 0.3,
          selectable: faker.datatype.boolean(),
          age: Math.floor(Math.random() * 100),
        }))
      : undefined,
  };
});

export const DATA_SOURCE_WITH_CONTAINER = [
  {
    key: '0',
    name: 'John Doe',
    disabled: true
  },
  {
    key: '1',
    name: 'John Doe',
    unavailable: true
  },
  {
    key: '2',
    name: 'John Doe',
    more: {
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
  },
  {
    key: '5',
    name: 'John Doe',
  },
  {
    key: '6',
    name: 'John Doe',
    disabled: true
  },
  {
    key: '7',
    name: 'John Doe',
    more: {
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
  },
  {
    key: '12',
    name: 'John Doe',
  },
  {
    key: '13',
    name: 'John Doe',
    disabled: true
  },
  {
    key: '14',
    name: 'John Doe',
  },
  {
    key: '15',
    name: 'John Doe',
  },
  {
    key: '16',
    name: 'John Doe',
  },
  {
    key: '17',
    name: 'John Doe',
  },
  {
    key: '18',
    name: 'John Doe',
  },
];
