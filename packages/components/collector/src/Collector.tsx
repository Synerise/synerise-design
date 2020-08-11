import * as React from 'react';
import classNames from 'classnames';
import { useOnClickOutside } from '@synerise/ds-utils';
import { CollectorProps } from './Collector.types';
import * as S from './Collector.styles';
import ButtonPanel from './Elements/ButtonPanel/ButtonPanel';
import OptionsDropdown from './Elements/OptionsDropdown/OptionsDropdown';

const Collector: React.FC<CollectorProps> = ({
  error,
  className,
  description,
  selected,
  suggestions,
  onConfirm,
  label,
  errorText,
  disabled,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isFocused, setFocused] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [selectedValues, setSelectedValues] = React.useState(selected || []);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState(suggestions || []);

  const onFocusCallback = React.useCallback((): void => {
    if (!!inputRef && !!inputRef?.current) {
      inputRef.current.focus();
    }
    setFocused(true);
  }, [inputRef]);

  useOnClickOutside(containerRef,()=>{
    setFocused(false)
  })

  const filterSuggestions = (val: string): void => {
    const filtered = suggestions.filter(s =>
      String(s)
        .toLowerCase()
        .includes(val.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const selectValue = React.useCallback(
    val => {
      const trimmedValue = val.trim();
      if (!!trimmedValue && selectedValues.indexOf(trimmedValue) === -1) {
        setSelectedValues([...selectedValues, trimmedValue]);
        setFilteredSuggestions(filteredSuggestions.filter(suggestion => suggestion !== val));
        setValue('');
      }
    },
    [selectedValues, filteredSuggestions]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      selectValue(value);
    }
  };
  const clear = React.useCallback(() => {
    setSelectedValues([]);
    setValue('');
  }, []);

  const onCancelCallback = React.useCallback(() => {
    clear();
  }, [clear]);

  const onConfirmCallback = React.useCallback((): void => {
    clear();
    onConfirm(selectedValues);
  }, [selectedValues, clear, onConfirm]);
  const showError = error || !!errorText;
  return (
    <S.Container ref={containerRef}>
      {label && (
        <S.ContentAbove>
          <S.Label>{label}</S.Label>
        </S.ContentAbove>
      )}
      <S.CollectorInput
        className={classNames('ds-collector', { [className as string]: !!className })}
        tabIndex={0}
        focus={isFocused}
        onFocus={onFocusCallback}
        error={error}
        disabled={disabled}
      >
        <S.MainContent>
          {selectedValues.map((val, index) => (
            <S.CollectorValue
              // eslint-disable-next-line react/no-array-index-key
              key={`${val}-${index}`}
              onRemoveClick={(): void => {
                const filtered = selectedValues.filter(v => v !== val);
                setSelectedValues(filtered);
              }}
              value={val}
              focused={isFocused}
              disabled={disabled}
            />
          ))}
          <S.Input
            onKeyDown={handleKeyDown}
            ref={inputRef}
            value={value}
            onChange={(e): void => {
              setValue(e.target.value);
              filterSuggestions(e.target.value);
            }}
            disabled={disabled}
            placeholder={selectedValues && selectedValues.length ? undefined : 'Select'}
          />
        </S.MainContent>
        <S.RightSide>
          <ButtonPanel
            onCancel={onCancelCallback}
            onConfirm={onConfirmCallback}
            disabled={!!disabled}
            showCancel={!!value || !!selectedValues?.length}
          />
        </S.RightSide>
      </S.CollectorInput>
      <OptionsDropdown
        options={filteredSuggestions}
        value={value}
        visible={isFocused && (filteredSuggestions.length > 0 || !!value)}
        onSelect={selectValue}
        onClick={(): void => {
          if (inputRef?.current) {
            inputRef.current.focus();
          }
        }}
      />
      {(showError || description) && (
        <S.ContentBelow>
          {showError && <S.ErrorText>{errorText}</S.ErrorText>}
          {description && <S.Description>{description}</S.Description>}
        </S.ContentBelow>
      )}
    </S.Container>
  );
};
export default Collector;
