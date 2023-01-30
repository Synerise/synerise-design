import * as React from 'react';
import Icon, { FullScreenM } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Autocomplete from '@synerise/ds-autocomplete';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Input } from '@synerise/ds-input';
import { useState } from 'react';
import { debounce } from 'lodash';

import { InputProps } from '../../Factors.types';
import * as S from './Text.styles';
import TextModal from './TextModal';

const TextInput: React.FC<InputProps> = ({
  value,
  onChange,
  texts,
  textType,
  autocompleteText,
  factorType,
  opened,
  onDeactivate,
  error,
  inputProps,
  readOnly = false,
}) => {
  const [openExpanseEditor, setOpenExpanseEditor] = React.useState(false);
  const [inputRef, setInputRef] =
    useState<React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>>();
  const [localValue, setLocalValue] = React.useState(value);
  const [localError, setLocalError] = React.useState(false);
  const onChangeDebounce = React.useCallback(debounce(onChange, 300), [onChange]);

  React.useEffect(() => {
    if (inputRef?.current && opened) {
      inputRef.current.focus();
    }
  }, [inputRef, opened]);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = React.useCallback(
    event => {
      setLocalValue(event.target.value);
      onChangeDebounce(event.target.value);
      if (!event.target.value.length) {
        setLocalError(true);
      } else {
        setLocalError(false);
      }
    },
    [onChangeDebounce]
  );

  const handleApply = React.useCallback(
    val => {
      setOpenExpanseEditor(false);
      onChangeDebounce.cancel();
      setLocalValue(val);
      onChangeDebounce(val);
    },
    [onChangeDebounce]
  );

  const handleAutocomplete = React.useCallback(
    val => {
      setLocalValue(val);
      onChangeDebounce(val);
    },
    [onChangeDebounce]
  );

  const autocompleteOptions = React.useMemo(() => {
    return (
      (autocompleteText &&
        autocompleteText.options.filter(option => option.toLowerCase().includes(String(localValue).toLowerCase()))) ||
      []
    );
  }, [localValue, autocompleteText]);
  const renderInput = (typesOfInput: typeof textType, factorsType: typeof factorType): React.ReactNode => {
    if (typesOfInput === 'autocomplete' && factorsType === 'text') {
      return (
        <Autocomplete
          {...inputProps}
          placeholder={texts.valuePlaceholder}
          value={localValue as string}
          onChange={handleAutocomplete}
          onBlur={onDeactivate}
          error={localError || error}
          handleInputRef={setInputRef}
          defaultOpen
          readOnly={readOnly}
        >
          {autocompleteOptions?.map(option => (
            <Autocomplete.Option key={option} value={option}>
              {option}
            </Autocomplete.Option>
          ))}
        </Autocomplete>
      );
    }
    if (typesOfInput === 'default' && factorsType === 'text') {
      return (
        <S.InputWrapper>
          <Input
            {...inputProps}
            handleInputRef={setInputRef}
            placeholder={texts.valuePlaceholder}
            value={localValue as string}
            onChange={handleChange}
            onBlur={onDeactivate}
            error={localError || error}
            readOnly={readOnly}
          />
        </S.InputWrapper>
      );
    }
    return (
      <S.InputWrapper>
        <Input
          {...inputProps}
          handleInputRef={setInputRef}
          placeholder={texts.valuePlaceholder}
          icon1={
            <S.IconWrapper onClick={(): void => setOpenExpanseEditor(true)}>
              {!readOnly && <Icon component={<FullScreenM />} color={theme.palette['grey-600']} />}
            </S.IconWrapper>
          }
          value={localValue as string}
          onChange={handleChange}
          onBlur={onDeactivate}
          error={localError || error}
          readOnly={readOnly}
        />
      </S.InputWrapper>
    );
  };

  return (
    <S.TextWrapper>
      {renderInput(textType, factorType)}
      <TextModal
        visible={openExpanseEditor}
        onCancel={(): void => setOpenExpanseEditor(false)}
        value={localValue as string}
        onApply={handleApply}
        texts={texts}
      />
    </S.TextWrapper>
  );
};

export default TextInput;
