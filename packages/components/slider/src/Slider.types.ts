import { SliderProps } from 'antd/lib/slider';
import * as React from 'react';
import * as S from './Slider.styles';

export type AntdSliderProps = Omit<SliderProps, 'value'>;
export interface Props extends AntdSliderProps {
  label?: React.ReactNode | string;
  value?: number | number[];
  inverted?: boolean;
  useColorPalette?: boolean;
  autoFocus?: boolean;
  tracksColorMap?: S.colorMapProps;
}
