import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@synerise/ds-button';
import ButtonGroup, { ButtonDivider } from '@synerise/ds-button-group';
import { theme } from '@synerise/ds-core';
import Icon, { AngleDownS, DragHandleM } from '@synerise/ds-icon';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  PREFIXCLS_ARG_CONTROL,
  STRING_CONTROL,
  STYLE_ARG_CONTROL,
  controlFromOptionsArray,
  fixedWrapper588,
} from '../../utils';
import { BUTTON_TYPES, ButtonTypeWrapper } from './Button.constants';
import { IconLeft, IconSolo, Simple } from './Button.stories';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Button/ButtonGroup',
  component: ButtonGroup,
  decorators: [fixedWrapper588],
  parameters: {
    tags: ['autodocs'],
    controls: {
      exclude: ['disabled', 'error'],
    },
  },
  argTypes: {
    splitMode: BOOLEAN_CONTROL,
    fullWidth: BOOLEAN_CONTROL,
    description: STRING_CONTROL,
    title: STRING_CONTROL,
    style: STYLE_ARG_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    prefixCls: PREFIXCLS_ARG_CONTROL,
    compact: BOOLEAN_CONTROL,
    buttonsPosition: {
      ...controlFromOptionsArray('inline-radio', [
        undefined,
        'left',
        'center',
        'right',
      ]),
    },
  },
};

export default meta;

export const SplitButton: StoryObj<typeof ButtonGroup> = {
  parameters: {
    docs: {
      source: {
        code: `<ButtonGroup splitMode buttonsPosition="center">
  <Button type="primary">Label</Button>
  <Button type="primary" mode="single-icon">
    <Icon component={<AngleDownS />} />
  </Button>
</ButtonGroup>`,
      },
    },
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button {...Simple.args} />
      <Button {...IconSolo.args} />
    </ButtonGroup>
  ),
  args: {
    splitMode: true,
    title: '',
    description: '',
    fullWidth: false,
    buttonsPosition: 'center',
    disabled: false,
    error: false,
  },
};

export const DisabledButtonsWithTooltip: StoryObj<typeof ButtonGroup> = {
  parameters: {
    docs: {
      source: {
        code: `<ButtonGroup splitMode buttonsPosition="center">
  <Button type="primary" disabled tooltipProps={{ title: 'Tooltip 1 title' }}>
    Label
  </Button>
  <Button type="primary" mode="single-icon" disabled tooltipProps={{ title: 'Tooltip 2 title' }}>
    <Icon component={<AngleDownS />} />
  </Button>
</ButtonGroup>`,
      },
    },
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button
        {...Simple.args}
        disabled
        tooltipProps={{ title: 'Tooltip 1 title' }}
      />
      <Button
        {...IconSolo.args}
        disabled
        tooltipProps={{ title: 'Tooltip 2 title' }}
      />
    </ButtonGroup>
  ),
  args: {
    splitMode: true,
    title: '',
    description: '',
    fullWidth: false,
    buttonsPosition: 'center',
    disabled: false,
    error: false,
  },
};

export const GroupButtons: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <>
      {BUTTON_TYPES.map((type) => (
        <ButtonTypeWrapper type={type}>
          <ButtonGroup {...args} title={`Type: ${type}`}>
            <Button mode="single-icon" {...Simple.args} type={type}>
              <Icon component={<DragHandleM />} />
            </Button>
            <Button mode="icon-label" {...Simple.args} type={type}>
              <Icon component={<DragHandleM />} />
              Button
            </Button>
            <Button mode="two-icons" {...Simple.args} type={type}>
              <Icon component={<DragHandleM />} />
              Button
              <Icon component={<AngleDownS />} />
            </Button>
            <Button mode="label-icon" {...Simple.args} type={type}>
              Button
              <Icon component={<DragHandleM />} />
            </Button>
            <Button {...Simple.args} type={type} loading>
              Button
              <Icon component={<DragHandleM />} />
            </Button>
            <Button {...Simple.args} type={type} disabled>
              Button
            </Button>
          </ButtonGroup>
        </ButtonTypeWrapper>
      ))}
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `<ButtonGroup splitMode title="Title" description="Description" buttonsPosition="center">
  <Button mode="single-icon" type="primary">
    <Icon component={<DragHandleM />} />
  </Button>
  <Button mode="icon-label" type="primary">
    <Icon component={<DragHandleM />} />
    Button
  </Button>
  <Button mode="two-icons" type="primary">
    <Icon component={<DragHandleM />} />
    Button
    <Icon component={<AngleDownS />} />
  </Button>
  <Button mode="label-icon" type="primary">
    Button
    <Icon component={<DragHandleM />} />
  </Button>
</ButtonGroup>`,
      },
    },
    backgrounds: { default: 'dark' },
  },
  args: {
    splitMode: true,
    title: 'Title',
    description: 'Description',
    fullWidth: false,
    buttonsPosition: 'center',
    disabled: false,
    error: false,
  },
};

