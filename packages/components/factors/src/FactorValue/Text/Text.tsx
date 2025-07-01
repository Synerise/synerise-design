import type { RefSelectProps } from 'antd';
import React, {
  type ChangeEvent,
  type MutableRefObject,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Autocomplete from '@synerise/ds-autocomplete';
import { theme } from '@synerise/ds-core';
import Icon, { FullScreenM } from '@synerise/ds-icon';
import { Input } from '@synerise/ds-input';

import { type FactorValueComponentProps } from '../../Factors.types';
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
  onActivate,
  error,
  inputProps,
  getPopupContainerOverride,
  readOnly = false,
}: FactorValueComponentProps) => {
  const [openExpanseEditor, setOpenExpanseEditor] = useState(false);
  const [inputRef, setInputRef] =
    useState<
      MutableRefObject<HTMLInputElement | RefSelectProps | null | undefined>
    >();
  const [localValue, setLocalValue] = useState(value);
  const [localError, setLocalError] = useState(false);

  useEffect(() => {
    if (inputRef?.current && opened) {
      inputRef.current.focus();
    }
  }, [inputRef, opened]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLocalValue(event.target.value);
      onChange(event.target.value);
      if (!event.target.value.length) {
        setLocalError(true);
      } else {
        setLocalError(false);
      }
    },
    [setLocalValue, setLocalError, onChange],
  );

  const handleApply = useCallback(
    (val: string) => {
      setOpenExpanseEditor(false);
      setLocalValue(val);
      onChange(val);
    },
    [onChange],
  );

  const handleAutocomplete = useCallback(
    (val: string | number) => {
      setLocalValue(val);
      onChange(val);
    },
    [onChange],
  );

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const autocompleteOptions = useMemo(() => {
    return (
      (autocompleteText &&
        autocompleteText.options.filter((option) =>
          option.toLowerCase().includes(String(localValue).toLowerCase()),
        )) ||
      []
    );
  }, [localValue, autocompleteText]);
  const renderInput = (
    typesOfInput: typeof textType,
    factorsType: typeof factorType,
  ): ReactNode => {
    if (typesOfInput === 'autocomplete' && factorsType === 'text') {
      return (
        <Autocomplete
          {...inputProps}
          placeholder={texts.valuePlaceholder}
          value={localValue as string}
          onChange={handleAutocomplete}
          onBlur={onDeactivate}
          onFocus={onActivate}
          error={localError || error}
          handleInputRef={setInputRef}
          defaultOpen
          getPopupContainer={getPopupContainerOverride}
          readOnly={readOnly}
        >
          {autocompleteOptions?.map((option) => (
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
            onFocus={onActivate}
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
                    component={
                      <FullScreenM data-testid="ds-factors-expansible-icon" />
                    }
                    color={theme.palette['grey-600']}
                  />
                )}
              </S.IconWrapper>
            }
            value={localValue as string}
            onChange={handleChange}
            onBlur={onDeactivate}
            onFocus={onActivate}
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
