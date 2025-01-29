import React, { useCallback, useState, useRef, useMemo, useEffect } from 'react';
import { isEqual } from 'lodash';
import './style/index.less';
import { useIntl } from 'react-intl';
import { Popover } from 'antd';

import RawDateRangePicker from './RawDateRangePicker';
import * as S from './DateRangePicker.styles';
import { DateRangePickerProps } from './DateRangePicker.types';
import RangePickerInput from './RangePickerInput/RangePickerInput';
import { DateFilter, DateRange } from './date.types';
import { getDefaultTexts } from './utils';

const DateRangePicker = (props: DateRangePickerProps) => {
  const {
    value,
    defaultValue,
    onApply,
    showTime,
    texts,
    popoverTrigger,
    forceAdjacentMonths,
    disableDefaultTexts,
    arrowColor,
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
  const [isTopAligned, setIsTopAligned] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const allTexts = useMemo(() => getDefaultTexts(intl, disableDefaultTexts, texts), [texts, disableDefaultTexts, intl]);

  useEffect(() => {
    if (!isEqual(selectedRange, selectedDate)) {
      setSelectedDate(selectedRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRange]);

  const checkContentAlignement = useCallback(() => {
    if (wrapperRef.current) {
      const popoverDomElement = wrapperRef.current.querySelector('.ds-date-range-popover');

      if (popoverDomElement) {
        const classNames = Array.from(popoverDomElement.classList);
        const placementClassName = classNames.find(className => className.startsWith('ant-popover-placement-'));
        const placement = placementClassName && placementClassName.split('-').pop()?.toLocaleLowerCase();
        const topAligned = placement?.indexOf('bottom') === -1;
        setIsTopAligned(topAligned);
      }
    }
  }, []);

  useEffect(() => {
    checkContentAlignement();
  }, [checkContentAlignement]);

  const onApplyCallback = useCallback(
    (range: Partial<DateFilter> | undefined) => {
      const finalDateRange = range === undefined && defaultValue !== undefined ? defaultValue : range;
      onApply && onApply(finalDateRange);
      setSelectedDate(finalDateRange as DateRange);
      setPopupVisible(false);
      setInputActive(false);
    },
    [defaultValue, onApply]
  );

  const conditionalVisibilityProps = {
    ...(popupVisible === false && { visible: false }),
  };

  const handleRangePickerInputClick = readOnly ? undefined : () => setPopupVisible(true);
  const hasCustomTrigger = !!popoverTrigger;
  const triggerElement = popoverTrigger || renderPopoverTrigger({ setPopupVisible }) || (
    <RangePickerInput
      onClick={handleRangePickerInputClick}
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

  if (readOnly || disabled) return <>{triggerElement}</>;

  return (
    <S.PickerWrapper ref={wrapperRef} arrowColor={arrowColor}>
      <Popover
        content={
          <RawDateRangePicker
            {...props}
            showTime={showTime}
            onApply={onApplyCallback}
            value={selectedDate}
            texts={allTexts}
            forceAdjacentMonths={forceAdjacentMonths}
            alignContentToTop={isTopAligned}
          />
        }
        getPopupContainer={
          getPopupContainer !== undefined
            ? node => getPopupContainer(node)
            : (node): HTMLElement => (node.parentElement != null ? node.parentElement : document.body)
        }
        trigger="click"
        overlayStyle={{ maxWidth: '700px', fontWeight: 'unset' }}
        overlayClassName="ds-date-range-popover"
        onVisibleChange={(visibility: boolean) => {
          visibility && checkContentAlignement();
          visibility && hasCustomTrigger && setPopupVisible(true);
          setInputActive(visibility);
          onVisibleChange && onVisibleChange(visibility);
        }}
        {...popoverProps}
        {...conditionalVisibilityProps}
      >
        {triggerElement}
      </Popover>
    </S.PickerWrapper>
  );
};

export default DateRangePicker;
export { RawDateRangePicker };
