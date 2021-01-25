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
    range,
    ...antdProps
  } = props;

  const calcHandlePosition = React.useCallback(() => {
    const handler =  document.querySelectorAll('.ant-slider-handle');
    const markTexts =  document.querySelectorAll('.ant-slider-mark-text');
    let reachedStart = false;
    let reachedEnd = false;
    if (handler && markTexts?.length) {
      const firstMark = markTexts[0].getBoundingClientRect();
      const lastMark = markTexts[markTexts.length - 1].getBoundingClientRect();
      const firstHandler = handler[0].getBoundingClientRect();
      const lastHandler = handler[handler.length - 1].getBoundingClientRect();
      if (firstMark.x + 50 + firstMark.width > firstHandler.x || firstMark.x + 50 + firstMark.width > lastHandler.x) {
        reachedStart = true;
      }
      if (lastMark.x - 1 - lastMark.width < firstHandler.x || lastMark.x - 1 - lastMark.width < lastHandler.x) {
        reachedEnd = true;
      }
    }
    return { reachedEnd, reachedStart };
  }, []);

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

  return (
    <>
      {labelElement}
      <S.AntdSlider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...antdProps}
        max={max}
        value={value}
        reachedEnd={calcHandlePosition().reachedEnd}
        range={range}
        reachedStart={calcHandlePosition().reachedStart}
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
