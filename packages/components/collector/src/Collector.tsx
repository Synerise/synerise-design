import * as React from 'react';
import classNames from 'classnames';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import { CollectorProps } from './Collector.types';
import * as S from './Collector.styles';
import ButtonPanel from './Elements/ButtonPanel/ButtonPanel';
import OptionsDropdown from './Elements/OptionsDropdown/OptionsDropdown';
import { arrayToLowerCase, filterValueSuggestions, isOverflown, scrollWithHorizontalArrow } from './utils';
import Values from './Values/Values';

const DROPDOWN_PADDING = 2 * 8;

const Collector: React.FC<CollectorProps> = ({
  error,
  className,
  description,
  selected,
  suggestions,
  onConfirm,
  onCancel,
  label,
  errorText,
  disabled,
  fixedHeight,
  texts,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mainContentRef = React.useRef<HTMLDivElement>(null);
  const [isFocused, setFocused] = React.useState(false);
  const [showGradient, setShowGradient] = React.useState();

  const [value, setValue] = React.useState('');
  const [selectedValues, setSelectedValues] = React.useState(selected || []);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState(suggestions || []);

  const lowerCaseSelected = React.useMemo(() => arrayToLowerCase(selectedValues), [selectedValues]);
  const onFocusCallback = React.useCallback(
    (e: React.FocusEvent<HTMLDivElement>): void => {
      e.preventDefault();
      if (!!inputRef && !!inputRef?.current) {
        inputRef.current.focus({ preventScroll: true });
      }
      setFocused(true);
    },
    [inputRef]
  );
  const filterSuggestions = React.useCallback(
    (val: string): void => {
      const filtered = filterValueSuggestions(suggestions, selectedValues, val);
      setFilteredSuggestions(filtered);
    },
    [suggestions, selectedValues]
  );

  React.useEffect((): void => {
    if (fixedHeight) {
      setShowGradient(isOverflown(mainContentRef));
    }
  }, [selectedValues, mainContentRef, fixedHeight]);

  React.useEffect((): void => {
    filterSuggestions(value);
  }, [value, selectedValues, filterSuggestions]);

  const selectValue = React.useCallback(
    val => {
      const trimmedValue = val.trim();
      if (!!trimmedValue && lowerCaseSelected.indexOf(trimmedValue.toLowerCase()) === -1) {
        setSelectedValues([...selectedValues, trimmedValue]);
        setFilteredSuggestions(
          filteredSuggestions.filter(
            suggestion =>
              suggestion.toLowerCase() !== trimmedValue.toLowerCase() &&
              !arrayToLowerCase(selectedValues).includes(suggestion.toLowerCase())
          )
        );
        setValue('');
      }
    },
    [selectedValues, filteredSuggestions, lowerCaseSelected]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      selectValue(value);
    }
  };
  const clear = React.useCallback((): void => {
    setSelectedValues([]);
    setValue('');
  }, []);

  const onCancelCallback = React.useCallback((): void => {
    clear();
    onCancel && onCancel();
  }, [clear]);

  const onConfirmCallback = React.useCallback((): void => {
    clear();
    onConfirm(selectedValues);
  }, [selectedValues, clear, onConfirm]);

  const getContainerWidth = React.useCallback(
    (): number => Number(containerRef.current?.offsetWidth) - DROPDOWN_PADDING,
    [containerRef]
  );

  useOnClickOutside(containerRef, (): void => {
    setFocused(false);
  });

  const showError = error || !!errorText;
  return (
    <S.Container
      ref={containerRef}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>): void => {
        focusWithArrowKeys(e, 'ds-search-item', () => {
          inputRef?.current && inputRef.current.focus({ preventScroll: true });
        });
        !value && scrollWithHorizontalArrow(mainContentRef, e);
      }}
    >
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
        error={showError}
        disabled={disabled}
        gradientOverlap={showGradient}
      >
        <S.MainContent wrap={!fixedHeight} ref={mainContentRef}>
          <Values
            values={selectedValues}
            onRemove={(val: React.ReactText): void => {
              const filtered = selectedValues.filter(v => v !== val);
              setSelectedValues(filtered);
            }}
            focused={isFocused}
            disabled={!!disabled}
          />
          <S.Input
            onKeyDown={handleKeyDown}
            ref={inputRef}
            value={value}
            onChange={(e): void => {
              setValue(e.target.value);
              filterSuggestions(e.target.value);
            }}
            disabled={disabled}
            placeholder={selectedValues && selectedValues.length ? undefined : texts?.placeholder}
          />
        </S.MainContent>
        <S.RightSide>
          <ButtonPanel
            onCancel={onCancelCallback}
            onConfirm={onConfirmCallback}
            disabled={!!disabled}
            showCancel={!!value || !!selectedValues?.length}
            texts={texts}
          />
        </S.RightSide>
      </S.CollectorInput>
      <OptionsDropdown
        options={filteredSuggestions}
        value={value}
        visible={isFocused && !disabled && (filteredSuggestions.length > 0 || !!value)}
        onSelect={selectValue}
        onClick={(): void => {
          if (inputRef?.current) {
            inputRef.current.focus();
          }
        }}
        width={getContainerWidth()}
        texts={texts}
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
