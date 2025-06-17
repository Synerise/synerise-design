import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Icon, { Add2S, AngleDownS, CheckS } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import type { ButtonProps } from '@synerise/ds-button';

import {
  buttonDecorator,
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  PREFIXCLS_ARG_CONTROL,
  reactNodeAsSelect,
  controlFromOptionsArray,
} from '../../utils';

import { BUTTON_CUSTOM_COLORS, BUTTON_TYPES, Matrix, MatrixCell, MatrixColumn } from './Button.constants';
import { theme } from '@synerise/ds-core';
import { getModeLeft, getModeRight, getModeSplit } from './Button.data';

type Story = StoryObj<ButtonProps>;

const meta: Meta<ButtonProps> = {
  title: 'Components/Button/Button',
  render: ({ children, ...args }) => <Button {...args}>{children}</Button>,
  tags: ['autodocs'],
  component: Button,
  decorators: [buttonDecorator],
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: ['href', 'target', 'htmlType', 'groupVariant', 'justifyContent', 'shape'],
    },
  },
  argTypes: {
    activated: BOOLEAN_CONTROL,
    error: BOOLEAN_CONTROL,
    ghost: BOOLEAN_CONTROL,
    danger: BOOLEAN_CONTROL,
    readOnly: BOOLEAN_CONTROL,
    loading: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    icon: {
      ...reactNodeAsSelect(['AngleDownS', 'CheckS'], {
        AngleDownS: <Icon component={<AngleDownS />} />,
        CheckS: <Icon component={<CheckS />} />,
      }),
    },
    tagProps: {
      ...reactNodeAsSelect(['none', 'tag 1', 'tag 2'], {
        none: undefined,
        'tag 1': {
          name: 'ON',
          color: theme.palette['green-600'],
        },
        'tag 2': {
          name: '5/12 HRS',
          color: theme.palette['grey-400'],
        },
        'tag 3': {
          name: '5/12 HRS',
          color: theme.palette['grey-400'],
        },
      }),
    },
    className: CLASSNAME_ARG_CONTROL,
    prefixCls: PREFIXCLS_ARG_CONTROL,
    size: {
      table: {
        defaultValue: {
          summary: 'undefined',
        },
      },
      ...controlFromOptionsArray('inline-radio', ['', 'large']),
    },

    block: {
      description: 'Display as a block element',
      ...BOOLEAN_CONTROL,
    },

    type: {
      ...controlFromOptionsArray('select', BUTTON_TYPES),
    },
    mode: {
      ...controlFromOptionsArray('select', ['single-icon', 'split', 'two-icons', 'label-icon', 'icon-label']),
    },
    color: {
      ...controlFromOptionsArray('select', BUTTON_CUSTOM_COLORS),
      table: { category: 'Custom color button props' },
    },
    children: {
      name: 'children',
      description: 'Button label',
      control: false,
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
};

export default meta;

export const Simple: Story = {
  parameters: {
    controls: {
      exclude: [...meta?.parameters?.controls.exclude, 'icon', 'iconColor'],
    },
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
    children: <Icon component={<AngleDownS />} />,
  },
};

export const IconLeft: Story = {
  ...IconSolo,
  args: {
    children: (
      <>
        <Icon component={<AngleDownS />} />
        Label
      </>
    ),
    mode: 'icon-label',
  },
};

export const IconRight: Story = {
  ...IconLeft,
  render: ({ icon, children, ...args }) => (
    <Button {...args}>
      {children}
      {icon}
    </Button>
  ),
  args: {
    children: 'Label',
    icon: <Icon component={<AngleDownS />} />,
    mode: 'label-icon',
  },
};

export const TwoIcons: Story = {
  ...IconLeft,
  render: ({ icon, children, ...args }) => (
    <Button {...args}>
      {icon}
      {children}
      {icon}
    </Button>
  ),
  args: {
    icon: <Icon component={<AngleDownS />} />,
    children: 'Label',
    mode: 'two-icons',
  },
};
export const ButtonModes: Story = {
  ...IconLeft,
  render: ({ icon, children, mode, ...args }) => (
    <Button mode={mode} {...args}>
      {getModeLeft(mode,icon)}
      {getModeSplit(mode,children)}
      {getModeRight(mode,icon)}
    </Button>
  ),
  args: {
    icon: <Icon component={<AngleDownS />} />,
    children: 'Label',
    mode: 'two-icons',
  },
};

export const SplitRight: Story = {
  args: {
    children: (
      <>
        Label <Icon component={<AngleDownS />} />{' '}
      </>
    ),
    mode: 'split',
  },
};

export const CustomLabel: Story = {
  parameters: {
    controls: {
      exclude: [...meta?.parameters?.controls.exclude, 'icon', 'iconColor'],
    },
  },
  argTypes: {
    children: {
      control: false,
    },
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

export const DisabledTooltip: Story = {
  args: {
    children: 'Label',
    disabled: true,
    tooltipProps: {
      title: "This element is disabled"
    },
    type: 'primary',
  },
};

const MODES = [{
  mode: 'icon-label',
  title: 'icon-label',
  children: <><Icon component={<AngleDownS />} /> Label</>
},
{
  mode: '',
  title: 'default',
  children: <> Label</>
},
{
  mode: 'label-icon',
  title: 'label-icon',
  children: <>Label <Icon component={<AngleDownS />} /> </>
},
{
  mode: 'single-icon',
  title: 'single-icon',
  children: <Icon component={<AngleDownS />} />
},
{
  mode: 'split',
  title: 'split',
  children: <>Label <Icon component={<AngleDownS />} /> </>
},
{
  mode: 'two-icons',
  title: 'two-icons',
  children: <><Icon component={<Add2S />} /> Label <Icon component={<AngleDownS />} /> </>
},
{
  mode: 'icon-label',
  title: 'disabled',
  children: <><Icon component={<AngleDownS />} /> Label</>,
  disabled: true,
},
{
  mode: 'icon-label',
  title: 'readOnly',
  children: <><Icon component={<AngleDownS />} /> Label</>,
  readOnly: true,
}
];


export const ButtonMatrix: Story = {
  render: args => {
    return <Matrix>
      <MatrixColumn> <MatrixCell />{BUTTON_TYPES.map(type => <MatrixCell type={type}>{type}</MatrixCell>)}</MatrixColumn>
      {MODES.map(({ mode, title, children, ...rest }) => {
        return (
          <MatrixColumn>
            <MatrixCell>{title}</MatrixCell>
            {BUTTON_TYPES.map(type => <MatrixCell type={type}><Button mode={mode} type={type} {...rest}>{children}</Button></MatrixCell>)}
          </MatrixColumn>
        )
      })}</Matrix>
  },

};

export const ButtonMatrixHover: Story = {
  parameters: {
    pseudo: { hover: true },
  },
  ...ButtonMatrix
};
export const ButtonMatrixFocus: Story = {
  parameters: {
    pseudo: { focus: true },
  },
  ...ButtonMatrix
};
