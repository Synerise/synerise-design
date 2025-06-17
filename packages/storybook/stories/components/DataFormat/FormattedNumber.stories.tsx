import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FormattedNumber } from '@synerise/ds-data-format';
import { fixedWrapper200 } from '../../utils';

export default {
  component: FormattedNumber,
  title: 'Components/DataFormat/FormattedNumber',
  tags: ['autodocs'],
  render: args => {
    return <FormattedNumber {...args} />;
  },
  decorators: [fixedWrapper200],
  argTypes: {},
  args: {
    value: 91919292929.382383,
  },
} as Meta<typeof FormattedNumber>;

export const Default: StoryObj<typeof FormattedNumber> = {};

export const CompactShort: StoryObj<typeof FormattedNumber> = {
  args: {
    options: {
      compactDisplay: 'short',
      targetFormat: 'compact-larger-number',
    },
  },
};
export const CompactLong: StoryObj<typeof FormattedNumber> = {
  args: {
    options: {
      targetFormat: 'compact-larger-number',
      compactDisplay: 'long',
      maximumFractionDigits: 4,
      minimumFractionDigits: 2,
    },
  },
};

export const MinMaxFractionDigits: StoryObj<typeof FormattedNumber> = {
  args: {
    value: 91919292.929382383,
    options: {
      maximumFractionDigits: 4,
      minimumFractionDigits: 0,
    },
  },
};

export const MinFractionDigits: StoryObj<typeof FormattedNumber> = {
  args: {
    value: 91919292,
    options: {
      targetFormat: 'compact-larger-number',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
      minimumFractionDigits: 0,
    },
  },
};

export const MinMaxSignificantDigits: StoryObj<typeof FormattedNumber> = {
  args: {
    options: {
      minimumSignificantDigits: 4,
      maximumSignificantDigits: 8,
    },
  },
};

export const MinIntegerDigits: StoryObj<typeof FormattedNumber> = {
  args: {
    value: 3,
    options: {
      minimumIntegerDigits: 4,
    },
  },
};
