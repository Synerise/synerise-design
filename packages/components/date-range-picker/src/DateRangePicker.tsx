import isEqual from 'lodash.isequal';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import { Popover, PopoverContent, getPlacement } from '@synerise/ds-popover';

import * as S from './DateRangePicker.styles';
import { type DateRangePickerProps } from './DateRangePicker.types';
import RangePickerInput from './RangePickerInput/RangePickerInput';
import { RawDateRangePicker } from './RawDateRangePicker';
import {
  POPOVER_FLIP_CONFIG,
  POPOVER_OFFSET_CONFIG,
  POPOVER_SHIFT_CONFIG,
} from './constants';
import { type DateFilter, type DateRange } from './date.types';
import { getDefaultTexts } from './utils';

const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (props, forwardedRef) => {
    const {
      value,
      defaultValue,
      onApply,
      showTime,
      texts,
      popoverTrigger,
      forceAdjacentMonths,
      disableDefaultTexts,
      placement = 'top',
      valueFormatOptions,
      onVisibleChange,
      popoverProps = {},
      rangePickerInputProps = {},
      renderPopoverTrigger = () => undefined,
      readOnly = false,
      disabled,
      getPopupContainer,
    } = props;
    const intl = useIntl();
    const selectedRange = value || defaultValue;
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(selectedRange);
    const [inputActive, setInputActive] = useState(false);

    const floatingPlacement = getPlacement(placement);
    const allTexts = useMemo(
      () => getDefaultTexts(intl, disableDefaultTexts, texts),
      [texts, disableDefaultTexts, intl],
    );

    useEffect(() => {
      if (!isEqual(selectedRange, selectedDate)) {
        setSelectedDate(selectedRange);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRange]);

    const onApplyCallback = useCallback(
      (range: Partial<DateFilter> | undefined) => {
        const finalDateRange =
          range === undefined && defaultValue !== undefined
            ? defaultValue
            : range;
        onApply && onApply(finalDateRange);
        setSelectedDate(finalDateRange as DateRange);
        setPopupVisible(false);
        setInputActive(false);
      },
      [defaultValue, onApply],
    );

    const conditionalVisibilityProps = {
      ...(popupVisible !== undefined && { open: popupVisible }),
    };

    const togglePopup = useCallback(() => {
      setPopupVisible(!popupVisible);
      onVisibleChange && onVisibleChange(!popupVisible);
    }, [popupVisible, onVisibleChange]);

    const triggerElement = popoverTrigger ||
      renderPopoverTrigger({ setPopupVisible }) || (
        <RangePickerInput
          onClick={readOnly ? undefined : togglePopup}
          value={selectedDate}
          showTime={showTime}
          texts={allTexts}
          valueFormatOptions={valueFormatOptions}
          onChange={onApplyCallback}
          active={inputActive}
          {...rangePickerInputProps}
          readOnly={readOnly}
          disabled={disabled}
        />
      );
    const hasCustomTrigger = Boolean(popoverTrigger || renderPopoverTrigger);
    const handleTriggerClick = hasCustomTrigger
      ? () => {
          if (hasCustomTrigger) {
            togglePopup();
          }
        }
      : undefined;

    if (readOnly || disabled) {
      return (
        <S.PickerWrapper ref={forwardedRef}>{triggerElement}</S.PickerWrapper>
      );
    }

    return (
      <Popover
        getPopupContainer={getPopupContainer || (() => document.body)}
        trigger="click"
        onOpenChange={(openState: boolean) => {
          setPopupVisible(openState);
          setInputActive(openState);
          onVisibleChange && onVisibleChange(openState);
        }}
        placement={floatingPlacement}
        testId="date-range-picker"
        componentId="date-range-picker"
        returnFocus={false}
        offsetConfig={POPOVER_OFFSET_CONFIG}
        flipConfig={POPOVER_FLIP_CONFIG}
        shiftConfig={POPOVER_SHIFT_CONFIG}
        autoUpdate={true}
        {...conditionalVisibilityProps}
        {...popoverProps}
      >
        <PopoverContent>
          <S.DateRangePickerOverlay
            className="ds-date-range-popover"
            data-testid="ds-date-range-picker-overlay"
          >
            <RawDateRangePicker
              {...props}
              showTime={showTime}
              onApply={onApplyCallback}
              value={selectedDate}
              texts={allTexts}
              forceAdjacentMonths={forceAdjacentMonths}
            />
          </S.DateRangePickerOverlay>
        </PopoverContent>
        <S.PickerTrigger asChild={false}>
          <S.PickerWrapper ref={forwardedRef} onClick={handleTriggerClick}>
            {triggerElement}
          </S.PickerWrapper>
        </S.PickerTrigger>
      </Popover>
    );
  },
);

export default DateRangePicker;
