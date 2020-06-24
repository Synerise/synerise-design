import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { CloseS } from '@synerise/ds-icon/dist/icons';
import * as S from './InputMultivalue.styles';

export interface Props {
  error?: boolean;
  className?: string;
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  values: React.ReactText[];
  disabled?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
}
const emptyValue = '';
const InputMultivalue: React.FC<Props> = props => {
  const { className, errorText, label, description, values, onBlur, onFocus, disabled, ...antdProps } = props;
  const showError = Boolean(errorText);
  const [value, setValue] = React.useState(emptyValue);

  const [isFocused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedValues, setSelectedValues] = React.useState(values);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setSelectedValues([...selectedValues, value]);
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
          // eslint-disable-next-line react/no-array-index-key
          <S.ValueWrapper disabled={disabled} key={`${val}-${index}`}>
            <S.ValueText focus={isFocused} disabled={disabled}>
              {val}
            </S.ValueText>
            <S.IconWrapper
              onClick={(): void => {
                const filteredValues = selectedValues.filter(v => v !== val);
                setSelectedValues(filteredValues);
              }}
            >
              <Icon className="remove" component={<CloseS />} />
            </S.IconWrapper>
          </S.ValueWrapper>
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
