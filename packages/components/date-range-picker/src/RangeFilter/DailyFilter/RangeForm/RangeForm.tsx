import * as React from 'react';
import dayjs from 'dayjs';
import Select from '@synerise/ds-select';
import TimePicker from '@synerise/ds-time-picker';
import { RangeFormProps } from './RangeForm.types';
import * as S from './RangeForm.styles';
import { range } from '../../../constants';
import { getDisabledTimeOptions } from '../../../RangePicker/utils';
import Button from '@synerise/ds-button';
import { OptionHorizontalM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';

const TODAY = new Date();
const RangeForm: React.FC<RangeFormProps> = () => {
  const [start, setStart] = React.useState<Date | undefined>(dayjs(TODAY).startOf('day'));
  const [end, setEnd] = React.useState<Date | undefined>(dayjs(TODAY).endOf('day'));
  const areStartAndEndValid = React.useMemo(() => !!start && !!end, [start, end]);

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
