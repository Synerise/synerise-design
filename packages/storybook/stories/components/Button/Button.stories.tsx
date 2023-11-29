import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import Button, { ButtonProps } from '@synerise/ds-button';

type ButtonWithLabel = React.ComponentProps<typeof Button> & { label?: string };

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<ButtonWithLabel> = {
  title: 'Components/Button/Button',
  render: ({label, ...args }) => (
    <Button {...args}>{label}</Button>
  ),
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'tertiary-white', 'ghost-primary', 'ghost', 'ghost-white', 'custom-color', 'custom-color-ghost']
    },
    mode: {
      control: 'select',
      options: ['single-icon', 'split', 'two-icons', 'label-icon', 'icon-label']
    },
    color: { 
      control: 'color',
      if: {
        arg: 'type',
        eq: 'custom-color'
      }
    }
  },
};

export default meta;


type Story = StoryObj<ButtonWithLabel>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Single: Story = {
  // render() => (<Button label="test" ></Button>)
  args: {
    type: 'primary',
    disabled: false,
    label: 'Button',
  },
};

export const Creator: Story = {
  render: ({label, ...args}) => ( <Button.Creator {...args}>{label}</Button.Creator>),
  args: {
    ...Single.args,
  },
};

export const SecondaryClicked: Story = {
  args: {
    type: 'secondary',
    label: 'Button',
  },
  play: async ({canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
  }
};