import * as React from 'react';
import { isEqual } from 'lodash';
import { Popover } from 'antd';
import './style/index.less';
import { useIntl } from 'react-intl';
import RawDateRangePicker from './RawDateRangePicker';
import * as S from './DateRangePicker.styles';
import { Props } from './DateRangePicker.types';
import RangePickerInput from './RangePickerInput/RangePickerInput';
import { DateFilter, DateRange } from './date.types';
import { getDefaultTexts } from './utils';

const DateRangePicker: React.FC<Props> = props => {
  const {
    value,
    onApply,
    showTime,
    onValueChange,
    texts,
    popoverPlacement,
    popoverTrigger,
    forceAdjacentMonths,
    disableDefaultTexts,
  } = props;
  const intl = useIntl();
  const [popupVisible, setPopupVisible] = React.useState<boolean | undefined>(undefined);
  const [selectedDate, setSelectedDate] = React.useState(value);
  const [inputActive, setInputActive] = React.useState<boolean>();

  const allTexts = React.useMemo(() => getDefaultTexts(intl, disableDefaultTexts, texts), [
    texts,
    disableDefaultTexts,
    intl,
  ]);
  React.useEffect((): void => {
    if (popupVisible !== undefined) {
      setPopupVisible(undefined);
    }
  }, [popupVisible]);

  React.useEffect((): void => {
    if (!isEqual(value, selectedDate)) {
      setSelectedDate(value);
    }
  }, [value, selectedDate]);

  const onValueChangeCallback = React.useCallback(
    (val: Partial<DateFilter> | undefined): void => {
      onValueChange && onValueChange(val);
      setSelectedDate(val as DateRange);
    },
    [onValueChange]
  );
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
  return (
    <S.PickerWrapper>
      <Popover
        content={
          <RawDateRangePicker
            {...props}
            showTime={showTime}
            onApply={onApplyCallback}
            onValueChange={onValueChangeCallback}
            value={selectedDate}
            texts={allTexts}
            forceAdjacentMonths={forceAdjacentMonths}
          />
        }
        trigger="click"
        overlayStyle={{ maxWidth: '700px', fontWeight: 'unset' }}
        overlayClassName="ds-date-range-popover"
        onVisibleChange={(visibility: boolean): void => {
          setInputActive(visibility);
        }}
        placement={popoverPlacement}
        {...conditionalVisibilityProps}
      >
        {popoverTrigger || (
          <RangePickerInput
            onClick={(): void => setPopupVisible(undefined)}
            value={selectedDate}
            showTime={showTime}
            texts={allTexts}
            onChange={onValueChangeCallback}
            active={!!inputActive}
          />
        )}
      </Popover>
    </S.PickerWrapper>
  );
};

export default DateRangePicker;
export { RawDateRangePicker };
