import * as React from 'react';
import { Props } from './FilterItem.types';
import * as S from './FilterItem.styles';
import Select from '@synerise/ds-select';
import TimePicker from '@synerise/ds-time-picker';

const options = {
  RANGE: 'Range',
  HOUR: 'Hour',
};
const FilterItem: React.FC<Props> = ({}: Props) => {
  const [filterType, setFilterType] = React.useState<string>(options[0] || '');

  const renderPickers = () => {
    if (filterType === options.RANGE) {
      return (
        <React.Fragment>
          <S.TimePickerWrapper>
            <S.Picker
              onChange={(val) => {
                console.log('val', val);
              }}
              value={undefined}
            />
          </S.TimePickerWrapper>
          <S.TimePickerWrapper>
            <S.Picker
              onChange={(val) => {
                console.log('val', val);
              }}
              value={undefined}
            />
          </S.TimePickerWrapper>
        </React.Fragment>
      );
    }
    if (filterType === options.HOUR) {
      return (
        <React.Fragment>
          <S.TimePickerWrapper>
            <S.Picker
              defaultOpen={false}
              onChange={(val) => {
                console.log('val', val);
              }}
              value={undefined}
            />
          </S.TimePickerWrapper>
        </React.Fragment>
      );
    }
    return null;
  };
  return (
    <S.Wrapper>
      <S.RangeSelect>
        <Select
          onSelect={(val) => {
            setFilterType(val);
          }}
        >
          {Object.values(options).map((opt) => (
            <Select.Option value={opt}>{opt}</Select.Option>
          ))}
        </Select>
      </S.RangeSelect>
      {renderPickers()}
    </S.Wrapper>
  );
};

export default FilterItem;
