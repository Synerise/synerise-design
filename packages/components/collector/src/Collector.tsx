import classNames from 'classnames';
import React, {
  type ChangeEvent,
  type ClipboardEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FormattedMessage } from 'react-intl';

import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';

import * as S from './Collector.styles';
import { type CollectorProps, type CollectorValue } from './Collector.types';
import ButtonPanel from './Elements/ButtonPanel/ButtonPanel';
import NavigationHint from './Elements/NavigationHint/NavigationHint';
import OptionsDropdown from './Elements/OptionsDropdown/OptionsDropdown';
import Values from './Elements/Values/Values';
import { useTranslations } from './hooks/useTranslations';
import {
  filterOutNullishArrayItems,
  filterValueSuggestions,
  isOverflown,
  scrollWithHorizontalArrow,
} from './utils';

const DROPDOWN_PADDING = 2 * 8;
const COLLECTOR_CLASSNAME = 'ds-collector';
const DEFAULT_VALUES_SEPARATOR = ';';

const Collector = ({
  allowCustomValue,
  allowMultipleValues,
  addButtonProps,
  buttonPanelPrefix,
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
  texts: defaultTexts,
  lookupConfig,
  onItemAdd,
  onItemDeselect,
  onItemSelect,
  onMultipleItemsSelect,
  dropdownContent,
  disableButtonPanel,
  disableSearch,
  dropdownItemHeight,
  searchValue,
  renderItem,
  onSearchValueChange,
  allowPaste,
  showCount,
  listHeader,
  hideDropdownOnClickOutside = true,
  valuesSeparator = DEFAULT_VALUES_SEPARATOR,
}: CollectorProps) => {
  const texts = useTranslations(defaultTexts);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [isFocused, setFocused] = useState<boolean>(false);
  const [isAddActive, setIsAddActive] = useState<boolean>(false);
  const [showGradient, setShowGradient] = useState<boolean>(false);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [value, setValue] = useState<string>(searchValue || '');
  const [selectedValues, setSelectedValues] = useState<CollectorValue[]>(
    selected && allowMultipleValues ? selected : [],
  );
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    CollectorValue[]
  >(suggestions || []);

  const filterLookupKey = useMemo(
    () => lookupConfig?.filter || 'text',
    [lookupConfig],
  );
  const displayLookupKey = useMemo(
    () => lookupConfig?.display || 'text',
    [lookupConfig],
  );

  const focusInput = useCallback(() => {
    setTimeout(() => {
      if (inputRef?.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, 0);
  }, [inputRef]);

  const suggestionsIncludesItem = useCallback(
    (item: string) =>
      filteredSuggestions.some(
        (suggestion) =>
          suggestion[filterLookupKey]?.trim()?.toLowerCase() ===
          item.trim().toLowerCase(),
      ),
    [filterLookupKey, filteredSuggestions],
  );

  const createItem = useCallback(
    (text: string) => {
      const suggestionsIncludesCurrentValue = suggestionsIncludesItem(text);

      if (allowCustomValue || suggestionsIncludesCurrentValue) {
        return onItemAdd && onItemAdd(text);
      }
      return null;
    },
    [allowCustomValue, onItemAdd, suggestionsIncludesItem],
  );

  const onFocusCallback = useCallback(
    (event: FocusEvent<HTMLDivElement> & MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.target.classList.contains(COLLECTOR_CLASSNAME)) {
        focusInput();
      } else {
        setFocused(true);
      }
    },
    [focusInput],
  );
  const filterSuggestions = useCallback(
    (val: string) => {
      const filtered = filterValueSuggestions(
        suggestions,
        selectedValues,
        val,
        filterLookupKey,
      );
      setFilteredSuggestions(filtered);
    },
    [suggestions, selectedValues, filterLookupKey],
  );

  const canCreateItemFromValue = useCallback(() => {
    if (!value) {
      return false;
    }
    const item = createItem(value);
    if (item) {
      return true;
    }
    return false;
  }, [createItem, value]);

  useEffect(() => {
    enableCustomFilteringSuggestions && setFilteredSuggestions(suggestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions]);

  useEffect(() => {
    setSelectedValues(selected && allowMultipleValues ? selected : []);
    if (!enableCustomFilteringSuggestions) {
      setFilteredSuggestions([]);
    }
  }, [
    allowMultipleValues,
    allowCustomValue,
    selected,
    enableCustomFilteringSuggestions,
  ]);

  useEffect(() => {
    if (!searchValue && allowMultipleValues) {
      setValue('');
      return;
    }
    if (searchValue !== undefined && searchValue !== null) {
      setValue(searchValue as string);
    }
  }, [allowMultipleValues, searchValue]);

  useEffect(() => {
    if (fixedHeight) {
      setShowGradient(isOverflown(mainContentRef));
    } else {
      setShowGradient(false);
    }
  }, [selectedValues, mainContentRef, fixedHeight]);

  useEffect(() => {
    if (!enableCustomFilteringSuggestions) {
      filterSuggestions(value);
    }
  }, [
    value,
    selectedValues,
    filterSuggestions,
    enableCustomFilteringSuggestions,
  ]);

  useEffect(() => {
    setIsAddActive(Boolean(selected.length) || canCreateItemFromValue());
  }, [canCreateItemFromValue, selected]);

  const clear = useCallback(() => {
    setSelectedValues([]);
    setValue('');
    setFocused(false);
    inputRef.current && inputRef.current.blur();
  }, []);

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    if (allowMultipleValues && onItemAdd) {
      const pastedText = event.clipboardData.getData('text');
      if (pastedText.includes(valuesSeparator)) {
        const pastedItems = allowMultipleValues
          ? pastedText.split(valuesSeparator)
          : [pastedText];
        const newValues = filterOutNullishArrayItems(
          pastedItems.map(createItem),
        );

        if (newValues.length) {
          onMultipleItemsSelect && onMultipleItemsSelect(newValues);
        }
      }
    }
  };

  const addItem = () => {
    if (!value.trim()) {
      return;
    }
    const newValue = createItem(value);
    if (!newValue) {
      setValue('');
      return;
    }
    if (allowMultipleValues) {
      onItemSelect(newValue);
      setValue('');
    } else if (onConfirm) {
      onConfirm([newValue]);
      !keepSearchQueryOnSelect && clear();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      allowMultipleValues &&
      event.key === 'Backspace' &&
      !value &&
      !!selectedValues?.length
    ) {
      const lastElement = selected.pop();
      if (lastElement && onItemDeselect) {
        onItemDeselect(lastElement);
      }
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (value) {
        addItem();
      } else if (selectedValues.length) {
        onConfirmCallback();
      }
      return;
    }
    if (allowCustomValue && event.key === valuesSeparator) {
      event.preventDefault();
      if (value.trim()) {
        addItem();
      }
    }
  };

  const onCancelCallback = useCallback(() => {
    clear();
    onCancel && onCancel();
  }, [onCancel, clear]);

  const onConfirmCallback = useCallback(() => {
    if (!onConfirm) {
      return;
    }
    if (allowMultipleValues) {
      const createdItem = value && createItem(value);
      const finalItems = createdItem
        ? [...selectedValues, createdItem]
        : selectedValues;
      onConfirm(finalItems);
      clear();
      return;
    }
    const suggestionsIncludesCurrentValue = suggestionsIncludesItem(value);

    if (allowCustomValue || suggestionsIncludesCurrentValue) {
      const newValue = onItemAdd && onItemAdd(value);
      newValue && onConfirm([newValue]);
      clear();
    }
  }, [
    allowMultipleValues,
    suggestionsIncludesItem,
    value,
    allowCustomValue,
    createItem,
    selectedValues,
    onConfirm,
    clear,
    onItemAdd,
  ]);

  const getContainerWidth = useCallback(
    () => Number(containerRef.current?.offsetWidth) - DROPDOWN_PADDING,
    [containerRef],
  );

  const handleDropdownClick = () => {
    focusInput();
  };

  const handleDropdownSelect = (item: CollectorValue) => {
    onItemSelect && onItemSelect(item);
    if (
      !allowMultipleValues &&
      !keepSearchQueryOnSelect &&
      item[filterLookupKey]
    ) {
      setValue(item[filterLookupKey]);
    } else {
      clear();
    }
    focusInput();
  };

  const handleInput = disableSearch
    ? undefined
    : (event: ChangeEvent<HTMLInputElement>) => {
        const isPasteEvent =
          'inputType' in event.nativeEvent &&
          event.nativeEvent.inputType === 'insertFromPaste' &&
          allowMultipleValues &&
          allowPaste &&
          event.target.value.includes(valuesSeparator);

        if (!isPasteEvent) {
          onSearchValueChange && onSearchValueChange(event.target.value);
          setValue(event.target.value);
          if (!enableCustomFilteringSuggestions) {
            filterSuggestions(event.target.value);
          }
        }
      };

  useOnClickOutside(containerRef, () => {
    hideDropdownOnClickOutside && setFocused(false);
  });
  const showError = error || !!errorText;

  const renderCountLabel = () => {
    const total = selectedValues.length;
    const counterLabel =
      total === 1 ? (
        <FormattedMessage id="DS.COLLECTOR.ITEM" defaultMessage="Item" />
      ) : (
        <FormattedMessage id="DS.COLLECTOR.ITEMS" defaultMessage="Items" />
      );
    return (
      <S.Counter>
        {total} {counterLabel}
      </S.Counter>
    );
  };

  const valuesContainer = (
    <S.MainContent
      fixedHeight={fixedHeight}
      onScroll={({ currentTarget }: SyntheticEvent) => {
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
      <S.SearchWrapper>
        <S.Input
          onPaste={handlePaste}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={value}
          onInput={handleInput}
          disabled={disabled}
          transparent={!!disableSearch}
          hidden={!!disableSearch && !!selectedValues.length}
          placeholder={
            selectedValues && selectedValues.length
              ? undefined
              : texts?.placeholder
          }
          hasValues={!!selectedValues?.length}
          data-testid="ds-collector-input"
        />
      </S.SearchWrapper>
    </S.MainContent>
  );

  const innerContent = fixedHeight ? (
    valuesContainer
  ) : (
    <S.Scrollbar absolute maxHeight={160}>
      {valuesContainer}
    </S.Scrollbar>
  );

  return (
    <S.Container
      ref={containerRef}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        focusWithArrowKeys(event, 'ds-list-item', focusInput);
        !value && scrollWithHorizontalArrow(mainContentRef, event);
      }}
    >
      {(label || showCount) && (
        <S.ContentAbove>
          {label && <S.Label>{label}</S.Label>}
          {showCount && renderCountLabel()}
        </S.ContentAbove>
      )}
      <S.CollectorInput
        className={classNames(COLLECTOR_CLASSNAME, {
          [className as string]: !!className,
        })}
        tabIndex={0}
        focus={isFocused}
        onFocus={onFocusCallback}
        onClick={onFocusCallback}
        error={showError}
        disabled={disabled}
      >
        {innerContent}

        {!disableButtonPanel && (
          <S.RightSide
            gradientOverlap={showGradient && !value}
            focus={isFocused}
            onClick={(event) => event.stopPropagation()}
          >
            <ButtonPanel
              onCancel={onCancelCallback}
              onConfirm={onConfirmCallback}
              disabled={!!disabled}
              showCancel={!!value || !!selectedValues?.length}
              texts={texts}
              addButtonProps={{ disabled: !isAddActive, ...addButtonProps }}
              cancelButtonProps={cancelButtonProps}
              buttonPanelPrefix={buttonPanelPrefix}
            />
          </S.RightSide>
        )}
      </S.CollectorInput>
      <OptionsDropdown
        options={filteredSuggestions}
        onItemAdd={addItem}
        lookupKey={displayLookupKey}
        dropdownItemHeight={dropdownItemHeight}
        value={value}
        visible={
          isFocused &&
          !disabled &&
          (filteredSuggestions.length > 0 ||
            (!!value && allowMultipleValues && allowCustomValue))
        }
        onSelect={handleDropdownSelect}
        onClick={handleDropdownClick}
        renderItem={renderItem}
        showAddButton={allowCustomValue && allowMultipleValues}
        showNavigationHints={showNavigationHints}
        width={getContainerWidth()}
        customContent={dropdownContent}
        texts={texts}
        listHeader={listHeader}
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

Collector.Container = S.Container;
Collector.ContentBelow = S.ContentBelow;
Collector.Description = S.Description;
Collector.ErrorText = S.ErrorText;
Collector.CollectorInput = S.CollectorInput;
Collector.RightSide = S.RightSide;
Collector.ContentAbove = S.ContentAbove;
Collector.MainContent = S.MainContent;
Collector.Input = S.Input;
Collector.Counter = S.Counter;
Collector.Label = S.Label;

Collector.Values = Values;
Collector.ButtonPanel = ButtonPanel;
Collector.OptionsDropdown = OptionsDropdown;
Collector.NavigationHint = NavigationHint;

export default Collector;
