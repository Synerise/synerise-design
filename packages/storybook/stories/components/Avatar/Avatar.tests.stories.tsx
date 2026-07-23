import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { UserAvatar } from '@synerise/ds-avatar';

export default {
  title: 'Components/Avatar/Tests',
  component: UserAvatar,
  tags: ['visualtests'],
} as Meta;

type Story = StoryObj;

// First initial A–L maps 1:1 onto the 12 sorted custom-color families
// (blue, cyan, fern, green, grey, mars, orange, pink, purple, red, violet, yellow),
// so each avatar auto-derives a distinct --ds-color-background-custom-<family>-500 token.
const CELLS: { name: string; family: string }[] = [
  { name: 'Anna', family: 'blue' },
  { name: 'Bruno', family: 'cyan' },
  { name: 'Carla', family: 'fern' },
  { name: 'Diana', family: 'green' },
  { name: 'Ethan', family: 'grey' },
  { name: 'Fiona', family: 'mars' },
  { name: 'Greg', family: 'orange' },
  { name: 'Hana', family: 'pink' },
  { name: 'Igor', family: 'purple' },
  { name: 'Julia', family: 'red' },
  { name: 'Kevin', family: 'violet' },
  { name: 'Lena', family: 'yellow' },
];

export const AllColors: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
        gap: 32,
        padding: 32,
        justifyItems: 'center',
      }}
    >
      {CELLS.map((cell) => (
        <div
          key={cell.family}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <UserAvatar
            user={{ firstName: cell.name }}
            size="large"
            tooltip={false}
          />
          <span style={{ fontSize: 12, color: 'var(--ds-color-text-base-subtle)' }}>
            {cell.family}
          </span>
        </div>
      ))}
    </div>
  ),
};
