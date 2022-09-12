import * as React from 'react';
import * as S from './InputMultivalue.styles';
import Value from './Elements/Value';
import { Props } from './InputMultivalue.types';

const emptyValue = '';
const InputMultivalue: React.FC<Props> = props => {
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
    onBlurHide,
    ...antdProps
  } = props;
  const showError = error || !!errorText;
  const [value, setValue] = React.useState(emptyValue);

  const [isFocused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = React.useState(-1);
  const [selectedValues, setSelectedValues] = React.useState(values);
  const handleNewValue = (selected: Props['values']): void => {
    onChange && onChange(selected);
    setSelectedValues(selected);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.nativeEvent.code === 'Enter') {
      handleNewValue([...selectedValues, value]);
      setValue(emptyValue);
    }
    if (editingId !== -1) {
      handleNewValue([...selectedValues, value]);
      setValue(emptyValue);
    }
    if (e.key === 'Backspace' && value?.length === 0) {
      handleNewValue(selectedValues.slice(0, -1));
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
        {selectedValues.map((val, index) =>
          editingId === index ? (
            <S.BorderLessInput
              value={value}
              onChange={(e): void => setValue(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
                if (e.key === 'Enter') {
                  const newSelectedValues = selectedValues.map((el, i) => (i === editingId ? value : el));
                  setSelectedValues(newSelectedValues);
                  setValue(emptyValue);
                  setEditingId(-1);
                }
              }}
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
            />
          ) : (
            <Value
              disabled={disabled}
              // eslint-disable-next-line react/no-array-index-key
              key={`${val}-${index}`}
              onRemoveClick={(): void => {
                const filteredValues = selectedValues.slice(0, index).concat(selectedValues.slice(index + 1));
                if (editingId === -1) {
                  handleNewValue(filteredValues);
                }
              }}
              value={val}
              focused={isFocused}
              onEditClick={(): void => {
                setEditingId(index);
                if (inputRef && inputRef.current) {
                  inputRef.current.focus();
                }
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                setValue(val);
              }}
            />
          )
        )}
        {editingId === -1 && (
          <S.BorderLessInput
            value={value}
            onChange={(e): void => {
              return setValue(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            onBlur={(): void => {
              onBlur && onBlur();
              if (inputRef && inputRef.current && inputRef.current !== null) {
                inputRef.current.blur();
              }
              onBlurHide && setValue('');
              setFocused(false);
            }}
            onFocus={onFocus}
            disabled={disabled}
            maxLength={maxLength}
          />
        )}
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
