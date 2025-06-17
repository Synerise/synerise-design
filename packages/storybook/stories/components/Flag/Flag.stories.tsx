import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import DSFlag, { countryCodes } from '@synerise/ds-flag';
import { FlagWrapper, FlagItem } from './Flag.stories.styles';

export default {
  title: 'Components/Flag',
  tags: ['autodocs'],
  component: DSFlag,
  argTypes: {
    country: {
      control: 'select',
      options: countryCodes,
      table: {
        type: {
          summary: 'CountryCode'
        }
      }
    },
    size: {
      control: 'number',
      table: {
        type: {
          summary: 'number'
        } 
      },
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