export const OptionButtons: StoryObj<typeof ButtonGroup> = {
  parameters: {
    docs: {
      source: {
        code: `<ButtonGroup size="small" buttonsPosition="center">
  <Button type="primary" onClick={() => {}}>Button</Button>
  <Button type="secondary" onClick={() => {}}>Button</Button>
</ButtonGroup>`,
      },
    },
  },
  render: (args) => {
    const [selectedKey, setSelectedKey] = useState('');
    return (
      <ButtonGroup {...args}>
        <Button
          {...Simple.args}
          type={selectedKey === '1' ? 'primary' : 'secondary'}
          onClick={() => setSelectedKey('1')}
        >
          Button
        </Button>
        <Button
          {...Simple.args}
          type={selectedKey === '2' ? 'primary' : 'secondary'}
          onClick={() => setSelectedKey('2')}
        >
          Button
        </Button>
      </ButtonGroup>
    );
  },
  args: {
    size: 'small',
    fullWidth: false,
    buttonsPosition: 'center',
  },
};

export const ButtonsWithDivider: StoryObj<typeof ButtonGroup> = {
  parameters: {
    docs: {
      source: {
        code: `<ButtonGroup size="small" buttonsPosition="center" compact={false}>
  <Button type="secondary" onClick={() => {}}>Button</Button>
  <ButtonDivider />
  <Button type="secondary" onClick={() => {}}>Button</Button>
  <ButtonDivider />
  <Button type="secondary" onClick={() => {}}>Button</Button>
</ButtonGroup>`,
      },
    },
  },
  render: (args) => {
    const [selectedKey, setSelectedKey] = useState('');
    return (
      <ButtonGroup {...args}>
        <Button
          {...Simple.args}
          type={selectedKey === '1' ? 'primary' : 'secondary'}
          onClick={() => setSelectedKey('1')}
        >
          Button
        </Button>
        <ButtonDivider />
        <Button
          {...Simple.args}
          type={selectedKey === '2' ? 'primary' : 'secondary'}
          onClick={() => setSelectedKey('2')}
        >
          Button
        </Button>
        <ButtonDivider />
        <Button
          {...Simple.args}
          type={selectedKey === '1' ? 'primary' : 'secondary'}
          onClick={() => setSelectedKey('1')}
        >
          Button
        </Button>
      </ButtonGroup>
    );
  },
  args: {
    size: 'small',
    fullWidth: false,
    buttonsPosition: 'center',
    compact: false,
  },
};

export const MoreButtonsWithDivider: StoryObj<typeof ButtonGroup> = {
  parameters: {
    docs: {
      source: {
        code: `<ButtonGroup size="small" buttonsPosition="center" compact={false}>
  <Button type="secondary" onClick={() => {}}>Button</Button>
  <ButtonDivider />
  <Button type="secondary" onClick={() => {}}>Button</Button>
  <Button type="custom-color" color="green" mode="icon-label">
    <Icon component={<AngleDownS />} />
    Label
  </Button>
</ButtonGroup>`,
      },
    },
  },
  render: (args) => {
    const [selectedKey, setSelectedKey] = useState('');
    return (
      <ButtonGroup {...args}>
        <Button
          {...Simple.args}
          type={selectedKey === '1' ? 'primary' : 'secondary'}
          onClick={() => setSelectedKey('1')}
        >
          Button
        </Button>
        <ButtonDivider />
        <Button
          {...Simple.args}
          type={selectedKey === '2' ? 'primary' : 'secondary'}
          onClick={() => setSelectedKey('2')}
        >
          Button
        </Button>
        <Button
          {...IconLeft.args}
          type={'custom-color'}
          color={'green'}
          onClick={() => setSelectedKey('3')}
        >
          <Icon component={<AngleDownS />} />
          Label
        </Button>
      </ButtonGroup>
    );
  },
  args: {
    size: 'small',
    fullWidth: false,
    buttonsPosition: 'center',
    compact: false,
  },
};
