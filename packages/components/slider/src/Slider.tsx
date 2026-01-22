import React from 'react';

import {
  type AllocationSliderProps,
  type RangeSliderProps,
  type SliderProps,
} from './Slider.types';
import { AllocationSlider } from './components/AllocationSlider';
import { DefaultSlider } from './components/DefaultSlider';
import { RangeSlider } from './components/RangeSlider';

const isRangeSlider = (props: SliderProps): props is RangeSliderProps => {
  return 'range' in props && props.range;
};

const isAllocationSlider = (
  props: SliderProps,
): props is AllocationSliderProps => {
  return 'type' in props && props.type === 'allocation';
};

const Slider = (props: SliderProps) => {
  if (isAllocationSlider(props)) {
    return <AllocationSlider {...props} />;
  }
  if (isRangeSlider(props)) {
    return <RangeSlider {...props} />;
  }
  return <DefaultSlider {...props} />;
};

export default Slider;
