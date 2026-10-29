import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import Radio, {
  RadioChangeEvent,
  RadioGroupProps,
  RadioProps,
} from '@synerise/ds-radio';

import { BOOLEAN_CONTROL, fixedWrapper300 } from '../../utils';

type StoryProps = RadioGroupProps & RadioProps;

export default {
  component: Radio,
  title: 'Components/Radio',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  render: ({ defaultValue, onChange, children, ...args }) => {
    const handleChange = (event: RadioChangeEvent) => {
      onChange?.(event);
    };
    return (
      <Radio.Group onChange={handleChange} defaultValue={defaultValue}>
        <Radio {...args} value="A" />
        <Radio {...args} value="B" />
      </Radio.Group>
    );
  },
  argTypes: {
    disabled: BOOLEAN_CONTROL,
  },
  args: {
    defaultValue: 'A',
    description: 'Description',
    label: 'Label',
  },
} as Meta<StoryProps>;

export const Default: StoryObj<StoryProps> = {};

export const Disabled: StoryObj<StoryProps> = {
  args: { disabled: true },
};

export const RadioButtons: StoryObj<StoryProps> = {
  render: ({
    fullWidth,
    big,
    defaultValue,
    buttonStyle,
    onChange,
    ...radioArgs
  }) => {
    const handleChange = (event: RadioChangeEvent) => {
      onChange?.(event);
    };
    return (
      <Radio.Group
        defaultValue={defaultValue}
        buttonStyle={buttonStyle}
        onChange={handleChange}
        fullWidth={fullWidth}
        big={big}
      >
        <Radio.Button {...radioArgs} value="a">
          A
        </Radio.Button>
        <Radio.Button {...radioArgs} value="b">
          B
        </Radio.Button>
        <Radio.Button {...radioArgs} value="c">
          C
        </Radio.Button>
        <Radio.Button {...radioArgs} value="d">
          D
        </Radio.Button>
      </Radio.Group>
    );
  },
  args: {
    defaultValue: 'a',
    buttonStyle: 'solid',
    fullWidth: false,
    big: true,
  },
};

export const RadioWithLabelAndTooltip: StoryObj<StoryProps> = {
  render: ({ defaultValue, onChange, children, ...args }) => {
    const handleChange = (event: RadioChangeEvent) => {
      onChange?.(event);
    };
    return (
      <Radio.Group onChange={handleChange} defaultValue={defaultValue}>
        <Radio {...args} value="A" label="Label A" tooltip="Label A" />
        <Radio {...args} value="B" label="Label B" tooltip="Label B" />
      </Radio.Group>
    );
  },
  parameters: { controls: { exclude: ['label', 'tooltip'] } },
  args: {
    description: 'Description',
  },
};

export const RadioWithChildren: StoryObj<StoryProps> = {
  render: ({ defaultValue, onChange, children, ...args }) => {
    const handleChange = (event: RadioChangeEvent) => {
      onChange?.(event);
    };
    return (
      <Radio.Group onChange={handleChange} defaultValue={defaultValue}>
        <Radio {...args} value="A">
          {children}
        </Radio>
        <Radio {...args} value="B">
          {children}
        </Radio>
      </Radio.Group>
    );
  },
  args: {
    description: 'Description',
    label: undefined,
    children: 'Label',
  },
};
