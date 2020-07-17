import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import * as moment from 'moment';
import { useOnClickOutside } from '@synerise/ds-utils';
import { Props } from './DatePicker.types';
import RawDatePicker from './RawDatePicker';
import PickerInput from './Elements/PickerInput/PickerInput';
import * as S from './DatePicker.styles';

const DatePicker: React.FC<Props> = props => {
  const { texts, value, onApply, showTime } = props;
  const [dropVisible, setDropVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(value);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    !!dropVisible && setDropVisible(false);
  });
  return (
    <Dropdown
      overlay={
        <S.OverlayContainer ref={ref}>
          <RawDatePicker
            {...props}
            showTime={showTime}
            texts={texts}
            onApply={(val: Date | undefined): void => {
              onApply && onApply(val);
              setSelectedDate(val);
              setDropVisible(false);
            }}
          />
        </S.OverlayContainer>
      }
      visible={!!dropVisible}
    >
      <PickerInput
        value={selectedDate ? moment(selectedDate) : selectedDate}
        showTime={showTime}
        onClick={(): void => {
          setDropVisible(!dropVisible);
        }}
        onClear={(): void => {
          setDropVisible(false);
          setSelectedDate(undefined);
        }}
        placeholder={texts.inputPlaceholder}
        clearTooltip={texts.clearTooltip}
      />
    </Dropdown>
  );
};
export default DatePicker;
