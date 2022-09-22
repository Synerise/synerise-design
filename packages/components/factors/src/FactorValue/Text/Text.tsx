import * as React from 'react';
import Icon, { FullScreenM } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Autocomplete from '@synerise/ds-autocomplete';
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

  const SuffixIcon = React.useMemo(() => {
    return factorType === 'text' && textType === 'expansible' ? (
      <S.IconWrapper onClick={(): void => setOpenExpanseEditor(true)}>
        <Icon component={<FullScreenM />} color={theme.palette['grey-600']} />
      </S.IconWrapper>
    ) : null;
  }, [textType, factorType]);

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
      onChange(val);
    },
    [onChange]
  );

  const autocompleteOptions = React.useMemo(() => {
    return (
      (autocompleteText &&
        autocompleteText.options.filter(option => option.toLowerCase().includes(String(localValue).toLowerCase()))) ||
      []
    );
  }, [localValue, autocompleteText]);

  return (
    <S.TextWrapper>
      {factorType === 'text' && textType === 'autocomplete' ? (
        <Autocomplete
          placeholder={texts.valuePlaceholder}
          value={localValue as string}
          onChange={handleAutocomplete}
          onBlur={onDeactivate}
          error={localError || error}
          handleInputRef={setInputRef}
          defaultOpen
        >
          {autocompleteOptions?.map(option => (
            <Autocomplete.Option key={option} value={option}>
              {option}
            </Autocomplete.Option>
          ))}
        </Autocomplete>
      ) : (
        <S.InputWrapper>
          <Input
            handleInputRef={setInputRef}
            placeholder={texts.valuePlaceholder}
            suffix={SuffixIcon}
            value={localValue as string}
            onChange={handleChange}
            onBlur={onDeactivate}
            error={localError || error}
            autoResize={textType === 'default' ? { minWidth: '144px', maxWidth: '450px' } : false}
          />
        </S.InputWrapper>
      )}
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
