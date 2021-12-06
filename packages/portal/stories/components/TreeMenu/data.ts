import type { TreeData } from './../../../../components/treemenu/src/Tree/Tree.types';
import { v4 as uuid } from 'uuid';

export function generateItems(amount: number, start = 1) {
  const items: TreeData[] = [];
  for (let i = start; i < amount + start; i += 1) {
    const id = uuid();
    items.push({
      id,
      key: id,
      name: `Option ${i}`,
      type: 'folder',
      hidden: false,
    } as TreeData);
  }
  return items;
}

const id1 = uuid();
const id2 = uuid();
const id3 = uuid();

export const buildDataSource = (numberOfElements = 5, offset = 1): TreeData[] => [
  {
    id: id1,
    key: id1,
    name: 'With children',
    type: 'folder',
    hidden: false,
    children: [...generateItems(numberOfElements, 100)],
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
        children: [...generateItems(numberOfElements, 2001)],
      },
      ...generateItems(numberOfElements, 200),
    ],
  },
  ...generateItems(numberOfElements, offset),
];

export const dataSource = buildDataSource(5, 10);
