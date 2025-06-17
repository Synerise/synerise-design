import React, { ReactNode } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import Cascader from '@synerise/ds-cascader';
import type { CascaderProps } from '@synerise/ds-cascader';

import { limitCategories } from './data/utils';
import { fixedWrapper300 } from '../../utils';
import * as mock from './data/mock.json';

const root = mock.default;

type CascaderStoryProps = CascaderProps & { children: ReactNode; categoryLimit: number };

export default {
  title: 'Components/Cascader',
  component: Cascader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedWrapper300],
  render: args => {
    const rootCategory = limitCategories(root, args.categoryLimit);
    return <Cascader {...args} rootCategory={rootCategory} />;
  },
  argTypes: {
    onCategorySelect: {
      action: 'onCategorySelect',
    },
  },
  args: {
    categoryLimit: 5,
    searchInputPlaceholder: 'Search',
    categorySuffix: 'select',
    selectedCategoriesIds: [],
    maxHeight: 700,
  },
} as Meta<CascaderStoryProps>;

type Story = StoryObj<CascaderStoryProps>;

export const Default: Story = {};

export const Populated: Story = {
  args: {
    selectedCategoriesIds: [3, 5, 332, 333, 312, 313],
  },
};
