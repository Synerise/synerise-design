import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import dayjs from 'dayjs';
import Select from '@synerise/ds-select';
import TimePicker from '@synerise/ds-time-picker';
import { RangeFormProps } from './RangeForm.types';
import * as S from './RangeForm.styles';
import { getDisabledTimeOptions } from '../../../../RangePicker/utils';

const TODAY = new Date();
const FORM_MODES = {
  HOUR: 'Hour',
  RANGE: 'Range',
};
const RangeForm: React.FC<RangeFormProps> = ({ startDate, endDate, onStartChange, onEndChange, onExactHourSelect }) => {
  const [start, setStart] = React.useState<Date | undefined>(startDate);
  const [end, setEnd] = React.useState<Date | undefined>(endDate);
  const [mode, setMode] = React.useState<string>(FORM_MODES.RANGE);
  const areStartAndEndValid = React.useMemo(() => !!start && !!end, [start, end]);

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

  const renderSingleHourPicker = React.useCallback(() => {
    return (
      <TimePicker
        onChange={(date): void => {
          date && onExactHourSelect(date)
        }}
        value={start}
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
      />
    );
  }, [start, onExactHourSelect]);

  const renderRangePicker = React.useCallback(() => {
    return (
      <>
        <TimePicker
          onChange={(date?: Date): void => {
            setStart(date);
            date && onStartChange(date);
          }}
          value={start}
          disabledHours={areStartAndEndValid ? getDisabledTimeOptions(start, 'HOURS', null, end) : []}
          disabledMinutes={areStartAndEndValid ? getDisabledTimeOptions(start, 'MINUTES', null, end) : []}
          disabledSeconds={areStartAndEndValid ? getDisabledTimeOptions(start, 'SECONDS', null, end) : []}
        />
        <S.Separator>-</S.Separator>
        <TimePicker
          onChange={(date?: Date): void => {
            setEnd(date);
            date && onEndChange(date);
          }}
          value={end}
          disabledHours={areStartAndEndValid ? getDisabledTimeOptions(end, 'HOURS', start, null) : []}
          disabledMinutes={areStartAndEndValid ? getDisabledTimeOptions(end, 'MINUTES', start, null) : []}
          disabledSeconds={areStartAndEndValid ? getDisabledTimeOptions(end, 'SECONDS', start, null) : []}
        />
      </>
    );
  }, [areStartAndEndValid, start, end, onStartChange, onEndChange]);
  return (
    <S.Container>
      <S.Row justifyContent="flex-start">
        <Select
          value={mode}
          onChange={(value): void => {
            setMode(value as string);
          }}
        >
          {Object.values(FORM_MODES).map(modeName => (
            <Select.Option key={modeName} value={modeName}>
              {modeName}
            </Select.Option>
          ))}
        </Select>
        {mode === 'Hour' ? renderSingleHourPicker() : renderRangePicker()}
      </S.Row>
    </S.Container>
  );
};

export default RangeForm;
