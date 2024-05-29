import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import CardSelect, { CardSelectGroup } from '@synerise/ds-card-select';
import type { CardSelectGroupProps } from '@synerise/ds-card-select';

import CardSelectMeta, { WithIcon } from './CardSelect.stories';

export default {
  component: CardSelectGroup,
  title: 'Components/CardSelect',
  tags: ['autodocs'],
  subcomponents: { CardSelect },
  parameters: {
    layout: 'centered',
  },
  render: args => {
    const [selected, setSelected] = useState<number | undefined>();
    const handleChange = (selectedIndex: number) => {
      args.onClick?.();
      setSelected(selectedIndex);
    };

    const cardProps = {
      ...CardSelectMeta.args,
      ...WithIcon.args,
    };

    return (
      <CardSelectGroup {...args}>
        <CardSelect {...cardProps} onChange={() => handleChange(0)} value={selected === 0} />
        <CardSelect {...cardProps} onChange={() => handleChange(1)} value={selected === 1} />
        <CardSelect {...cardProps} onChange={() => handleChange(2)} value={selected === 2} />
      </CardSelectGroup>
    );
  },
  args: {
    columns: 4,
  },
} as Meta<CardSelectGroupProps>;

type Story = StoryObj<CardSelectGroupProps>;

export const Group: Story = {};

