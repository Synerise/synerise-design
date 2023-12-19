import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import Button from '@synerise/ds-button';
import type {  CreatorProps, ExpanderProps } from '@synerise/ds-button';


type CreatorPropsWithLabel = CreatorProps & { label?: string };

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<CreatorProps> = {
  title: 'Components/Button/Button',
  
  component: Button.Creator,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'error', 'upload']
    },
    label: {
      control: 'text'
    }
  },
};

export default meta;


type Story = StoryObj<CreatorPropsWithLabel>;

export const Creator: Story = {
  args: {
    
    label: 'Button'
  },
};

