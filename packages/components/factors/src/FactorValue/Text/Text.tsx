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
import { useTheme } from '@synerise/ds-core';
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
  factorValueExtraProps,
  uncontrolledComponent,
}: FactorValueComponentProps) => {
  const [openExpanseEditor, setOpenExpanseEditor] = useState(false);
  const [inputRef, setInputRef] =
    useState<
      MutableRefObject<HTMLInputElement | RefSelectProps | null | undefined>
    >();
  const [localValue, setLocalValue] = useState(() => value);
  const [localError, setLocalError] = useState(false);
  const theme = useTheme();

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
    if (!uncontrolledComponent) {
      setLocalValue(value);
    }
  }, [value, uncontrolledComponent]);

  useEffect(() => {
    if (uncontrolledComponent && !value && localValue !== value) {
      setLocalValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, uncontrolledComponent]);

  const autocompleteOptions = useMemo(() => {
    return (
      (autocompleteText &&
        autocompleteText.options.filter((option) =>
          option.toLowerCase().includes(String(localValue).toLowerCase()),
        )) ||
      []
    );
  }, [localValue, autocompleteText]);

  const { autoCompleteProps = {}, inputProps: extraInputProps = {} } =
    factorValueExtraProps?.text || {};

  const renderInput = (
    typesOfInput: typeof textType,
    factorsType: typeof factorType,
  ): ReactNode => {
    if (typesOfInput === 'autocomplete' && factorsType === 'text') {
      return (
        <Autocomplete
          {...inputProps}
          {...autoCompleteProps}
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
            {...extraInputProps}
            handleInputRef={setInputRef}
            placeholder={texts.valuePlaceholder}
            value={localValue as string}
            onChange={handleChange}
            onBlur={onDeactivate}
            onFocus={onActivate}
            error={localError || error}
            readOnly={readOnly}
            resetMargin
          />
        </S.InputWrapper>
      );
    }
    return (
      <>
        <S.InputWrapper>
          <Input
            {...inputProps}
            {...extraInputProps}
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
            resetMargin
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
