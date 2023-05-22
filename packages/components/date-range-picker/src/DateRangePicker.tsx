import * as React from 'react';
import { isEqual } from 'lodash';
import './style/index.less';
import { useIntl } from 'react-intl';
import RawDateRangePicker from './RawDateRangePicker';
import * as S from './DateRangePicker.styles';
import { DateRangePickerProps } from './DateRangePicker.types';
import RangePickerInput from './RangePickerInput/RangePickerInput';
import { DateFilter, DateRange } from './date.types';
import { getDefaultTexts } from './utils';

const DateRangePicker: React.FC<DateRangePickerProps> = props => {
  const {
    value,
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
    renderPopoverTrigger = (): void => undefined,
    readOnly = false,
  } = props;
  const intl = useIntl();
  const [popupVisible, setPopupVisible] = React.useState<boolean | undefined>(false);
  const [selectedDate, setSelectedDate] = React.useState(value);
  const [inputActive, setInputActive] = React.useState<boolean>();

  const allTexts = React.useMemo(
    () => getDefaultTexts(intl, disableDefaultTexts, texts),
    [texts, disableDefaultTexts, intl]
  );
  React.useEffect((): void => {
    if (popupVisible !== undefined) {
      setPopupVisible(undefined);
    }
  }, [popupVisible]);

  React.useEffect((): void => {
    if (!isEqual(value, selectedDate)) {
      setSelectedDate(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onApplyCallback = React.useCallback(
    (val: Partial<DateFilter> | undefined): void => {
      onApply && onApply(val);
      setSelectedDate(val as DateRange);
      setPopupVisible(false);
      setInputActive(false);
    },
    [onApply]
  );

  const conditionalVisibilityProps = {
    ...(popupVisible === false && { visible: false }),
  };

  const handleRangePickerInputClick = readOnly ? undefined : (): void => setPopupVisible(undefined);

  const triggerElement = popoverTrigger || renderPopoverTrigger({ setPopupVisible }) || (
    <RangePickerInput
      onClick={handleRangePickerInputClick}
      value={selectedDate}
      showTime={showTime}
      texts={allTexts}
      valueFormatOptions={valueFormatOptions}
      onChange={onApplyCallback}
      active={!!inputActive}
      {...rangePickerInputProps}
      readOnly={readOnly}
    />
  );

  if (readOnly) return <>{triggerElement}</>;

  return (
    <S.PickerWrapper arrowColor={arrowColor}>
      <S.PopoverWrapper
        content={
          <RawDateRangePicker
            {...props}
            showTime={showTime}
            onApply={onApplyCallback}
            value={selectedDate}
            texts={allTexts}
            forceAdjacentMonths={forceAdjacentMonths}
          />
        }
        getPopupContainer={(node): HTMLElement => (node.parentElement != null ? node.parentElement : document.body)}
        trigger="click"
        overlayStyle={{ maxWidth: '700px', fontWeight: 'unset' }}
        overlayClassName="ds-date-range-popover"
        onVisibleChange={(visibility: boolean): void => {
          setInputActive(visibility);
          onVisibleChange && onVisibleChange(visibility);
        }}
        {...popoverProps}
        {...conditionalVisibilityProps}
      >
        {triggerElement}
      </S.PopoverWrapper>
    </S.PickerWrapper>
  );
};

export default DateRangePicker;
export { RawDateRangePicker };
