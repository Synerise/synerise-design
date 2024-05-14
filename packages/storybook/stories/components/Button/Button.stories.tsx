import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Icon, { AngleDownS, CheckS } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import type { ButtonProps } from '@synerise/ds-button';

import { buttonDecorator, BOOLEAN_CONTROL, CLASSNAME_ARG_CONTROL, PREFIXCLS_ARG_CONTROL, reactNodeAsSelect, controlFromOptionsArray } from '../../utils';

type Story = StoryObj<ButtonProps>;

const meta: Meta<ButtonProps> = {
  title: 'Components/Button/Button',
  render: ({children, ...args }) => (
    <Button {...args}>{children}</Button>
  ),
  tags: ['autodocs'],
  component: Button,
  decorators: [buttonDecorator],
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: ['href', 'target', 'htmlType', 'groupVariant', 'justifyContent', 'shape'],
    }
  },
  argTypes: {
    activated: BOOLEAN_CONTROL,
    error: BOOLEAN_CONTROL,
    ghost: BOOLEAN_CONTROL,
    danger: BOOLEAN_CONTROL,
    readOnly: BOOLEAN_CONTROL,
    loading: BOOLEAN_CONTROL,
    icon: {
      ...reactNodeAsSelect(
        ['AngleDownS', 'CheckS'], 
        {
          AngleDownS: <Icon component={<AngleDownS />} />,
          CheckS: <Icon component={<CheckS />} />
        }
      ),
    },
    className: CLASSNAME_ARG_CONTROL,
    prefixCls: PREFIXCLS_ARG_CONTROL,
    size: {
      table: {
        defaultValue: {
          summary: 'undefined'
        }
      },
      ...controlFromOptionsArray('inline-radio', ['', 'large'])
    },

    block: {
      description: 'Display as a block element',
      ...BOOLEAN_CONTROL
    },

    type: {
      ...controlFromOptionsArray('select', ['primary', 'secondary', 'tertiary', 'tertiary-white', 'ghost-primary', 'ghost', 'ghost-white', 'custom-color', 'custom-color-ghost'])
    },
    mode: {
      table: {
        disable: true
      },
    },
    color: {
      ...controlFromOptionsArray('select', ['blue', 'grey', 'red', 'green', 'yellow', 'pink', 'mars', 'orange', 'fern', 'cyan', 'purple', 'violet']),
      table: { category: 'Custom color button props'},
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

export const Simple: Story = {
  parameters: {
    controls: {
      exclude: [ ...meta?.parameters?.controls.exclude, 'icon', 'iconColor'],
    }
  },
  args: {
    children: 'Label',
    type: 'primary',
  },
};

export const IconSolo: Story = {
  ...Simple,
  args: {
    type: 'primary',
    mode: 'single-icon',
    icon: <Icon component={<AngleDownS />} />
  },
}


export const IconLeft: Story = {
  ...IconSolo,
  args: {
    ...IconSolo.args,
    children: 'Label',
    mode: 'icon-label',
  },
}


export const IconRight: Story = {
  ...IconLeft,
  render: ({icon, children, ...args}) => (
    <Button {...args}>
      {children}
      {icon}
    </Button>
  ),
  args: {
    ...IconLeft.args,
    mode: 'label-icon',
  },
}



export const TwoIcons: Story = {
  ...IconLeft,
  render: ({icon, children, ...args}) => (
    <Button {...args}>
      {icon}
      {children}
      {icon}
    </Button>
  ),
  args: {
    ...IconLeft.args,
    mode: 'two-icons',
  },
}


export const CustomLabel: Story = {
  parameters: {
    controls: {
      exclude: [ ...meta?.parameters?.controls.exclude, 'icon', 'iconColor'],
    }
  },
  argTypes: {
    children: {
      control: false
    }
  },
  args: {
    children: (
      <span style={{ fontWeight: 400 }}>
        <span style={{ display: 'inline' }}>Show</span>{' '}
        <strong style={{ display: 'inline', fontWeight: 500 }}>10</strong>{' '}
        <span style={{ display: 'inline' }}>more</span>
      </span>
    ),
    type: 'primary',
  },
};
