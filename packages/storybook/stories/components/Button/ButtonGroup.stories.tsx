
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import ButtonDivider from '@synerise/ds-button-group/dist/ButtonDivider/ButtonDivider';
import Icon, { AngleDownS, DragHandleM } from '@synerise/ds-icon';
import { Simple, IconSolo, IconLeft } from './Button.stories';
import { fixedWrapper588, BOOLEAN_CONTROL, CLASSNAME_ARG_CONTROL, STRING_CONTROL, STYLE_ARG_CONTROL, PREFIXCLS_ARG_CONTROL, controlFromOptionsArray } from '../../utils';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Button/ButtonGroup',
  component: ButtonGroup,
  decorators: [fixedWrapper588],
  parameters: {
    tags: ['autodocs'],
    controls: {
      exclude: ['disabled', 'error']
    }
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
      ...controlFromOptionsArray('inline-radio', [ undefined, 'left' , 'center' , 'right'])
    }
  },
};

export default meta;


export const SplitButton: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <ButtonGroup { ...args }>
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
    error: false
  },
}

export const GroupButtons: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <ButtonGroup { ...args }>
      <Button mode="single-icon" {...Simple.args} type="secondary">
        <Icon component={<DragHandleM />} color="#ffffff" />
      </Button>
      <Button mode="icon-label" {...Simple.args} type="secondary">
        <Icon component={<DragHandleM />} color="#ffffff" />
        Button
      </Button>
      <Button mode="two-icons" {...Simple.args} type="secondary">
        <Icon component={<DragHandleM />} color="#ffffff" />
        Button
        <Icon component={<AngleDownS />} color="#ffffff" />
      </Button>
      <Button mode="label-icon" {...Simple.args} type="secondary">
        Button
        <Icon component={<DragHandleM />} color="#ffffff" />
      </Button>
      <Button {...Simple.args} type="secondary" loading>
        Button
        <Icon component={<DragHandleM />} color="#ffffff" />
      </Button>
      <Button {...Simple.args} type="secondary" disabled>
        Button
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    splitMode: true,
    title: 'Title',
    description: 'Description',
    fullWidth: false,
    buttonsPosition: 'center',
    disabled: false,
    error: false
  },
}


export const OptionButtons: StoryObj<typeof ButtonGroup> = {
  render: (args) => {
    const [selectedKey, setSelectedKey] = useState('');
    return (
    <ButtonGroup { ...args }>
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
  )},
  args: {
    size: 'small',
    fullWidth: false,
    buttonsPosition: 'center'
  },
}

export const ButtonsWithDivider: StoryObj<typeof ButtonGroup> = {
  render: (args) => {
    const [selectedKey, setSelectedKey] = useState('');
    return (
      <ButtonGroup { ...args }>
        <Button
          {...Simple.args}
          type={selectedKey === '1' ? 'primary' : 'secondary'}
          onClick={() => setSelectedKey('1')}
        >
          Button
        </Button>
        <ButtonDivider/>
        <Button
          {...Simple.args}
          type={selectedKey === '2' ? 'primary' : 'secondary'}
          onClick={() => setSelectedKey('2')}
        >
          Button
        </Button>
        <ButtonDivider/>
        <Button
          {...Simple.args}
          type={selectedKey === '1' ? 'primary' : 'secondary'}
          onClick={() => setSelectedKey('1')}
        >
          Button
        </Button>
      </ButtonGroup>
    )},
  args: {
    size: 'small',
    fullWidth: false,
    buttonsPosition: 'center',
    compact: false,
  },
};

export const MoreButtonsWithDivider: StoryObj<typeof ButtonGroup> = {
  render: (args) => {
    const [selectedKey, setSelectedKey] = useState('');
    return (
      <ButtonGroup { ...args }>
        <Button
          {...Simple.args}
          type={selectedKey === '1' ? 'primary' : 'secondary'}
          onClick={() => setSelectedKey('1')}
        >
          Button
        </Button>
        <ButtonDivider/>
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
    )},
  args: {
    size: 'small',
    fullWidth: false,
    buttonsPosition: 'center',
    compact: false,
  },
}

