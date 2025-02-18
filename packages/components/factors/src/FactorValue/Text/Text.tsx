import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  MutableRefObject,
  ReactText,
  ReactNode,
  ChangeEvent,
} from 'react';
import { debounce } from 'lodash';
import type { RefSelectProps } from 'antd';
import Icon, { FullScreenM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import Autocomplete from '@synerise/ds-autocomplete';
import { Input } from '@synerise/ds-input';

import { InputProps } from '../../Factors.types';
import * as S from './Text.styles';
import TextModal from './TextModal';

const TextInput = ({
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
  getPopupContainerOverride,
  readOnly = false,
}: InputProps) => {
  const [openExpanseEditor, setOpenExpanseEditor] = useState(false);
  const [inputRef, setInputRef] = useState<MutableRefObject<HTMLInputElement | RefSelectProps | null | undefined>>();
  const [localValue, setLocalValue] = useState(value);
  const [localError, setLocalError] = useState(false);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    if (inputRef?.current && opened) {
      inputRef.current.focus();
    }
  }, [inputRef, opened]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [localValue, onChange]);

  const debouncedOnChange = useRef(
    debounce((inputValue: ReactText | undefined): void => {
      onChangeRef.current && onChangeRef.current(inputValue);
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLocalValue(event.target.value);
      debouncedOnChange(event.target.value);
      if (!event.target.value.length) {
        setLocalError(true);
      } else {
        setLocalError(false);
      }
    },
    [setLocalValue, setLocalError, debouncedOnChange]
  );

  const handleApply = useCallback(
    (val: string) => {
      setOpenExpanseEditor(false);
      setLocalValue(val);
      debouncedOnChange(val);
    },
    [debouncedOnChange]
  );

  const handleAutocomplete = useCallback(
    (val: string | number) => {
      setLocalValue(val);
      debouncedOnChange(val);
    },
    [debouncedOnChange]
  );

  const autocompleteOptions = useMemo(() => {
    return (
      (autocompleteText &&
        autocompleteText.options.filter(option => option.toLowerCase().includes(String(localValue).toLowerCase()))) ||
      []
    );
  }, [localValue, autocompleteText]);
  const renderInput = (typesOfInput: typeof textType, factorsType: typeof factorType): ReactNode => {
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
          getPopupContainer={getPopupContainerOverride}
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
      <>
        <S.InputWrapper>
          <Input
            {...inputProps}
            handleInputRef={setInputRef}
            placeholder={texts.valuePlaceholder}
            icon1={
              <S.IconWrapper onClick={(): void => setOpenExpanseEditor(true)}>
                {!readOnly && (
                  <Icon
                    component={<FullScreenM data-testid="ds-factors-expansible-icon" />}
                    color={theme.palette['grey-600']}
                  />
                )}
              </S.IconWrapper>
            }
            value={localValue as string}
            onChange={handleChange}
            onBlur={onDeactivate}
            error={localError || error}
            readOnly={readOnly}
          />
        </S.InputWrapper>
        <TextModal
          visible={openExpanseEditor}
          onCancel={(): void => setOpenExpanseEditor(false)}
          value={localValue as string}
          onApply={handleApply}
          texts={texts}
        />
      </>
    );
  };

  return (
    <S.TextWrapper data-testid={`ds-factors-${factorType}-${textType}`}>
      {renderInput(textType, factorType)}
    </S.TextWrapper>
  );
};

export default TextInput;
