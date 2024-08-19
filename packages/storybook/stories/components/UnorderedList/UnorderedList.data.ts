import { UnorderedListItem } from '@synerise/ds-unordered-list';

export const LIST_DATA: UnorderedListItem[] = [
  {
    id: '0',
    index: 0,
    label: 'Unordered List level 1',
  },
  {
    id: '1',
    index: 1,
    label: 'Unordered List level 1',
  },
  {
    id: '2',
    index: 2,
    label: 'Unordered List level 1',
  },
  {
    id: '3',
    index: 3,
    label: 'Unordered List level 1',
    subMenu: [
      {
        id: '4',
        index: 4,
        label: 'Unordered List level 2',
      },
      {
        id: '5',
        index: 5,
        label: 'Unordered List level 2',
        subMenu: [
          {
            id: '6',
            index: 6,
            label: 'Unordered List level 3',
          },
          {
            id: '7',
            index: 7,
            label: 'Unordered List level 3',
          },
        ],
      },
    ],
  },
  {
    id: '8',
    index: 8,
    label: 'Unordered List level 1',
  },
  {
    id: '9',
    index: 9,
    label: 'Unordered List level 1',
  },
  {
    id: '10',
    index: 10,
    label: 'Unordered List level 1',
  },
  {
    id: '11',
    index: 11,
    label: 'Unordered List level 1',
  },
  {
    id: '12',
    index: 12,
    label: 'Unordered List level 1',
  },
];

export const FORMATTERS = {
  dashed: () => ` - `,
  empty: () => ``,
  square: () => ` ▪ `,
  disc: () => ` ● `,
};
