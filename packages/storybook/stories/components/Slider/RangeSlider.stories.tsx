import React, { useState } from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Slider, { type RangeSliderProps } from '@synerise/ds-slider';

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
  title: 'Components/Slider/RangeSlider',
  tags: ['autodocs'],
  decorators: [fixedWrapper400],
  render: ({ onChange, ...args }) => {
    const [value, setValue] = useState<number[] | undefined>(args.value);

    const handleChange = (newValue: number[]) => {
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
} as Meta<RangeSliderProps>;

export const RangeSlider: StoryObj<RangeSliderProps> = {
  args: {
    value: [20, 50],
    range: true,
  },
};

export const RangeSliderWithDots: StoryObj<RangeSliderProps> = {
  args: {
    value: [10, 50],
    range: true,
    step: 10,
    dots: true,
  },
};

export const RangeSliderMultiple: StoryObj<RangeSliderProps> = {
  args: {
    value: [10, 50, 80, 90],
    range: true,
  },
};

export const RangeSliderCustomColors: StoryObj<RangeSliderProps> = {
  args: {
    ...RangeSliderMultiple.args,
    tracksColorMap: TRACKS_COLOR_MAP,
  },
};

export const RangeSliderValueFormatter: StoryObj<RangeSliderProps> = {
  args: {
    ...RangeSlider.args,
    tipFormatter: (value?: number) => <>{value}%</>,
    marks: {
      '0': '0%',
      '100': '100%',
    },
  },
};
