import { SliderSingleProps, SliderRangeProps } from 'antd/lib/slider';
import * as React from 'react';
import { AllocationConfig } from 'Allocation/Allocation.types';

type SliderProps = SliderSingleProps | SliderRangeProps;

export type AntdSliderProps = Omit<SliderProps, 'value'>;

export enum SliderTypes {
  ALLOCATION = 'allocation',
  DEFAULT = 'default',
}
export declare type ColorMapProps = {
  [key: string]: string;
};

export interface Props extends AntdSliderProps {
  type?: 'allocation' | 'default';
  allocationConfig?: AllocationConfig;
  label?: React.ReactNode | string;
  value?: number | number[];
  inverted?: boolean;
  useColorPalette?: boolean;
  autoFocus?: boolean;
  tracksColorMap?: ColorMapProps;
  thickness?: number;
  description?: React.ReactNode | string;
  hideMinAndMaxMarks?: boolean;
  disabled?: boolean;
}
