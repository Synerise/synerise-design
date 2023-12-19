import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import Icon, { AngleDownM, AngleDownS, CheckM, CheckS } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import type { ButtonProps } from '@synerise/ds-button';

type AllButtonProps = ButtonProps &  { 
  
  size?: 'small' | 'middle' | 'large';
  loading?: boolean | {delay?: number};
  block?: boolean;
} 

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<AllButtonProps> = {
  title: 'Components/Button/Button',
  render: ({children, ...args }) => (
    <Button {...args}>{children}</Button>
  ),
  component: Button,
  parameters: {
    controls: {
      exclude: ['href', 'target', 'htmlType'],
    }
  },
  
  argTypes: {
    icon: {
      control: 'select',
      options: ['AngleDownS', 'CheckS'],
      mapping: {
        AngleDownS: <Icon component={<AngleDownS />} />,
        CheckS: <Icon component={<CheckS />} />
      },
    },
    justifyContent: {
      control: false,
      description: 'CSS JustifyContentProperty '
    },
    groupVariant: {
      control: {
        type: 'inline-radio',
        labels: {
          '': 'undefined',
        },
      },
      options: ['', 'left-rounded', 'squared', 'right-rounded']
    },
    className: {
      control: false
    },
    size: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      },
      control: { 
        type: 'inline-radio',
        labels: {
          '': 'default',
        },
      },
      options: ['', 'large']
    },
    
    block: {
      description: 'Display as a block element',
      
      control: 'boolean',
      type: 'boolean'
    },

    onClick: {
      control: false,
      category: 'Category 1',
      subcategory: 'Sub 1'
    },

    type: {
      // description: 'overwritten description',
      // table: {
          // category: 'AAA',
          // subcategory: 'BBB',
      //   type: { summary: 'something short', detail: 'something really really long' },
      // },
      control: 'select',
      category: 'Category 1',
      options: ['primary', 'secondary', 'tertiary', 'tertiary-white', 'ghost-primary', 'ghost', 'ghost-white', 'custom-color', 'custom-color-ghost']
    },
    mode: {
      control: 'select',
      options: ['single-icon', 'split', 'two-icons', 'label-icon', 'icon-label'],
      
    },
    color: { 
      control: 'select',
      table: { category: 'Custom color button props'},
      options: ['blue', 'grey', 'red', 'green', 'yellow', 'pink', 'mars', 'orange', 'fern', 'cyan', 'purple', 'violet'],
    },
    children: {
      name: 'children',
      description: 'Button label',
      control: 'text',
      table: {
        type: {
          summary: 'ReactNode',

        }
      }
    }
  },
};

export default meta;


type Story = StoryObj<AllButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Label',
    type: 'primary',
  },
};

export const SingleIcon: Story = {
  args: {
    mode: 'single-icon',
    type: 'primary',
    icon: <Icon component={<AngleDownS />} />
  },
}



export const SecondaryClicked: Story = {
  args: {
    type: 'secondary',
    children: 'Label',
  },
  play: async ({canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
  }
};