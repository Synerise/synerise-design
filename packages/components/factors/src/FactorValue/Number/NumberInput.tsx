import * as React from 'react';
import InputNumber from '@synerise/ds-input-number';
import { debounce } from 'lodash';

import { InputProps } from '../../Factors.types';

const NumberInput: React.FC<InputProps> = ({
  error,
  value,
  onChange,
  texts,
  opened,
  onDeactivate,
  readOnly = false,
}) => {
  const [localValue, setLocalValue] = React.useState<string | number | undefined>(value as number);
  const onChangeValueDebounce = React.useRef(debounce(onChange, 300)).current;

  const handleChange = (val: string | number | undefined): void => {
    setLocalValue(val);
    onChangeValueDebounce(val);
  };

  React.useEffect(() => {
    return () => {
      onChangeValueDebounce.cancel();
    };
  }, [onChangeValueDebounce]);

  React.useEffect(() => {
    setLocalValue(value as number);
  }, [value]);

  return (
    <InputNumber
      error={error}
      autoFocus={opened}
      placeholder={texts.valuePlaceholder}
      value={localValue as number}
      onChange={handleChange}
      onBlur={onDeactivate}
      readOnly={readOnly}
    />
  );
};

export default NumberInput;
