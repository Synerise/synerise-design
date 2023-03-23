import * as React from 'react';

import Select from '@synerise/ds-select';
import Icon, { CloseS } from '@synerise/ds-icon';
import { useDataFormat } from '@synerise/ds-data-format';
import TimePicker from '@synerise/ds-time-picker';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

import { DateLimitMode, RangeFormProps } from './RangeForm.types';
import * as S from './RangeForm.styles';
import { getDisabledTimeOptions } from '../../../../../RangePicker/utils';

export const FORM_MODES: Record<string, DateLimitMode> = {
  HOUR: 'Hour',
  RANGE: 'Range',
};
const RangeForm: React.FC<RangeFormProps> = ({
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
  timePickerProps,
  texts,
}) => {
  const { is12HoursClock } = useDataFormat();

  const [start, setStart] = React.useState<Date | undefined>(startDate);
  const [end, setEnd] = React.useState<Date | undefined>(endDate);
  const getPopupContainer = React.useCallback(
    (node: HTMLElement): HTMLElement => (node.parentElement != null ? node.parentElement : document.body),
    []
  );
  React.useEffect(() => {
    setStart(startDate);
    setEnd(endDate);
  }, [startDate, endDate]);

  const singleHourPicker = React.useMemo(() => {
    return (
      <TimePicker
        disabled={disabled}
        clearTooltip={texts?.clear}
        onChange={(date): void => {
          onExactHourSelect(date);
          setStart(date);
          setEnd(date);
        }}
        value={start}
        dropdownProps={{
          getPopupContainer,
        }}
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
        use12HourClock={is12HoursClock}
        {...timePickerProps}
      />
    );
  }, [start, onExactHourSelect, getPopupContainer, texts, timePickerProps, disabled, is12HoursClock]);
  const renderRangePicker = React.useCallback(() => {
    return (
      <>
        <TimePicker
          disabled={disabled}
          clearTooltip={texts?.clear}
          onChange={(date?: Date): void => {
            setStart(date);
            onStartChange(date);
          }}
          value={start}
          dropdownProps={{
            getPopupContainer,
          }}
          disabledHours={getDisabledTimeOptions(start || end, 'HOURS', null, end, is12HoursClock)}
          disabledMinutes={getDisabledTimeOptions(start || end, 'MINUTES', null, end, is12HoursClock)}
          disabledSeconds={getDisabledTimeOptions(start || end, 'SECONDS', null, end, is12HoursClock)}
          use12HourClock={is12HoursClock}
          {...timePickerProps}
        />
        <S.Separator>-</S.Separator>
        <TimePicker
          disabled={disabled}
          clearTooltip={texts?.clear}
          onChange={(date?: Date): void => {
            setEnd(date);
            onEndChange(date);
          }}
          value={end}
          dropdownProps={{
            getPopupContainer,
          }}
          disabledHours={getDisabledTimeOptions(end || start, 'HOURS', start, null, is12HoursClock)}
          disabledMinutes={getDisabledTimeOptions(end || start, 'MINUTES', start, null, is12HoursClock)}
          disabledSeconds={getDisabledTimeOptions(end || start, 'SECONDS', start, null, is12HoursClock)}
          use12HourClock={is12HoursClock}
          {...timePickerProps}
        />
      </>
    );
  }, [
    start,
    end,
    onStartChange,
    onEndChange,
    setStart,
    setEnd,
    getPopupContainer,
    texts,
    timePickerProps,
    disabled,
    is12HoursClock,
  ]);
  const limitModeSelect = React.useMemo(
    () =>
      valueSelectionModes.length > 1 ? (
        <Select
          value={mode}
          disabled={disabled}
          onChange={(value): void => {
            onModeChange(value as DateLimitMode);
          }}
          getPopupContainer={getPopupContainer}
        >
          {valueSelectionModes.map(modeName => (
            <Select.Option key={modeName} value={modeName}>
              {modeName}
            </Select.Option>
          ))}
        </Select>
      ) : null,
    [mode, onModeChange, getPopupContainer, valueSelectionModes, disabled]
  );
  return (
    <S.Container>
      <S.Row justifyContent="flex-start">
        {limitModeSelect}
        {mode === FORM_MODES.HOUR ? singleHourPicker : renderRangePicker()}
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
