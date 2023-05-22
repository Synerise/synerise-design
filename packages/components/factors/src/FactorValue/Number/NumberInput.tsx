import * as React from 'react';
import InputNumber from '@synerise/ds-input-number';
import { debounce } from 'lodash';

import { InputProps } from '../../Factors.types';

const NumberInput: React.FC<InputProps> = ({ value, onChange, texts, opened, onDeactivate, readOnly = false }) => {
  const [localValue, setLocalValue] = React.useState<string | number | undefined>(value as number);
  const onChangeValueDebounce = React.useCallback(debounce(onChange, 300), [onChange]);

  const handleChange = (val: string | number | undefined): void => {
    setLocalValue(val);
    onChangeValueDebounce(val);
  };

  React.useEffect(() => {
    setLocalValue(value as number);
  }, [value]);

  return (
    <InputNumber
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
