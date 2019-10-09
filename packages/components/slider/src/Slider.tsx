import * as React from 'react';
import { SliderProps } from 'antd/lib/slider';
import { Label } from '@synerise/ds-typography';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import * as S from './Slider.styles';

type AntdSliderProps = Omit<SliderProps, 'value'>;
interface Props extends AntdSliderProps {
  label?: React.ReactNode | string;
  value?: number | number[];
  inverted?: boolean;
  useColorPalette?: boolean;
  autoFocus?: boolean;
}

const getDefaultTooltipPopupContainer = (): Element => document.querySelector(`.ant-slider`);

const couldBeInverted = (value: number | number[], inverted: boolean): boolean =>
  inverted && (typeof value === 'number' || value.length < 3);

const Slider: React.FC<Props> = ({ useColorPalette, label, inverted, getTooltipPopupContainer, ...antdProps }) => {
  return (
    <>
      {label && (
        <S.LabelWrapper>
          <Label>{label}</Label>
        </S.LabelWrapper>
      )}
      <S.AntdSlider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...antdProps}
        className={couldBeInverted(antdProps.value, inverted) && 'ant-slider-inverted'}
        useColorPalette={useColorPalette}
        getTooltipPopupContainer={getTooltipPopupContainer || getDefaultTooltipPopupContainer}
      />
    </>
  );
};

export default Slider;
