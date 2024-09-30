import { OrderedListItem, OrderedListProps } from '@synerise/ds-ordered-list';

export const LIST_ITEMS: OrderedListItem[] = [
  {
    id: '0',
    index: 0,
    label: 'Ordered List level 1',
  },
  {
    id: '1',
    index: 1,
    label: 'Ordered List level 1',
  },
  {
    id: '2',
    index: 2,
    label: 'Ordered List level 1',
  },
  {
    id: '3',
    index: 3,
    label: 'Ordered List level 1',
    subMenu: [
      {
        id: '4',
        index: 4,
        label: 'Ordered List level 2',
      },
      {
        id: '5',
        index: 5,
        label: 'Ordered List level 2',
        subMenu: [
          {
            id: '6',
            index: 6,
            label: 'Ordered List level 3',
          },
          {
            id: '7',
            index: 7,
            label: 'Ordered List level 3',
          },
        ],
      },
    ],
  },
  {
    id: '8',
    index: 8,
    label: 'Ordered List level 1',
  },
  {
    id: '9',
    index: 9,
    label: 'Ordered List level 1',
  },
  {
    id: '10',
    index: 10,
    label: 'Ordered List level 1',
  },
  {
    id: '11',
    index: 11,
    label: 'Ordered List level 1',
  },
  {
    id: '12',
    index: 12,
    label: 'Ordered List level 1',
  },
];

export const LIST_ITEMS_SINGLE_LEVEL: OrderedListItem[] = LIST_ITEMS.map((item, index) => ({
  ...item,
  id: `${index}`,
  index,
  subMenu: undefined,
}));

const romanFormatter = num => {
  const lookup = {
    m: 1000,
    cm: 900,
    d: 500,
    cd: 400,
    c: 100,
    xc: 90,
    l: 50,
    xl: 40,
    x: 10,
    ix: 9,
    v: 5,
    iv: 4,
    i: 1,
  };
  let roman = '';
  let tempNumber = num + 1;
  for (let i in lookup) {
    while (tempNumber >= lookup[i]) {
      roman += i;
      tempNumber -= lookup[i];
    }
  }
  return `${roman}. `;
};
const emptyFormatter = () => ``;
const numberFormatter = (index: number) => `${index + 1}. `;
const withZerosFormatter = (index: number) => `0${index + 1}. `;
const withLettersFormatter = (index: number) => `${String.fromCharCode(index + 97).toLowerCase()}. `;

export const FORMATTERS = {
  empty: emptyFormatter,
  decimal: numberFormatter,
  'decimal with leading zeros': withZerosFormatter,
  'lowercase roman numerals': romanFormatter,
  'lowercase ascii letters': withLettersFormatter,
};
