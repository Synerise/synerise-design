import React, { useCallback, useEffect, useMemo, useState } from 'react';

import '@synerise/ds-core/dist/js/style';
import { Label } from '@synerise/ds-typography';

import Allocation from './Allocation/Allocation';
import * as S from './Slider.styles';
import { type SliderProps, SliderTypes } from './Slider.types';
import './style/index.less';
import {
  buildDefaultTracksColorMap,
  couldBeInverted,
  getDefaultTooltipPopupContainer,
} from './utils/Slider.utils';

const Slider = (props: SliderProps) => {
  const {
    useColorPalette,
    label,
    inverted,
    getTooltipPopupContainer,
    tracksColorMap = buildDefaultTracksColorMap(),
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
    tooltipVisible,
    tooltipPlacement = 'bottom',
    ...antdProps
  } = props;

  const [reachedEnd, setReachedEnd] = useState(false);
  const [reachedStart, setReachedStart] = useState(false);

  const showValueTooltip = useMemo(() => {
    return (
      tooltipVisible !== false &&
      (!antdProps.tooltip || antdProps.tooltip.open !== false)
    );
  }, [tooltipVisible, antdProps.tooltip]);

  const calcHandlePosition = useCallback(() => {
    const handler = document.querySelectorAll('.ant-slider-handle');
    const markTexts = document.querySelectorAll('.ant-slider-mark-text');
    if (handler && markTexts?.length && showValueTooltip) {
      const firstMark = markTexts[0].getBoundingClientRect();
      const lastMark = markTexts[markTexts.length - 1].getBoundingClientRect();
      const firstHandler = handler[0].getBoundingClientRect();
      const lastHandler = handler[handler.length - 1].getBoundingClientRect();
      if (
        firstMark.x + 10 + firstMark.width > firstHandler.x ||
        firstMark.x + 10 + firstMark.width > lastHandler.x
      ) {
        setReachedStart(true);
      } else {
        setReachedStart(false);
      }
      if (lastMark.x - 30 < firstHandler.x || lastMark.x - 30 < lastHandler.x) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }
    }
    return { reachedEnd, reachedStart };
  }, [reachedEnd, reachedStart, showValueTooltip]);

  useEffect(() => {
    setTimeout(() => {
      calcHandlePosition();
    }, 0);
  }, [calcHandlePosition, value]);

  const labelElement = useMemo(
    () =>
      label ? (
        <S.LabelWrapper>
          <Label>{label}</Label>
        </S.LabelWrapper>
      ) : null,
    [label],
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
        {...antdProps}
        min={min}
        max={max}
        value={value}
        reachedEnd={reachedEnd}
        tooltip={{
          ...antdProps.tooltip,
          placement: tooltipPlacement,
          open: tooltipVisible,
        }}
        range={range}
        reachedStart={reachedStart}
        className={
          value && couldBeInverted(value, !!inverted)
            ? 'ant-slider-inverted'
            : undefined
        }
        useColorPalette={useColorPalette}
        thickness={thickness}
        disabled={disabled}
        description={description}
        hideMinAndMaxMarks={hideMinAndMaxMarks}
        tipFormatter={(tipValue?: number) => (
          <S.DescriptionWrapper>
            {description && (
              <S.Description range={Boolean(range)}>
                {description}
              </S.Description>
            )}
            {tipFormatter && tipFormatter(tipValue)}
          </S.DescriptionWrapper>
        )}
        tracksColorMap={tracksColorMap}
        getTooltipPopupContainer={
          getTooltipPopupContainer || getDefaultTooltipPopupContainer
        }
      />
    </>
  );
};

export default Slider;
