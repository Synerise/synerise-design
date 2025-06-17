import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import Radio, { RadioProps, RadioGroupProps } from '@synerise/ds-radio';
import { Label } from '@synerise/ds-input'
import { fixedWrapper300 } from '../../utils';
import { RadioChangeEvent } from 'antd/lib/radio';


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
        <Radio {...args} value="A">
          {children}
        </Radio>
        <Radio {...args} value="B">
          {children}
        </Radio>
      </Radio.Group>
    );
  },
  argTypes: {},
  args: {
    defaultValue: 'A',
    description: 'Description',
    children: 'Label',
  },
} as Meta<StoryProps>;

export const Default: StoryObj<StoryProps> = {};

export const RadioButtons: StoryObj<StoryProps> = {
  render: ({ fullWidth, big, defaultValue, buttonStyle, onChange, ...radioArgs }) => {
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
        <Radio {...args} value="A">
          <Label tooltip='Label A' label='Label A'/>
        </Radio>
        <Radio {...args} value="B">
          <Label tooltip='Label B' label='Label B'/>
        </Radio>
      </Radio.Group>
    );
  },
  args: {
    description: 'Description',
  },
};
