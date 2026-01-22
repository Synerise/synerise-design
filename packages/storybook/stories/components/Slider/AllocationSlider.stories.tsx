import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Slider, {
  AllocationSliderProps,
  AllocationVariant,
} from '@synerise/ds-slider';

import {
  BOOLEAN_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  fixedWrapper400,
} from '../../utils';
import {
  ALLOCATION_CONFIG,
  ALLOCATION_CONFIG_WITH_CG,
  TRACKS_COLOR_MAP,
} from './Slider.data';

export default {
  component: Slider,
  title: 'Components/Slider/AllocationSlider',
  tags: ['autodocs'],
  decorators: [fixedWrapper400],
  argTypes: {
    disabled: BOOLEAN_CONTROL,
    dots: BOOLEAN_CONTROL,
    inverted: BOOLEAN_CONTROL,

    value: NUMBER_CONTROL,
    max: NUMBER_CONTROL,

    step: NUMBER_CONTROL,
    min: NUMBER_CONTROL,
    thick: BOOLEAN_CONTROL,
    description: REACT_NODE_AS_STRING,
    label: REACT_NODE_AS_STRING,
  },
  render: ({ allocationConfig, ...args }) => {
    const [variants, setVariants] = useState<AllocationVariant[] | undefined>(
      allocationConfig.variants,
    );

    const handleAllocationChange = (v?: AllocationVariant[]) => {
      allocationConfig.onAllocationChange?.(v);
      setVariants(v);
    };

    return (
      <Slider
        {...args}
        allocationConfig={{
          ...allocationConfig,
          variants,
          onAllocationChange: handleAllocationChange,
        }}
        type="allocation"
      />
    );
  },
  args: {
    description: 'Description',
    label: 'Label',
    min: 0,
    max: 100,
    step: 1,
    allocationConfig: ALLOCATION_CONFIG,
  },
} as Meta<AllocationSliderProps>;

export const Default: StoryObj<AllocationSliderProps> = {};

export const WithDots: StoryObj<AllocationSliderProps> = {
  args: {
    step: 10,
    dots: true,
  },
};

export const Disabled: StoryObj<AllocationSliderProps> = {
  args: {
    disabled: true,
  },
};

export const WithControlGroup: StoryObj<AllocationSliderProps> = {
  args: {
    allocationConfig: ALLOCATION_CONFIG_WITH_CG,
  },
};

export const WithCustomColors: StoryObj<AllocationSliderProps> = {
  args: {
    ...WithControlGroup.args,
    tracksColorMap: TRACKS_COLOR_MAP,
  },
};

export const WithBlockedHandles: StoryObj<AllocationSliderProps> = {
  args: {
    ...WithControlGroup.args,
    tracksColorMap: TRACKS_COLOR_MAP,
    handlers: {
      '1': {
        blocked: true,
        blockedTooltipProps: {
          title: 'This handle is blocked',
        },
      },
    },
  },
};
