import type { ReactNode } from 'react';

import type { TooltipProps } from '@synerise/ds-tooltip';

type AllocationType = 'allocation';
export type SliderType = AllocationType | 'default';

export type ColorMap = Record<number, string>;
export type ColorsOrder = string[];

export type HandlerConfig = Record<
  number,
  {
    blocked: boolean;
    blockedTooltipProps?: TooltipProps;
  }
>;

export type MarkObj = {
  style?: React.CSSProperties;
  label?: React.ReactNode;
};

export type SliderMarks = Record<string | number, React.ReactNode | MarkObj>;

export type DefaultValue = number;
export type RangeValue = number[];

export type RangeSliderProps = BaseSliderProps &
  SharedSliderProps & {
    value?: RangeValue;
    onChange?: (value: RangeValue) => void;
    onAfterChange?: (value: RangeValue) => void;
    range: true;
  };
export type DefaultSliderProps = BaseSliderProps &
  SharedSliderProps & {
    value?: DefaultValue;
    onChange?: (value: DefaultValue) => void;
    onAfterChange?: (value: DefaultValue) => void;
  };

export type AllocationSliderProps = SharedSliderProps & {
  type: AllocationType;
  allocationConfig: AllocationConfig;
  handlers?: HandlerConfig;
};

export type BaseSliderProps = {
  /**
   * inverts coloring of the slider
   * Applies only when value is number or [number, number]
   */
  inverted?: boolean;
  /**
   * renders from right to left
   */
  reverse?: boolean;
  /**
   * slider scale marks
   */
  marks?: SliderMarks;
  min?: number;
  max?: number;

  /**
   * handle value formatter
   */
  tipFormatter?: ((value?: number) => ReactNode) | false;
};

export type SharedSliderProps = {
  label?: ReactNode;

  autoFocus?: boolean;
  tracksColorMap?: ColorMap;

  thick?: boolean;

  description?: ReactNode;

  disabled?: boolean;
  step?: number;

  /**
   * renders dots for allowed handle positions (values)
   * not recommended for low `step` prop values
   */
  dots?: boolean;
};

export type SliderProps =
  | DefaultSliderProps
  | RangeSliderProps
  | AllocationSliderProps;

export type AllocationConfig = {
  controlGroupEnabled?: boolean;
  controlGroupLabel?: ReactNode;
  controlGroupTooltip?: ReactNode;
  variants?: AllocationVariant[];
  onAllocationChange?: (variants?: AllocationVariant[]) => void;
};

export type AllocationVariant = {
  name: ReactNode;
  percentage: number;
  tabId: number;
  tabLetter: ReactNode;
  minPercentage?: number;
};

export type AllocationMark = {
  value: string;
  view: number;
};

export type DefinedCssRuleParameters = {
  indexes: number[];
  classConstPart: string;
  cssRule: string;
};

export type SliderMarksProps = {
  marks: SliderMarks;
  handlesWithValue?: boolean;
};

export type MarkArea = { left: number; width: number };
