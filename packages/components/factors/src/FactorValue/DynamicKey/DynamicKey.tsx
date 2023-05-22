import * as React from 'react';
import { RawInput } from '@synerise/ds-input';
import { debounce } from 'lodash';

import { DynamicKeyValueType, InputProps } from '../../Factors.types';
import * as S from './DynamicKey.style';

const DynamicKey: React.FC<InputProps> = ({
  value,
  onChange,
  withoutTypeSelector = false,
  texts,
  opened,
  onDeactivate,
  error,
  readOnly = false,
}) => {
  const [localValue, setLocalValue] = React.useState<DynamicKeyValueType>({
    key: (value as DynamicKeyValueType).key,
    value: (value as DynamicKeyValueType).value,
  });
  const [localError, setLocalError] = React.useState(false);
  const onChangeDebounce = React.useCallback(debounce(onChange, 300), [onChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = { ...(value as DynamicKeyValueType) };
    newValue[event.target.name] = event.target.value;
    setLocalValue(newValue);
    onChangeDebounce(newValue);
    if (!event.target.value.length) {
      setLocalError(true);
    } else {
      setLocalError(false);
    }
  };

  React.useEffect(() => {
    setLocalValue(value as DynamicKeyValueType);
  }, [value]);

  const trigger = (
    <>
      <RawInput
        placeholder={texts.dynamicKey.keyPlaceholder}
        value={localValue.key}
        name="key"
        onChange={handleChange}
        autoFocus={opened}
        onBlur={onDeactivate}
        error={localError || error}
        readOnly={readOnly}
      />
      <RawInput
        placeholder={texts.dynamicKey.valuePlaceholder}
        value={localValue.value}
        name="value"
        onChange={handleChange}
        error={localError || error}
        readOnly={readOnly}
      />
    </>
  );

  return readOnly ? trigger : <S.DynamicKey withoutTypeSelector={withoutTypeSelector}>{trigger}</S.DynamicKey>;
};

export default DynamicKey;
