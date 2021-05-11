import { v4 as uuid } from 'uuid';

export function generateItems(amount: number, start = 1) {
  const items = [];
  for (let i = start; i <= amount + start; i += 1) {
    const id = uuid();
    items.push({
      id,
      key: id,
      name: `Option ${i}`,
      type: 'folder',
      hidden: false,
    });
  }
  return items;
}

const id1 = uuid();
const id2 = uuid();
const id3 = uuid();

export const dataSource = [
  {
    id: id1,
    key: id1,
    name: 'With children',
    type: 'folder',
    hidden: false,
    children: [...generateItems(5, 100)],
  },
  {
    id: id2,
    key: id2,
    name: 'With grandchildren',
    type: 'folder',
    hidden: false,
    children: [
      {
        id: id3,
        key: id3,
        name: 'Subchildren',
        type: 'folder',
        children: [...generateItems(5, 2001)],
      },
      ...generateItems(5, 200),
    ],
  },
  ...generateItems(1, 10),
];
