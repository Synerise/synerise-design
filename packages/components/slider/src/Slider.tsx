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
  tracksColorMap?: S.colorMapProps;
}

const getDefaultTooltipPopupContainer = (): HTMLElement => document.querySelector(`.ant-slider`) as HTMLElement;

const couldBeInverted = (value: number | number[], inverted: boolean): boolean =>
  inverted && (typeof value === 'number' || value.length < 3);

const Slider: React.FC<Props> = ({
  useColorPalette,
  label,
  inverted,
  getTooltipPopupContainer,
  tracksColorMap,
  ...antdProps
}) => {
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
        className={antdProps.value && couldBeInverted(antdProps.value, !!inverted) ? 'ant-slider-inverted' : undefined}
        useColorPalette={useColorPalette}
        tracksColorMap={tracksColorMap}
        getTooltipPopupContainer={getTooltipPopupContainer || getDefaultTooltipPopupContainer}
      />
    </>
  );
};

export default Slider;
