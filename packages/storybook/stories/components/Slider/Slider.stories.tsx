import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';

import Slider, { AllocationVariant, SliderProps } from '@synerise/ds-slider';

import {
  BOOLEAN_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  fixedWrapper400,
  CLASSNAME_ARG_CONTROL,
  PREFIXCLS_ARG_CONTROL,
  controlFromOptionsArray,
} from '../../utils';
import { CUSTOM_COLORS, TRACKS_COLOR_MAP, VARIANTS } from './Slider.data';

type StoryProps = SliderProps & {
  customColor: string;
  numberOfRanges: number;
};
export default {
  component: Slider,
  title: 'Components/Slider',
  tags: ['autodocs'],
  decorators: [fixedWrapper400],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    hideMinAndMaxMarks: BOOLEAN_CONTROL,
    autoFocus: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    dots: BOOLEAN_CONTROL,
    inverted: BOOLEAN_CONTROL,
    reverse: BOOLEAN_CONTROL,
    included: BOOLEAN_CONTROL,
    useColorPalette: BOOLEAN_CONTROL,
    range: BOOLEAN_CONTROL,
    value: NUMBER_CONTROL,
    max: NUMBER_CONTROL,
    numberOfRanges: NUMBER_CONTROL,
    step: NUMBER_CONTROL,
    min: NUMBER_CONTROL,
    thickness: NUMBER_CONTROL,
    description: REACT_NODE_AS_STRING,
    label: REACT_NODE_AS_STRING,
    prefixCls: PREFIXCLS_ARG_CONTROL,
    customColor: {
      ...controlFromOptionsArray('select', Object.keys(CUSTOM_COLORS)),
      mapping: CUSTOM_COLORS,
    },
  },
  render: ({ customColor, numberOfRanges, ...args }) => {
    const [value, setValue] = useState<number | number[] | undefined>(args.value);
    const [variants, setVariants] = useState<AllocationVariant[] | undefined>(VARIANTS);
    const handleChange = (newValue: number) => {
      setValue(newValue);
    };

    useEffect(() => {
      if (numberOfRanges) {
        const ranges = Array.from(Array(numberOfRanges + 1)).map((e, i) => {
          return (100 / numberOfRanges) * i;
        });
        setValue(ranges);
      }
    }, [numberOfRanges]);

    const allocationConfig =
      args.type === 'allocation'
        ? {
          variants,
          onAllocationChange: setVariants,
          controlGroupEnabled: false,
          controlGroupLabel: 'CG',
          controlGroupTooltip: 'Control group',
        }
        : undefined;

    const tracksColorMap = typeof value === 'number' ? { 0: customColor } : TRACKS_COLOR_MAP;

    return (
      <Slider
        {...args}
        value={value}
        allocationConfig={allocationConfig}
        onChange={handleChange}
        hideMinAndMaxMarks={true}
        tracksColorMap={tracksColorMap}
      />
    );
  },
  args: {
    description: 'Description',
    label: 'Label',
    min: 0,
    max: 100,
    step: 10,
    useColorPalette: true,
    hideMinAndMaxMarks: true,
    tipFormatter: (value: number) => <div className="Tip">{value}%</div>,
    marks: {
      '0': 0,
      '100': 100,
    },
  },
} as Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  parameters: {
    controls: {
      exclude: ['numberOfRanges', 'range', 'vertical'],
    },
  },
  args: {
    value: 50,
  },
};
export const RangeSlider: Story = {
  parameters: {
    controls: {
      exclude: ['customColor', 'vertical'],
    },
  },
  argTypes: {
    range: { control: false },
  },
  args: {
    numberOfRanges: 4,
    range: true,
    tracksColorMap: TRACKS_COLOR_MAP,
  },
};
export const AllocationSlider: Story = {
  parameters: {
    controls: {
      exclude: ['customColor', 'vertical'],
    },
  },
  args: {
    type: 'allocation',
  },
};
