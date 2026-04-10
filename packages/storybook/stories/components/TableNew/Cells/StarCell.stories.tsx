import React, { useState } from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import { type BaseStarCellProps, StarCell } from '@synerise/ds-table-new';

import {
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  REACT_NODE_NO_CONTROL,
  fixedWrapper300,
} from '../../../utils';

const meta: Meta<BaseStarCellProps> = {
  title: 'Components/TableNew/Cells/StarCell',
  component: StarCell,
  tags: ['autodocs', 'new'],
  parameters: { layout: 'centered' },
  decorators: [fixedWrapper300],
  argTypes: {
    children: REACT_NODE_NO_CONTROL,
    active: BOOLEAN_CONTROL,
    onClick: { control: false },
    starTooltip: REACT_NODE_AS_STRING,
  },
};

export default meta;

type Story = StoryObj<BaseStarCellProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<StarCell
  active={active}
  onClick={() => setActive(!active)}
  starTooltip="Add to favorites"
>
  Charlotte Stiedemann
</StarCell>`,
      },
    },
  },
  render: () => {
    const [active, setActive] = useState(false);
    return (
      <StarCell
        active={active}
        onClick={() => setActive(!active)}
        starTooltip={active ? 'Remove from favorites' : 'Add to favorites'}
      >
        Charlotte Stiedemann
      </StarCell>
    );
  },
};

export const Active: Story = {
  parameters: {
    docs: {
      source: {
        code: `<StarCell
  active
  onClick={fn()}
  starTooltip="Remove from favorites"
>
  Favorited item
</StarCell>`,
      },
    },
  },
  render: (args) => <StarCell {...args}>Favorited item</StarCell>,
  args: {
    active: true,
    onClick: fn(),
    starTooltip: 'Remove from favorites',
  },
};
