import * as React from 'react';
import dayjs from 'dayjs';
import Select from '@synerise/ds-select';
import TimePicker from '@synerise/ds-time-picker';
import Button from '@synerise/ds-button';
import { OptionHorizontalM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { RangeFormProps } from './RangeForm.types';
import * as S from './RangeForm.styles';
import { getDisabledTimeOptions } from '../../../RangePicker/utils';

const TODAY = new Date();

const RangeForm: React.FC<RangeFormProps> = ({startDate, endDate}) => {
  const [start, setStart] = React.useState<Date | undefined>(startDate);
  const [end, setEnd] = React.useState<Date | undefined>(endDate);
  const areStartAndEndValid = React.useMemo(() => !!start && !!end, [start, end]);

  React.useEffect(()=>{
    setStart(startDate);
    setEnd(endDate);
  },[startDate, endDate])

  React.useEffect(() => {
    if (!start) {
      setStart(dayjs(TODAY).startOf('day'));
    }
    if (!end) {
      setEnd(dayjs(TODAY).endOf('day'));
    }
  }, [start, end]);

  return (
    <S.Container>
      <S.Row justifyContent="space-between">
        <span>Set time for: ...</span>
        <Button mode="single-icon" type="ghost">
          <Icon component={<OptionHorizontalM />} />
        </Button>
      </S.Row>
      <S.Row justifyContent="space-between">
        <Select defaultActiveFirstOption>
          {['Hour', 'Range'].map(x => (
            <Select.Option value={x}>{x}</Select.Option>
          ))}
        </Select>
        <TimePicker
          onChange={setStart}
          value={start}
          disabledHours={areStartAndEndValid ? getDisabledTimeOptions(start, 'HOURS', null, end) : []}
          disabledMinutes={areStartAndEndValid ? getDisabledTimeOptions(start, 'MINUTES', null, end) : []}
          disabledSeconds={areStartAndEndValid ? getDisabledTimeOptions(start, 'SECONDS', null, end) : []}
        />
        <S.Separator>-</S.Separator>
        <TimePicker
          onChange={setEnd}
          value={end}
          disabledHours={areStartAndEndValid ? getDisabledTimeOptions(end, 'HOURS', start, null) : []}
          disabledMinutes={areStartAndEndValid ? getDisabledTimeOptions(end, 'MINUTES', start, null) : []}
          disabledSeconds={areStartAndEndValid ? getDisabledTimeOptions(end, 'SECONDS', start, null) : []}
        />
      </S.Row>
    </S.Container>
  );
};

export default RangeForm;
