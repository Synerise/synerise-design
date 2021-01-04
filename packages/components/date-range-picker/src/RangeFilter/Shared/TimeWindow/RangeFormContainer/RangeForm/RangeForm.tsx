import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import dayjs from 'dayjs';
import Select from '@synerise/ds-select';
import Icon from '@synerise/ds-icon';
import { CloseS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import TimePicker from '@synerise/ds-time-picker';
import { DateLimitMode, RangeFormProps } from './RangeForm.types';
import * as S from './RangeForm.styles';
import { getDisabledTimeOptions } from '../../../../../RangePicker/utils';

const TODAY = new Date();
const FORM_MODES: Record<string, DateLimitMode> = {
  HOUR: 'Hour',
  RANGE: 'Range',
};
const RangeForm: React.FC<RangeFormProps> = ({
  mode = 'Range',
  onModeChange,
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  onExactHourSelect,
  onRangeDelete,
  texts,
}) => {
  const [start, setStart] = React.useState<Date | undefined>(startDate);
  const [end, setEnd] = React.useState<Date | undefined>(endDate);
  const areStartAndEndValid = React.useMemo(() => !!start && !!end, [start, end]);

  const getPopupContainer = React.useCallback(
    (node: HTMLElement): HTMLElement => (node.parentElement != null ? node.parentElement : document.body),
    []
  );

  React.useEffect(() => {
    setStart(startDate);
    setEnd(endDate);
  }, [startDate, endDate]);

  React.useEffect(() => {
    if (!start) {
      setStart(
        dayjs(TODAY)
          .startOf('day')
          .toDate()
      );
    }
    if (!end) {
      setEnd(
        dayjs(TODAY)
          .endOf('day')
          .toDate()
      );
    }
  }, [start, end]);

  const singleHourPicker = React.useMemo(() => {
    return (
      <TimePicker
        onChange={(date): void => {
          date && onExactHourSelect(date);
        }}
        value={start}
        dropdownProps={{
          getPopupContainer,
        }}
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
      />
    );
  }, [start, onExactHourSelect, getPopupContainer]);

  const renderRangePicker = React.useCallback(() => {
    return (
      <>
        <TimePicker
          clearTooltip={texts?.clear}
          onChange={(date?: Date): void => {
            setStart(date);
            date && onStartChange(date);
          }}
          value={start}
          dropdownProps={{
            getPopupContainer,
          }}
          disabledHours={areStartAndEndValid ? getDisabledTimeOptions(start, 'HOURS', null, end) : []}
          disabledMinutes={areStartAndEndValid ? getDisabledTimeOptions(start, 'MINUTES', null, end) : []}
          disabledSeconds={areStartAndEndValid ? getDisabledTimeOptions(start, 'SECONDS', null, end) : []}
        />
        <S.Separator>-</S.Separator>
        <TimePicker
          clearTooltip={texts?.clear}
          onChange={(date?: Date): void => {
            setEnd(date);
            date && onEndChange(date);
          }}
          value={end}
          dropdownProps={{
            getPopupContainer,
          }}
          disabledHours={areStartAndEndValid ? getDisabledTimeOptions(end, 'HOURS', start, null) : []}
          disabledMinutes={areStartAndEndValid ? getDisabledTimeOptions(end, 'MINUTES', start, null) : []}
          disabledSeconds={areStartAndEndValid ? getDisabledTimeOptions(end, 'SECONDS', start, null) : []}
        />
      </>
    );
  }, [areStartAndEndValid, start, end, onStartChange, onEndChange, getPopupContainer, texts]);
  const limitModeSelect = React.useMemo(
    () => (
      <Select
        value={mode}
        onChange={(value): void => {
          onModeChange(value as DateLimitMode);
        }}
        getPopupContainer={getPopupContainer}
      >
        {Object.values(FORM_MODES).map(modeName => (
          <Select.Option key={modeName} value={modeName}>
            {modeName}
          </Select.Option>
        ))}
      </Select>
    ),
    [mode, onModeChange, getPopupContainer]
  );
  return (
    <S.Container>
      <S.Row justifyContent="flex-start">
        {limitModeSelect}
        {mode === FORM_MODES.HOUR ? singleHourPicker : renderRangePicker()}
        {!!onRangeDelete && (
          <S.RemoveIconWrapper onClick={onRangeDelete}>
            <Icon component={<CloseS />} color={theme.palette['red-600']} />
          </S.RemoveIconWrapper>
        )}
      </S.Row>
    </S.Container>
  );
};

export default RangeForm;
