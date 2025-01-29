import type { ReactNode } from 'react';
import type { SliderSingleProps, SliderRangeProps } from 'antd/lib/slider';

import type { TooltipProps } from '@synerise/ds-tooltip';

import { AllocationConfig } from './Allocation/Allocation.types';

type AntSliderProps = SliderSingleProps | SliderRangeProps;

export type AntdSliderProps = Omit<AntSliderProps, 'value'>;

export enum SliderTypes {
  ALLOCATION = 'allocation',
  DEFAULT = 'default',
}
export declare type ColorMapProps = {
  [key: string]: string;
};

export type HandlerConfig = Record<
  number,
  {
    blocked: boolean;
    blockedTooltipProps?: TooltipProps;
  }
>;

export type SliderProps = AntdSliderProps & {
  type?: 'allocation' | 'default';
  allocationConfig?: AllocationConfig;
  label?: ReactNode;
  value?: number | number[];
  inverted?: boolean;
  useColorPalette?: boolean;
  autoFocus?: boolean;
  tracksColorMap?: ColorMapProps;
  thickness?: number;
  description?: ReactNode;
  children?: ReactNode;
  hideMinAndMaxMarks?: boolean;
  disabled?: boolean;
  handlers?: HandlerConfig;
};
