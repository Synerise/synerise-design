import React, {
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from 'react';

import Dropdown from '@synerise/ds-dropdown';
import FormField from '@synerise/ds-form-field';
import Icon, { AngleDownS, Close3M, CloseS } from '@synerise/ds-icon';
import Loader from '@synerise/ds-loader';
import Scrollbar from '@synerise/ds-scrollbar';
import Tooltip from '@synerise/ds-tooltip';
import { getPopupContainer as defaultGetPopupContainer } from '@synerise/ds-utils';

import { Option } from './Option';
import * as S from './Select.styles';
import {
  type FilterOptionFn,
  type RawValueType,
  type SelectOption,
  type SelectProps,
  type SelectValue,
} from './Select.types';
import {
  findOption,
  getOptionsFromChildren,
} from './utils/getOptionsFromChildren';

const DEFAULT_LIST_HEIGHT = 256;

const cx = (...classes: (string | false | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

const toArray = (value: SelectValue): RawValueType[] => {
  if (value === undefined || value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

/** Built-in filter: case-insensitive substring on `optionFilterProp` (or label/value). */
const defaultFilter =
  (optionFilterProp?: string): FilterOptionFn =>
  (input, option) => {
    const haystack =
      optionFilterProp === 'value'
        ? String(option.value)
        : typeof option.label === 'string'
          ? option.label
          : String(option.value);
    return haystack.toLowerCase().includes(input.toLowerCase());
  };

/**
 * DS-native Select (antd-free). Single-select, `mode="multiple"` (chip selector),
 * `mode="tags"` (free-text), in-selector `showSearch` with client `filterOption` /
 * `optionFilterProp` and remote `onSearch` (`filterOption={false}`). Built on
 * `@synerise/ds-dropdown` (floating-ui) + `ds-list-item`. Keyboard-arrow nav /
 * full ARIA are still TODO (phase 3).
 */
const SelectInner = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    onSelect,
    onDeselect,
    onDropdownVisibleChange,
    onSearch,
    mode,
    options,
    children,
    placeholder,
    disabled,
    readOnly,
    loading,
    allowClear,
    showSearch,
    filterOption,
    optionFilterProp,
    optionLabelProp,
    tokenSeparators,
    showArrow = true,
    autoFocus,
    open: openProp,
    defaultOpen,
    getPopupContainer = defaultGetPopupContainer,
    placement,
    dropdownClassName,
    dropdownStyle,
    dropdownMatchSelectWidth = true,
    dropdownRender,
    listHeight = DEFAULT_LIST_HEIGHT,
    notFoundContent = 'No data',
    clearIcon,
    clearTooltip,
    prefixel,
    suffixel,
    grey,
    raw,
    asFormElement,
    selectorStyle,
    size,
    error,
    label,
    description,
    errorText,
    tooltip,
    tooltipConfig,
    className,
    style,
    id,
    rowKey,
  } = props;

  const isTags = mode === 'tags';
  const isMultiple = mode === 'multiple' || isTags;
  const isDisabled = Boolean(disabled || readOnly);
  const hasInput = Boolean(showSearch || isMultiple);

  const [internalValue, setInternalValue] = useState<SelectValue>(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;
  const selectedValues = toArray(currentValue);

  const [internalOpen, setInternalOpen] = useState<boolean>(!!defaultOpen);
  const isControlledOpen = openProp !== undefined;
  const isOpen = isControlledOpen ? !!openProp : internalOpen;

  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const resolvedOptions = useMemo<SelectOption[]>(() => {
    if (options && options.length > 0) {
      return options;
    }
    return getOptionsFromChildren(children);
  }, [options, children]);

  // Client-side filtering. `filterOption={false}` = remote (consumer feeds
  // `options` from `onSearch`), so never filter locally.
  const displayedOptions = useMemo<SelectOption[]>(() => {
    let list = resolvedOptions;
    if (filterOption !== false && searchQuery) {
      const match =
        typeof filterOption === 'function'
          ? filterOption
          : defaultFilter(optionFilterProp);
      list = resolvedOptions.filter((option) => match(searchQuery, option));
    }
    // tags: offer the typed text as a create-able option when it isn't one.
    if (
      isTags &&
      searchQuery &&
      !resolvedOptions.some((option) => String(option.value) === searchQuery) &&
      !selectedValues.some((v) => String(v) === searchQuery)
    ) {
      list = [{ value: searchQuery, label: searchQuery }, ...list];
    }
    return list;
  }, [
    resolvedOptions,
    filterOption,
    optionFilterProp,
    searchQuery,
    isTags,
    selectedValues,
  ]);

  const $size = size === 'large' ? 'large' : 'default';

  const labelFor = (v: RawValueType): ReactNode => {
    const option = findOption(resolvedOptions, v);
    if (option && optionLabelProp === 'value') {
      return option.value;
    }
    return option?.label ?? v;
  };

  const setOpen = (next: boolean): void => {
    if (isDisabled) {
      return;
    }
    if (!isControlledOpen) {
      setInternalOpen(next);
    }
    onDropdownVisibleChange?.(next);
  };

  const commit = (next: SelectValue): void => {
    if (value === undefined) {
      setInternalValue(next);
    }
  };

  const clearQuery = (): void => {
    if (searchQuery) {
      setSearchQuery('');
      onSearch?.('');
    }
  };

  const addValue = (optionValue: RawValueType, option?: SelectOption): void => {
    const next = [...selectedValues, optionValue];
    commit(next);
    onChange?.(
      next as SelectValue,
      next.map((v) => findOption(resolvedOptions, v) ?? { value: v }),
    );
    onSelect?.(optionValue, option);
    clearQuery();
  };

  const removeValue = (optionValue: RawValueType): void => {
    const next = selectedValues.filter((v) => v !== optionValue);
    commit(next);
    onChange?.(
      next as SelectValue,
      next.map((v) => findOption(resolvedOptions, v) ?? { value: v }),
    );
    onDeselect?.(optionValue, findOption(resolvedOptions, optionValue));
  };

  const handleSelect = (option: SelectOption): void => {
    if (option.disabled) {
      return;
    }
    if (isMultiple) {
      if (selectedValues.includes(option.value)) {
        removeValue(option.value);
      } else {
        addValue(option.value, option);
      }
      inputRef.current?.focus();
    } else {
      commit(option.value);
      onChange?.(option.value as SelectValue, option);
      onSelect?.(option.value, option);
      clearQuery();
      setOpen(false);
    }
  };

  const handleClear = (event: React.MouseEvent): void => {
    event.stopPropagation();
    const cleared: SelectValue = isMultiple ? [] : undefined;
    commit(cleared);
    onChange?.(cleared, isMultiple ? [] : undefined);
    clearQuery();
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const next = event.currentTarget.value;
    setSearchQuery(next);
    onSearch?.(next);
    if (!isOpen) {
      setOpen(true);
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const query = searchQuery.trim();
    if (
      isTags &&
      query &&
      (event.key === 'Enter' || (tokenSeparators ?? []).includes(event.key))
    ) {
      event.preventDefault();
      if (selectedValues.some((v) => String(v) === query)) {
        clearQuery();
      } else {
        addValue(query);
      }
      return;
    }
    if (
      event.key === 'Backspace' &&
      !searchQuery &&
      isMultiple &&
      selectedValues.length > 0
    ) {
      removeValue(selectedValues[selectedValues.length - 1]);
    }
  };

  const hasValue = selectedValues.length > 0;
  const showClear = allowClear && hasValue && !isDisabled;
  const placeholderStr =
    typeof placeholder === 'string' ? placeholder : undefined;

  const menu: ReactNode = (
    <S.DropdownWrapper>
      {loading ? (
        <S.Loading className="ds-select-loading">
          <Loader size="M" />
        </S.Loading>
      ) : displayedOptions.length === 0 ? (
        <S.NotFound className="ds-select-empty">{notFoundContent}</S.NotFound>
      ) : (
        <S.ScrollList>
          <Scrollbar
            absolute
            maxHeight={Number(listHeight) || DEFAULT_LIST_HEIGHT}
          >
            <S.Inner>
              {displayedOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <S.OptionItem
                    key={rowKey ? rowKey(option) : option.value}
                    role="option"
                    className={cx(
                      'ds-select-item-option',
                      isSelected && 'ds-select-item-option-selected',
                    )}
                    selected={isSelected}
                    aria-selected={isSelected}
                    data-testid="select-option"
                    title={option.title}
                    text={option.label ?? option.value}
                    disabled={option.disabled}
                    onClick={() => handleSelect(option)}
                  />
                );
              })}
            </S.Inner>
          </Scrollbar>
        </S.ScrollList>
      )}
    </S.DropdownWrapper>
  );

  const searchInputEl = (
    <S.SearchInputEl
      ref={inputRef}
      className="ds-select-search"
      value={searchQuery}
      onChange={handleSearchChange}
      onKeyDown={handleInputKeyDown}
      placeholder={hasValue ? undefined : placeholderStr}
      disabled={isDisabled}
      autoFocus={autoFocus}
      autoComplete="off"
      readOnly={!hasInput}
      id={id}
    />
  );

  let selectorContent: ReactNode;
  if (isMultiple) {
    selectorContent = (
      <S.MultiValueArea>
        {selectedValues.map((v) => (
          <S.Chip key={v} className="ds-select-selection-item">
            <S.ChipLabel className="ds-select-selection-item-label">
              {labelFor(v)}
            </S.ChipLabel>
            <S.ChipRemove
              className="ds-select-selection-item-remove"
              onMouseDown={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                removeValue(v);
              }}
            >
              <Icon component={<CloseS />} size={24} />
            </S.ChipRemove>
          </S.Chip>
        ))}
        {searchInputEl}
      </S.MultiValueArea>
    );
  } else if (showSearch) {
    selectorContent = (
      <>
        {hasValue && !searchQuery && (
          <S.SelectionItem className="ds-select-selection-item">
            {labelFor(selectedValues[0])}
          </S.SelectionItem>
        )}
        {searchInputEl}
      </>
    );
  } else if (hasValue) {
    selectorContent = (
      <S.SelectionItem className="ds-select-selection-item">
        {labelFor(selectedValues[0])}
      </S.SelectionItem>
    );
  } else {
    selectorContent = (
      <S.Placeholder className="ds-select-selection-placeholder">
        {placeholder}
      </S.Placeholder>
    );
  }

  const selector = (
    <S.SelectWrapper
      className="ds-select-wrapper"
      style={style}
      ref={raw ? ref : undefined}
    >
      {!!prefixel && <S.PrefixWrapper>{prefixel}</S.PrefixWrapper>}
      <Dropdown
        open={isOpen}
        onOpenChange={setOpen}
        disabled={isDisabled}
        placement={placement}
        size={dropdownMatchSelectWidth ? 'match-trigger' : 'min-match-trigger'}
        getPopupContainer={getPopupContainer}
        hideOnItemClick={false}
        overlayClassName={cx(
          'ds-select-dropdown',
          'ps__child--consume',
          dropdownClassName,
        )}
        overlayStyle={dropdownStyle}
        asChild
        overlay={dropdownRender ? dropdownRender(menu) : menu}
      >
        <S.Selector
          className={cx(
            'ds-select',
            isMultiple && 'ds-select-multiple',
            isOpen && 'ds-select-open',
            isDisabled && 'ds-select-disabled',
            error && 'error',
          )}
          $size={$size}
          $open={isOpen}
          $error={Boolean(errorText || error)}
          $disabled={isDisabled}
          $readOnly={readOnly}
          $grey={grey}
          $multiple={isMultiple}
          $clearable={showClear}
          $withPrefixel={!!prefixel}
          $withSuffixel={!!suffixel}
          $selectorStyle={selectorStyle}
          role="combobox"
          aria-expanded={isOpen}
          aria-disabled={isDisabled}
        >
          {selectorContent}
          {showArrow && (
            <S.Arrow className="ds-select-arrow" $open={isOpen}>
              <Icon component={<AngleDownS />} />
            </S.Arrow>
          )}
          {showClear && (
            <S.ClearWrapper
              className="ds-select-clear"
              onClick={handleClear}
              data-testid="select-clear"
            >
              <Tooltip title={clearTooltip}>
                <span>
                  {clearIcon ?? <Icon component={<Close3M />} size={24} />}
                </span>
              </Tooltip>
            </S.ClearWrapper>
          )}
        </S.Selector>
      </Dropdown>
      {!!suffixel && <S.SuffixWrapper>{suffixel}</S.SuffixWrapper>}
    </S.SelectWrapper>
  );

  if (raw) {
    return selector;
  }

  const hasBottomMargin = Boolean(asFormElement || errorText || description);

  return (
    <S.SelectContainer
      className={cx('ds-select-container', className)}
      hasBottomMargin={hasBottomMargin}
      ref={ref}
    >
      <FormField
        errorText={errorText}
        description={description}
        label={label}
        tooltip={tooltip}
        tooltipConfig={tooltipConfig}
      >
        {selector}
      </FormField>
    </S.SelectContainer>
  );
});

SelectInner.displayName = 'Select';

type SelectComponent = typeof SelectInner & {
  Option: typeof Option;
};

const Select = SelectInner as SelectComponent;
Select.Option = Option;

export default Select;
