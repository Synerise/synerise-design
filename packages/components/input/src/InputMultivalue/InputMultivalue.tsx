import React from 'react';

import Value from './Elements/Value';
import * as S from './InputMultivalue.styles';
import { type InputMultivalueProps } from './InputMultivalue.types';

const emptyValue = '';
const InputMultivalue = (props: InputMultivalueProps) => {
  const {
    className,
    errorText,
    label,
    description,
    values,
    onChange,
    onBlur,
    onFocus,
    disabled,
    maxLength,
    error,
    ...antdProps
  } = props;
  const showError = error || !!errorText;
  const [value, setValue] = React.useState(emptyValue);

  const [isFocused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedValues, setSelectedValues] = React.useState(values);
  const handleNewValue = (selected: InputMultivalueProps['values']): void => {
    onChange && onChange(selected);
    setSelectedValues(selected);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleNewValue([...selectedValues, value]);
      setValue(emptyValue);
    }
  };
  return (
    <>
      {label && (
        <S.ContentAbove>
          <S.Label>{label}</S.Label>
        </S.ContentAbove>
      )}
      <S.InputWrapper
        tabIndex={0}
        {...antdProps}
        className={className}
        error={showError}
        onFocus={(): void => {
          if (inputRef && inputRef.current && inputRef.current !== null) {
            inputRef.current.focus();
          }
          setFocused(true);
        }}
        focus={isFocused && !disabled}
        disabled={disabled}
      >
        {selectedValues.map((val, index) => (
          <Value
            disabled={disabled}
            key={`${val}-${index}`}
            onRemoveClick={(): void => {
              const filteredItems = [...selectedValues];
              filteredItems.splice(index, 1);
              handleNewValue(filteredItems);
            }}
            value={val}
            focused={isFocused}
          />
        ))}
        <S.BorderLessInput
          value={value}
          onChange={(e): void => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          onBlur={(): void => {
            onBlur && onBlur();
            if (inputRef && inputRef.current && inputRef.current !== null) {
              inputRef.current.blur();
            }
            setFocused(false);
          }}
          onFocus={onFocus}
          disabled={disabled}
          maxLength={maxLength}
          data-testid="input-multivalue"
        />
      </S.InputWrapper>
      {(showError || description) && (
        <S.ContentBelow>
          {showError && <S.ErrorText>{errorText}</S.ErrorText>}
          {description && <S.Description>{description}</S.Description>}
        </S.ContentBelow>
      )}
    </>
  );
};

export default InputMultivalue;
