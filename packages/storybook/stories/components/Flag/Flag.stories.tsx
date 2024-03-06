import * as React from 'react';
import DSFlag, { countryCodes } from '@synerise/ds-flag';
import { Meta, StoryObj } from '@storybook/react';
import { FlagWrapper, FlagItem } from './FlagStyles';

export default {
  title: 'Components/Flag',
  component: DSFlag,
  argTypes: {
    country: {
      control: 'select',
      options: countryCodes,
    },
    size: {
      control: 'number',
      defaultValue: 20,
    },
  },
} as Meta<typeof DSFlag>;

const StoryTemplate: StoryObj<typeof DSFlag> = {
  render: (args) => <DSFlag {...args} />,
};

export const Default = {
  ...StoryTemplate,
  args: {
    country: countryCodes[0],
    size: 20,
  },
};

export const AllFlags = {
  ...StoryTemplate,
  render: (args: { size: number; }) => (
    <FlagWrapper>
      {countryCodes.map(code => (
        <FlagItem key={code}>
          <DSFlag country={code} size={args.size} />
          <span>{code}</span>
        </FlagItem>
      ))}
    </FlagWrapper>
  ),
  args: {
    size: 20,
  },
};