import * as React from 'react';
import { RawInput } from '@synerise/ds-input';
import { debounce } from 'lodash';

import { DynamicKeyValueType, InputProps } from '../../Factors.types';
import * as S from './DynamicKey.style';

const DynamicKey: React.FC<InputProps> = ({ value, onChange, withoutTypeSelector = false, texts, opened }) => {
  const [localValue, setLocalValue] = React.useState<DynamicKeyValueType>({
    key: (value as DynamicKeyValueType).key,
    value: (value as DynamicKeyValueType).value,
  });
  const onChangeDebounce = React.useCallback(debounce(onChange, 300), [onChange]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = { ...(value as DynamicKeyValueType) };
    newValue[event.target.name] = event.target.value;
    setLocalValue(newValue);
    onChangeDebounce(newValue);
  };

  React.useEffect(() => {
    setLocalValue(value as DynamicKeyValueType);
  }, [value]);

  return (
    <S.DynamicKey withoutTypeSelector={withoutTypeSelector}>
      <RawInput
        placeholder={texts.dynamicKey.keyPlaceholder}
        value={localValue.key}
        name="key"
        onChange={handleChange}
        autoFocus={opened}
      />
      <RawInput
        placeholder={texts.dynamicKey.valuePlaceholder}
        value={localValue.value}
        name="value"
        onChange={handleChange}
      />
    </S.DynamicKey>
  );
};

export default DynamicKey;
