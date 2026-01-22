import React, { useState } from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Slider, { type DefaultSliderProps } from '@synerise/ds-slider';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  fixedWrapper400,
} from '../../utils';
import { TRACKS_COLOR_MAP } from './Slider.data';

export default {
  component: Slider,
  title: 'Components/Slider/DefaultSlider',
  tags: ['autodocs'],
  decorators: [fixedWrapper400],

  render: ({ onChange, ...args }) => {
    const [value, setValue] = useState<number | undefined>(args.value);

    const handleChange = (newValue: number) => {
      setValue(newValue);
      onChange?.(newValue);
    };

    return <Slider {...args} value={value} onChange={handleChange} />;
  },
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,

    disabled: BOOLEAN_CONTROL,
    reverse: BOOLEAN_CONTROL,
    dots: BOOLEAN_CONTROL,
    inverted: BOOLEAN_CONTROL,
    range: BOOLEAN_CONTROL,
    thick: BOOLEAN_CONTROL,

    value: NUMBER_CONTROL,
    max: NUMBER_CONTROL,
    step: NUMBER_CONTROL,
    min: NUMBER_CONTROL,

    description: REACT_NODE_AS_STRING,
    label: REACT_NODE_AS_STRING,
  },
  args: {
    onChange: fn(),
    onAfterChange: fn(),
    description: 'Description',
    label: 'Label',
    min: 0,
    max: 100,
    step: 1,
    marks: {
      '0': 0,
      '100': 100,
    },
  },
} as Meta<DefaultSliderProps>;

export const Default: StoryObj<DefaultSliderProps> = {
  args: {
    value: 50,
  },
};

export const PlainSlider: StoryObj<DefaultSliderProps> = {
  args: {
    ...Default.args,
    label: undefined,
    description: undefined,
  },
};

export const WithDots: StoryObj<DefaultSliderProps> = {
  args: {
    ...Default.args,
    step: 10,
    dots: true,
  },
};

export const Disabled: StoryObj<DefaultSliderProps> = {
  args: {
    ...WithDots.args,
    disabled: true,
  },
};

export const WithMarks: StoryObj<DefaultSliderProps> = {
  args: {
    value: 50,
    marks: {
      '0': 0,
      '50': 50,
      '100': 100,
    },
  },
};

export const WithoutMarks: StoryObj<DefaultSliderProps> = {
  args: {
    value: 50,
    marks: undefined,
  },
};

export const CustomColor: StoryObj<DefaultSliderProps> = {
  args: {
    value: 50,
    tracksColorMap: TRACKS_COLOR_MAP,
  },
};
