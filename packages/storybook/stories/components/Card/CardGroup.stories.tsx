import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import { CardGroup } from '@synerise/ds-card';
import type { CardGroupProps } from '@synerise/ds-card';

import { CardWithState } from './card.data';
import CardMeta from './Card.stories';

type Story = StoryObj<CardGroupProps>;

export default {
  component: CardGroup,
  title: 'Components/Card',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  render: args => {
    return (
      <CardGroup {...args}>
        <CardWithState {...CardMeta.args} />
        <CardWithState {...CardMeta.args} />
        <CardWithState {...CardMeta.args} />
        <CardWithState {...CardMeta.args} />
      </CardGroup>
    );
  },
  args: {
    columns: 2,
  },
  argTypes: {},
} as Meta<CardGroupProps>;

export const Group: Story = {
    name: 'Card Group'
};
