import * as React from 'react';
import { Label } from '@synerise/ds-typography';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import * as S from './Slider.styles';
import { Props, SliderTypes } from './Slider.types';
import Allocation from './Allocation/Allocation';

const getDefaultTooltipPopupContainer = (): HTMLElement => document.querySelector(`.ant-slider`) as HTMLElement;
const couldBeInverted = (value: number | number[], inverted: boolean): boolean =>
  inverted && (typeof value === 'number' || value.length < 3);

const Slider: React.FC<Props> = props => {
  const {
    useColorPalette,
    label,
    inverted,
    getTooltipPopupContainer,
    tracksColorMap,
    type,
    thickness,
    description,
    tipFormatter,
    allocationConfig,
    hideMinAndMaxMarks,
    disabled,
    max,
    min,
    value,
    ...antdProps
  } = props;
  const labelElement = React.useMemo(
    () =>
      label ? (
        <S.LabelWrapper>
          <Label>{label}</Label>
        </S.LabelWrapper>
      ) : null,
    [label]
  );
  if (type === SliderTypes.ALLOCATION && !!allocationConfig) {
    return (
      <>
        {labelElement}
        <Allocation {...props} />
      </>
    );
  }
  const minValue = Number(min);
  const maxValue = Number(max);

  return (
    <>
      {labelElement}
      <S.AntdSlider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...antdProps}
        max={max}
        value={value}
        reachedEnd={Number(value)>(maxValue-minValue)*0.95}
        reachedStart={Number(value)<(maxValue-minValue)*0.05}
        className={value && couldBeInverted(value, !!inverted) ? 'ant-slider-inverted' : undefined}
        useColorPalette={useColorPalette}
        thickness={thickness}
        disabled={disabled}
        description={description}
        hideMinAndMaxMarks={hideMinAndMaxMarks}
        tipFormatter={(tipValue): React.ReactNode => (
          <S.DescriptionWrapper>
            {description && <S.Description>{description}</S.Description>}
            {tipFormatter && tipFormatter(tipValue)}
          </S.DescriptionWrapper>
        )}
        tracksColorMap={tracksColorMap}
        getTooltipPopupContainer={getTooltipPopupContainer || getDefaultTooltipPopupContainer}
      />
    </>
  );
};

export default Slider;
