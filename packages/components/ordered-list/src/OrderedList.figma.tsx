// @ts-nocheck
import figma from '@figma/code-connect';

import OrderedList from './Ordered-list';

const ORDERED_LIST_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=16271-502&m=dev';

const DEFAULT_ITEMS = [
  { id: '1', index: 0, label: 'List item' },
  { id: '2', index: 1, label: 'List item' },
  { id: '3', index: 2, label: 'List item' },
  { id: '4', index: 3, label: 'List item' },
  { id: '5', index: 4, label: 'List item' },
];

const MULTI_LEVEL_ITEMS = [
  { id: '1', index: 0, label: 'List item' },
  {
    id: '2',
    index: 1,
    label: 'Parent item',
    subMenu: [
      { id: '2-1', index: 0, label: 'Child item' },
      { id: '2-2', index: 1, label: 'Child item' },
      { id: '2-3', index: 2, label: 'Child item' },
    ],
  },
  { id: '3', index: 2, label: 'List item' },
];

figma.connect(OrderedList, ORDERED_LIST_URL, {
  variant: { State: 'Default' },
  example: () => (
    <OrderedList
      text="Label"
      data={DEFAULT_ITEMS}
      indexFormatter={(i) => `${i + 1}.`}
    />
  ),
});

figma.connect(OrderedList, ORDERED_LIST_URL, {
  variant: { State: 'Multi level' },
  example: () => (
    <OrderedList
      text="Label"
      data={MULTI_LEVEL_ITEMS}
      indexFormatter={(i) => `${i + 1}.`}
    />
  ),
});
