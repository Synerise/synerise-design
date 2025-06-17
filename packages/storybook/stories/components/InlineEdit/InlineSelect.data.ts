import { fn } from 'storybook/test';
import type { ListItemProps } from '@synerise/ds-list-item';

export const DATA_SOURCE: ListItemProps[] = [
  {
    text: 'Option one',
    onClick: fn(),
  },
  {
    text: 'Option two',
    onClick: fn(),
  },
  {
    text: 'Option three',
    onClick: fn(),
  },
];
