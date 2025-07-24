import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { theme } from '@synerise/ds-core';
import { useDataFormat } from '@synerise/ds-data-format';
import Icon, { CloseS } from '@synerise/ds-icon';
import Select from '@synerise/ds-select';
import Slider from '@synerise/ds-slider';
import TimePicker from '@synerise/ds-time-picker';

import { getDisabledTimeOptions } from '../../../../../RangePicker/utils';
import { type TimeWindowTexts } from '../../TimeWindow.types';
import {
  FORM_MODES,
  RANGE_DISPLAY_MODES,
  RANGE_FORM_INTL_KEYS,
  SLIDER_MAX,
  SLIDER_MIN,
  SLIDER_STEP,
} from './RangeForm.constants';
import * as S from './RangeForm.styles';
import { type DateLimitMode, type RangeFormProps } from './RangeForm.types';
import { dateToNumber, numberToDate } from './RangeForm.utils';

// @deprecated, moved to ./RangeForm.constants
export { FORM_MODES, RANGE_FORM_INTL_KEYS };

const RangeForm = ({
  onModeChange,
  disabled,
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  onExactHourSelect,
  onRangeDelete,
  valueSelectionModes = [FORM_MODES.RANGE, FORM_MODES.HOUR],
  mode = valueSelectionModes[0],
  rangeDisplayMode = RANGE_DISPLAY_MODES.TIMEPICKER,
  isInvertedRange,
  timePickerProps,
  texts,
  valueFormatOptions,
  errorTexts,
}: RangeFormProps) => {
  const { is12HoursClock } = useDataFormat();
  const intl = useIntl();
  const [start, setStart] = useState<Date | undefined>(startDate);
  const [end, setEnd] = useState<Date | undefined>(endDate);

  const [sliderStart, setSliderStart] = useState<number>(
    startDate ? dateToNumber(startDate) : SLIDER_MIN,
  );
  const [sliderEnd, setSliderEnd] = useState<number>(
    endDate ? dateToNumber(endDate) : SLIDER_MAX,
  );

  useEffect(() => {
    if (rangeDisplayMode !== RANGE_DISPLAY_MODES.SLIDER) {
      setStart(startDate);
      setEnd(endDate);
    } else {
      setSliderStart(startDate ? dateToNumber(startDate) : SLIDER_MIN);
      setSliderEnd(endDate ? dateToNumber(endDate) : SLIDER_MAX);
    }
  }, [rangeDisplayMode, startDate, endDate]);

  const getPopupContainer = (node: HTMLElement) =>
    node.parentElement !== null ? node.parentElement : document.body;
  const errorForFirstItem = errorTexts?.length && errorTexts[0];
  const errorForSecondItem = errorTexts?.length && errorTexts[1];
  const singleHourPicker = () => (
    <TimePicker
      errorText={errorForFirstItem}
      disabled={disabled}
      clearTooltip={texts.clear}
      onChange={(date) => {
        onExactHourSelect(date);
        setStart(date);
        setEnd(date);
      }}
      value={start}
      dropdownProps={{
        getPopupContainer,
      }}
      use12HourClock={is12HoursClock}
      valueFormatOptions={valueFormatOptions}
      {...timePickerProps}
    />
  );

  const timeFormatByClockMode = is12HoursClock ? 'hh:mm A' : 'HH:mm';

  const tipFormatter = (value?: number) => {
    if (value === undefined) {
      return null;
    }
    const valueAsDate = numberToDate(value, SLIDER_MAX);
    return dayjs(valueAsDate).format(timeFormatByClockMode);
  };

  const renderRangeSlider = () => {
    const handleSliderChange = (range: number[]) => {
      if (range[0] !== sliderStart) {
        setSliderStart(range[0]);
      } else if (range[1] !== sliderEnd) {
        setSliderEnd(range[1]);
      }
    };
    const handleSliderAfterChange = (range: number[]) => {
      const currentStartDateAsNumber = startDate
        ? dateToNumber(startDate)
        : SLIDER_MIN;
      const currentEndDateAsNumber = endDate
        ? dateToNumber(endDate)
        : SLIDER_MAX;
      const newStartDate = numberToDate(range[0], SLIDER_MAX, true);
      const newEndDate = numberToDate(range[1], SLIDER_MAX);
      if (range[0] !== currentStartDateAsNumber) {
        setSliderStart(range[0]);
        onStartChange(newStartDate);
      } else if (range[1] !== currentEndDateAsNumber) {
        setSliderEnd(range[1]);
        onEndChange(newEndDate);
      }
    };

    return (
      <Slider
        range
        min={SLIDER_MIN}
        max={SLIDER_MAX}
        step={SLIDER_STEP}
        inverted={isInvertedRange}
        value={[sliderStart, sliderEnd]}
        included
        getTooltipPopupContainer={(container) => container}
        tooltipVisible
        onAfterChange={handleSliderAfterChange}
        onChange={handleSliderChange}
        tipFormatter={tipFormatter}
      />
    );
  };

  const renderRangePicker = () => {
    return (
      <>
        <TimePicker
          errorText={errorForFirstItem}
          disabled={disabled}
          clearTooltip={texts.clear}
          onChange={(date?: Date) => {
            setStart(date);
            onStartChange(date);
          }}
          value={start}
          dropdownProps={{
            getPopupContainer,
          }}
          disabledHours={getDisabledTimeOptions(
            start || end,
            'HOURS',
            null,
            end,
            is12HoursClock,
          )}
          disabledMinutes={getDisabledTimeOptions(
            start || end,
            'MINUTES',
            null,
            end,
            is12HoursClock,
          )}
          disabledSeconds={getDisabledTimeOptions(
            start || end,
            'SECONDS',
            null,
            end,
            is12HoursClock,
          )}
          use12HourClock={is12HoursClock}
          valueFormatOptions={valueFormatOptions}
          {...timePickerProps}
        />
        <S.Separator>-</S.Separator>
        <TimePicker
          errorText={errorForSecondItem}
          disabled={disabled}
          clearTooltip={texts.clear}
          onChange={(date?: Date) => {
            setEnd(date);
            onEndChange(date);
          }}
          value={end}
          dropdownProps={{
            getPopupContainer,
          }}
          disabledHours={getDisabledTimeOptions(
            end || start,
            'HOURS',
            start,
            null,
            is12HoursClock,
          )}
          disabledMinutes={getDisabledTimeOptions(
            end || start,
            'MINUTES',
            start,
            null,
            is12HoursClock,
          )}
          disabledSeconds={getDisabledTimeOptions(
            end || start,
            'SECONDS',
            start,
            null,
            is12HoursClock,
          )}
          use12HourClock={is12HoursClock}
          {...timePickerProps}
        />
      </>
    );
  };

  const renderRangeUI = () => {
    if (rangeDisplayMode === RANGE_DISPLAY_MODES.SLIDER) {
      return renderRangeSlider();
    }
    return renderRangePicker();
  };

  const getModeLabel = (modeName: DateLimitMode) => {
    if (texts[modeName.toLocaleLowerCase() as keyof TimeWindowTexts]) {
      return texts[modeName.toLocaleLowerCase() as keyof TimeWindowTexts];
    }
    return intl.formatMessage(RANGE_FORM_INTL_KEYS[modeName]);
  };

  const limitModeSelect = () =>
    valueSelectionModes.length > 1 ? (
      <Select
        value={mode}
        disabled={disabled}
        onChange={(value) => {
          onModeChange(value as DateLimitMode);
        }}
        getPopupContainer={getPopupContainer}
      >
        {valueSelectionModes.map((modeName) => (
          <Select.Option key={modeName} value={modeName}>
            {getModeLabel(modeName)}
          </Select.Option>
        ))}
      </Select>
    ) : null;

  return (
    <S.Container data-testid="range-filter-form">
      <S.Row justifyContent="flex-start" mode={rangeDisplayMode}>
        {rangeDisplayMode !== RANGE_DISPLAY_MODES.SLIDER && limitModeSelect()}
        {mode === FORM_MODES.HOUR ? singleHourPicker() : renderRangeUI()}
        {!!onRangeDelete && !disabled && (
          <S.RemoveIconWrapper onClick={onRangeDelete}>
            <Icon component={<CloseS />} color={theme.palette['red-600']} />
          </S.RemoveIconWrapper>
        )}
      </S.Row>
    </S.Container>
  );
};

export default RangeForm;
