import * as React from 'react';
import classNames from 'classnames';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import { CollectorProps, CollectorValue } from './Collector.types';
import * as S from './Collector.styles';
import ButtonPanel from './Elements/ButtonPanel/ButtonPanel';
import OptionsDropdown from './Elements/OptionsDropdown/OptionsDropdown';
import { arrayToLowerCase, filterValueSuggestions, isOverflown, scrollWithHorizontalArrow } from './utils';
import Values from './Elements/Values/Values';

const DROPDOWN_PADDING = 2 * 8;

const Collector: React.FC<CollectorProps> = ({
  allowCustomValue,
  allowMultipleValues,
  error,
  className,
  description,
  selected,
  suggestions,
  showNavigationHints,
  onConfirm,
  onCancel,
  label,
  errorText,
  disabled,
  fixedHeight,
  texts,
  lookupConfig,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mainContentRef = React.useRef<HTMLDivElement>(null);
  const [isFocused, setFocused] = React.useState<boolean>(false);
  const [showGradient, setShowGradient] = React.useState<boolean>(false);
  const [scrollLeft, setScrollLeft] = React.useState<number>(0);
  const [value, setValue] = React.useState<string>('');
  const [selectedValues, setSelectedValues] = React.useState<CollectorValue[]>(
    selected && allowMultipleValues ? selected : []
  );
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<CollectorValue[]>(suggestions || []);

  const filterLookupKey = lookupConfig?.filter || 'text';
  const showLookupConfig = lookupConfig?.show || 'text';
  const lowerCaseSelected = React.useMemo(() => arrayToLowerCase(selectedValues, filterLookupKey), [selectedValues]);
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
      const filtered = filterValueSuggestions(suggestions, selectedValues, val, filterLookupKey);
      setFilteredSuggestions(filtered);
    },
    [suggestions, selectedValues]
  );
  React.useEffect(() => {
    setSelectedValues(selected && allowMultipleValues ? selected : []);
    setFilteredSuggestions(suggestions || []);
    setValue('');
  }, [allowMultipleValues, allowCustomValue, selected, suggestions]);

  React.useEffect((): void => {
    if (fixedHeight) {
      setShowGradient(isOverflown(mainContentRef));
    } else {
      setShowGradient(false);
    }
  }, [selectedValues, mainContentRef, fixedHeight]);

  React.useEffect((): void => {
    filterSuggestions(value);
  }, [value, selectedValues, filterSuggestions]);

  const selectValue = React.useCallback(
    val => {
      const trimmedValue = val.trim();
      if (allowMultipleValues && !!trimmedValue && lowerCaseSelected.indexOf(trimmedValue.toLowerCase()) === -1) {
        setSelectedValues([...selectedValues, trimmedValue]);
        setFilteredSuggestions(
          filteredSuggestions.filter(
            suggestion =>
              suggestion.toLowerCase() !== trimmedValue.toLowerCase() &&
              !arrayToLowerCase(selectedValues, filterLookupKey).includes(suggestion.toLowerCase())
          )
        );
        setValue('');
        return;
      }
      if (!allowMultipleValues) {
        setValue(val);
      }
    },
    [selectedValues, filteredSuggestions, lowerCaseSelected, allowMultipleValues]
  );

  const clear = React.useCallback((): void => {
    setSelectedValues([]);
    setValue('');
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      const suggestionsIncludesCurrentValue = filteredSuggestions.some(
        suggestion => suggestion.trim().toLowerCase() === value.trim().toLowerCase()
      );
      if (allowMultipleValues && (allowCustomValue || suggestionsIncludesCurrentValue)) {
        selectValue(value);
        return;
      }
      if (!allowMultipleValues) {
        if (allowCustomValue || suggestionsIncludesCurrentValue) {
          onConfirm && onConfirm([value]);
          clear();
        }
      }
    }
    if (allowMultipleValues && e.key === 'Backspace' && !value && !!selectedValues?.length) {
      const withoutLastElement = selectedValues.splice(0, selectedValues.length - 1);
      setSelectedValues(withoutLastElement);
    }
  };

  const onCancelCallback = React.useCallback((): void => {
    onCancel && onCancel();
    clear();
  }, [onCancel, clear]);

  const onConfirmCallback = React.useCallback((): void => {
    if (allowMultipleValues) {
      onConfirm && onConfirm(selectedValues);
      clear();
      return;
    }
    const suggestionsIncludesCurrentValue = filteredSuggestions.some(
      suggestion => suggestion.trim().toLowerCase() === value.trim().toLowerCase()
    );
    if (allowCustomValue || suggestionsIncludesCurrentValue) {
      onConfirm && onConfirm([value]);
      clear();
    }
  }, [selectedValues, clear, onConfirm, value, filteredSuggestions, allowMultipleValues, allowCustomValue]);

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
      >
        <S.MainContent
          wrap={!fixedHeight}
          onScroll={({ currentTarget }: React.SyntheticEvent): void => {
            if (fixedHeight) {
              setScrollLeft(currentTarget.scrollLeft);
            }
          }}
          hasValues={!!selectedValues?.length}
          ref={mainContentRef}
          gradientOverlap={showGradient && scrollLeft > 0}
          focus={isFocused}
        >
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
            hasValues={!!selectedValues?.length}
          />
        </S.MainContent>
        <S.RightSide gradientOverlap={showGradient && !value} focus={isFocused}>
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
        visible={
          isFocused &&
          !disabled &&
          (filteredSuggestions.length > 0 || (!!value && allowMultipleValues && allowCustomValue))
        }
        onSelect={selectValue}
        onClick={(): void => {
          if (inputRef?.current) {
            inputRef.current.focus();
          }
        }}
        showAddButton={allowCustomValue && allowMultipleValues}
        showNavigationHints={showNavigationHints}
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
