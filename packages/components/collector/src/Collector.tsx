import * as React from 'react';
import classNames from 'classnames';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import { CollectorProps, CollectorValue } from './Collector.types';
import * as S from './Collector.styles';
import ButtonPanel from './Elements/ButtonPanel/ButtonPanel';
import OptionsDropdown from './Elements/OptionsDropdown/OptionsDropdown';
import { filterValueSuggestions, isOverflown, scrollWithHorizontalArrow } from './utils';
import Values from './Elements/Values/Values';

const DROPDOWN_PADDING = 2 * 8;
const COLLECTOR_CLASSNAME = 'ds-collector';

const Collector: React.FC<CollectorProps> = ({
  allowCustomValue,
  allowMultipleValues,
  addButtonProps,
  cancelButtonProps,
  keepSearchQueryOnSelect,
  error,
  className,
  description,
  enableCustomFilteringSuggestions,
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
  onItemAdd,
  onItemDeselect,
  onItemSelect,
  dropdownContent,
  disableButtonPanel,
  disableSearch,
  dropdownItemHeight,
  searchValue,
  renderItem,
  onSearchValueChange,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mainContentRef = React.useRef<HTMLDivElement>(null);
  const [isFocused, setFocused] = React.useState<boolean>(false);
  const [showGradient, setShowGradient] = React.useState<boolean>(false);
  const [scrollLeft, setScrollLeft] = React.useState<number>(0);
  const [value, setValue] = React.useState<string>(searchValue || '');
  const [selectedValues, setSelectedValues] = React.useState<CollectorValue[]>(
    selected && allowMultipleValues ? selected : []
  );
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<CollectorValue[]>(suggestions || []);

  const filterLookupKey = React.useMemo(() => lookupConfig?.filter || 'text', [lookupConfig]);
  const displayLookupKey = React.useMemo(() => lookupConfig?.display || 'text', [lookupConfig]);

  const onFocusCallback = React.useCallback(
    (e: React.FocusEvent<HTMLDivElement>): void => {
      e.preventDefault();
      if (!e.target.classList.contains(COLLECTOR_CLASSNAME)) {
        if (!!inputRef && !!inputRef?.current) {
          inputRef.current.focus({ preventScroll: true });
        }
        setFocused(true);
      }
    },
    [inputRef]
  );
  const filterSuggestions = React.useCallback(
    (val: string): void => {
      const filtered = filterValueSuggestions(suggestions, selectedValues, val, filterLookupKey);
      setFilteredSuggestions(filtered);
    },
    [suggestions, selectedValues, filterLookupKey]
  );
  React.useEffect(() => {
    setSelectedValues(selected && allowMultipleValues ? selected : []);
    setFilteredSuggestions(suggestions || []);
    !searchValue && allowMultipleValues && setValue('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowMultipleValues, allowCustomValue, selected, suggestions]);

  React.useEffect(() => {
    if (searchValue !== undefined && searchValue !== null) {
      setValue(searchValue as string);
    }
  }, [searchValue]);

  React.useEffect((): void => {
    if (fixedHeight) {
      setShowGradient(isOverflown(mainContentRef));
    } else {
      setShowGradient(false);
    }
  }, [selectedValues, mainContentRef, fixedHeight]);

  React.useEffect((): void => {
    if (!enableCustomFilteringSuggestions) filterSuggestions(value);
  }, [value, selectedValues, filterSuggestions, enableCustomFilteringSuggestions]);

  const clear = React.useCallback((): void => {
    setSelectedValues([]);
    setValue('');
    setFocused(false);
    inputRef?.current && inputRef.current.blur();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!enableCustomFilteringSuggestions && e.key === 'Enter') {
      const suggestionsIncludesCurrentValue = filteredSuggestions.some(
        suggestion => suggestion[filterLookupKey].trim().toLowerCase() === value.trim().toLowerCase()
      );
      if (allowMultipleValues && (allowCustomValue || suggestionsIncludesCurrentValue)) {
        const newValue = onItemAdd && onItemAdd(value);
        newValue && onItemSelect(newValue);
        return;
      }
      if (!allowMultipleValues) {
        if (allowCustomValue || suggestionsIncludesCurrentValue) {
          const newValue = onItemAdd && onItemAdd(value);
          if (newValue) {
            onConfirm && onConfirm([newValue]);
          }
          !keepSearchQueryOnSelect && clear();
        }
      }
    }
    if (allowMultipleValues && e.key === 'Backspace' && !value && !!selectedValues?.length) {
      const lastElement = selected.pop();
      if (lastElement && onItemDeselect) {
        onItemDeselect(lastElement);
      }
    }
  };

  const onCancelCallback = React.useCallback((): void => {
    clear();
    onCancel && onCancel();
  }, [onCancel, clear]);

  const onConfirmCallback = React.useCallback((): void => {
    if (!value?.trim()) {
      return;
    }
    if (allowMultipleValues) {
      onConfirm && onConfirm(selectedValues);
      clear();
      return;
    }
    const suggestionsIncludesCurrentValue = filteredSuggestions.some(
      suggestion => suggestion[filterLookupKey]?.trim()?.toLowerCase() === value.trim().toLowerCase()
    );
    if (allowCustomValue || suggestionsIncludesCurrentValue) {
      const newValue = onItemAdd && onItemAdd(value);
      newValue && onConfirm && onConfirm([newValue]);
      clear();
    }
  }, [
    selectedValues,
    clear,
    onConfirm,
    value,
    filteredSuggestions,
    allowMultipleValues,
    allowCustomValue,
    onItemAdd,
    filterLookupKey,
  ]);

  const getContainerWidth = React.useCallback(
    (): number => Number(containerRef.current?.offsetWidth) - DROPDOWN_PADDING,
    [containerRef]
  );

  const handleDropdownClick = React.useCallback((): void => {
    if (inputRef?.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [inputRef]);

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
        className={classNames(COLLECTOR_CLASSNAME, { [className as string]: !!className })}
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
            onDeselect={onItemDeselect}
            focused={isFocused}
            disabled={!!disabled}
            displayLookupKey={displayLookupKey}
          />
          <S.Input
            onKeyDown={handleKeyDown}
            ref={inputRef}
            value={value}
            onChange={
              !disableSearch
                ? (e): void => {
                    onSearchValueChange && onSearchValueChange(e.target.value);
                    setValue(e.target.value);
                    if (!enableCustomFilteringSuggestions) filterSuggestions(e.target.value);
                  }
                : undefined
            }
            disabled={disabled}
            transparent={!!disableSearch}
            hidden={!!disableSearch && !!selectedValues.length}
            placeholder={selectedValues && selectedValues.length ? undefined : texts?.placeholder}
            hasValues={!!selectedValues?.length}
          />
        </S.MainContent>
        {!disableButtonPanel && (
          <S.RightSide gradientOverlap={showGradient && !value} focus={isFocused}>
            <ButtonPanel
              onCancel={onCancelCallback}
              onConfirm={onConfirmCallback}
              disabled={!!disabled}
              showCancel={!!value || !!selectedValues?.length}
              texts={texts}
              addButtonProps={addButtonProps}
              cancelButtonProps={cancelButtonProps}
            />
          </S.RightSide>
        )}
      </S.CollectorInput>
      <OptionsDropdown
        options={filteredSuggestions}
        onItemAdd={onItemAdd}
        lookupKey={displayLookupKey}
        dropdownItemHeight={dropdownItemHeight}
        value={value}
        visible={
          isFocused &&
          !disabled &&
          (filteredSuggestions.length > 0 || (!!value && allowMultipleValues && allowCustomValue))
        }
        onSelect={(item): void => {
          onItemSelect && onItemSelect(item);
          !keepSearchQueryOnSelect && item[filterLookupKey] && setValue(item[filterLookupKey]);
        }}
        onClick={handleDropdownClick}
        renderItem={renderItem}
        showAddButton={allowCustomValue && allowMultipleValues}
        showNavigationHints={showNavigationHints}
        width={getContainerWidth()}
        customContent={dropdownContent}
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
