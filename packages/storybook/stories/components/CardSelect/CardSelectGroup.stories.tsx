import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import CardSelect, { CardSelectGroup } from '@synerise/ds-card-select';
import type { CardSelectGroupProps } from '@synerise/ds-card-select';

import CardSelectMeta, { WithIcon } from './CardSelect.stories';
import { generateItems } from './CardSelect.data';
import { CLASSNAME_ARG_CONTROL, controlFromOptionsArray } from '../../utils';

const cardProps = {
  ...CardSelectMeta.args,
  ...WithIcon.args,
};

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
      setSelected(selectedIndex);
    };

    const itemsWithOnChange = args.items?.map((itemArgs, index: number) => ({
      ...itemArgs,
      value: selected === index,
      onChange: () => handleChange(index),
    }));

    return <CardSelectGroup {...args} items={itemsWithOnChange} />;
  },
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    size: controlFromOptionsArray('inline-radio', ['small', 'medium']),
    width: {
      description: 'Deprecated. Use size prop instead',
      ...controlFromOptionsArray('inline-radio', ['small', 'large']),
    },
  },
  args: {
    items: generateItems(
      6,
      {
        ...cardProps,
        stretchToFit: true,
      },
      true
    ),
  },
} as Meta<CardSelectGroupProps>;

type Story = StoryObj<CardSelectGroupProps>;

export const Group: Story = {};

export const SingleColumnGroup: Story = {
  args: {
    columns: null,
  },
};

export const SmallSizeGroup: Story = {
  args: {
    columns: 3,
    size: 'small',
  },
};
