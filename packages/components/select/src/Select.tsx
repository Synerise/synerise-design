import React, {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import Dropdown from '@synerise/ds-dropdown';
import FormField from '@synerise/ds-form-field';
import Icon, { AngleDownS, Close3M } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { getPopupContainer as defaultGetPopupContainer } from '@synerise/ds-utils';

import { Option } from './Option';
import * as S from './Select.styles';
import {
  type RawValueType,
  type SelectOption,
  type SelectProps,
  type SelectValue,
} from './Select.types';
import { OptionList } from './components/OptionList';
import { SelectorContent } from './components/SelectorContent';
import { useSelectOptions } from './hooks/useSelectOptions';
import { findOption } from './utils/getOptionsFromChildren';
import { DEFAULT_LIST_HEIGHT, cx, toArray } from './utils/helpers';

/**
 * DS-native Select (antd-free). Single-select, `mode="multiple"` (chip selector),
 * `mode="tags"` (free-text), in-selector `showSearch` with client `filterOption` /
 * `optionFilterProp` and remote `onSearch` (`filterOption={false}`). Built on
 * `@synerise/ds-dropdown` (floating-ui) + `ds-list-item`. Full keyboard support
 * (Arrow/Home/End/Enter/Escape/Space, Backspace to drop the last chip) and
 * combobox/listbox ARIA (`aria-activedescendant`) are wired in.
 */
const SelectInner = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    onSelect,
    onDeselect,
    onBlur,
    onFocus,
    onDropdownVisibleChange,
    onSearch,
    onClear,
    onClick,
    onInputKeyDown,
    onKeyDown,
    mode,
    options,
    children,
    placeholder,
    disabled,
    readOnly,
    loading,
    allowClear,
    showSearch,
    searchValue,
    maxLength,
    filterOption,
    optionFilterProp,
    optionLabelProp,
    tokenSeparators,
    showArrow = true,
    suffixIcon,
    tabIndex,
    autoFocus,
    open: openProp,
    defaultOpen,
    getPopupContainer = defaultGetPopupContainer,
    placement,
    dropdownClassName,
    popupClassName,
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

  // antd parity: forward native `data-*` / `aria-*` attributes onto the select root.
  const passthroughAttrs = Object.fromEntries(
    Object.entries(props as Record<string, unknown>).filter(
      ([key]) => key.startsWith('data-') || key.startsWith('aria-'),
    ),
  );

  const [internalValue, setInternalValue] = useState<SelectValue>(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;
  const selectedValues = toArray(currentValue);

  const [internalOpen, setInternalOpen] = useState<boolean>(!!defaultOpen);
  const isControlledOpen = openProp !== undefined;
  const isOpen = isControlledOpen ? !!openProp : internalOpen;

  const [searchQuery, setSearchQuery] = useState('');
  // antd parity: controlled search when `searchValue` is provided.
  const isSearchControlled = searchValue !== undefined;
  const effectiveQuery = isSearchControlled ? searchValue : searchQuery;
  const inputRef = useRef<HTMLInputElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  // Active (keyboard-highlighted) option index into `displayedOptions`.
  const [activeIndex, setActiveIndex] = useState(-1);
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;
  const optionDomId = (index: number): string => `${baseId}-option-${index}`;

  const { resolvedOptions, displayedOptions } = useSelectOptions({
    options,
    children,
    filterOption,
    optionFilterProp,
    effectiveQuery,
    isTags,
    selectedValues,
  });

  const firstEnabledIndex = (): number =>
    displayedOptions.findIndex((option) => !option.disabled);

  const lastEnabledIndex = (): number => {
    for (let i = displayedOptions.length - 1; i >= 0; i -= 1) {
      if (!displayedOptions[i].disabled) {
        return i;
      }
    }
    return -1;
  };

  const moveActive = (direction: 1 | -1): void => {
    const count = displayedOptions.length;
    if (count === 0) {
      return;
    }
    setActiveIndex((current) => {
      let next = current;
      for (let step = 0; step < count; step += 1) {
        next = (next + direction + count) % count;
        if (!displayedOptions[next].disabled) {
          return next;
        }
      }
      return current;
    });
  };

  // On open, highlight the selected (or first enabled) option; drop it on close.
  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1);
      return;
    }
    setActiveIndex((current) => {
      if (
        current >= 0 &&
        current < displayedOptions.length &&
        !displayedOptions[current].disabled
      ) {
        return current;
      }
      const selected = displayedOptions.findIndex(
        (option) => !option.disabled && selectedValues.includes(option.value),
      );
      return selected >= 0 ? selected : firstEnabledIndex();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Re-anchor the highlight to the first match whenever filtering changes the list.
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setActiveIndex(firstEnabledIndex());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveQuery]);

  // Keep the active option scrolled into view during keyboard navigation.
  useEffect(() => {
    if (!isOpen || activeIndex < 0) {
      return;
    }
    const activeEl = document.getElementById(optionDomId(activeIndex));
    // `scrollIntoView` is absent in jsdom; optional-call keeps tests happy.
    activeEl?.scrollIntoView?.({ block: 'nearest' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isOpen]);

  // Select-only mode has no search input, so honour `autoFocus` on the selector
  // itself — this also gives the selector focus so `onBlur` can fire on blur.
  useEffect(() => {
    if (autoFocus && !hasInput) {
      selectorRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (effectiveQuery) {
      if (!isSearchControlled) {
        setSearchQuery('');
      }
      onSearch?.('');
    }
  };

  const addValue = (optionValue: RawValueType, option?: SelectOption): void => {
    const next = [...selectedValues, optionValue];
    commit(next);
    onChange?.(
      next as SelectValue,
      next.map((v) => findOption(resolvedOptions, v) ?? { value: v, key: v }),
    );
    onSelect?.(optionValue, option);
    clearQuery();
  };

  const removeValue = (optionValue: RawValueType): void => {
    const next = selectedValues.filter((v) => v !== optionValue);
    commit(next);
    onChange?.(
      next as SelectValue,
      next.map((v) => findOption(resolvedOptions, v) ?? { value: v, key: v }),
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
    onClear?.();
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const next = event.currentTarget.value;
    if (!isSearchControlled) {
      setSearchQuery(next);
    }
    onSearch?.(next);
    if (!isOpen) {
      setOpen(true);
    }
  };

  const commitActiveOrTag = (): void => {
    const query = effectiveQuery.trim();
    if (isOpen && activeIndex >= 0 && displayedOptions[activeIndex]) {
      handleSelect(displayedOptions[activeIndex]);
    } else if (isTags && query) {
      if (selectedValues.some((v) => String(v) === query)) {
        clearQuery();
      } else {
        addValue(query);
      }
    } else if (!isOpen) {
      setOpen(true);
    }
  };

  // Nav is hand-rolled (not ds-dropdown's): this is a combobox — focus stays on the
  // input via `aria-activedescendant`, whereas ds-dropdown uses roving DOM focus.
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (isDisabled) {
      return;
    }
    const query = effectiveQuery.trim();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setOpen(true);
        } else {
          moveActive(1);
        }
        return;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setOpen(true);
        } else {
          moveActive(-1);
        }
        return;
      case 'Home':
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(firstEnabledIndex());
        }
        return;
      case 'End':
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(lastEnabledIndex());
        }
        return;
      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          setOpen(false);
          clearQuery();
        }
        return;
      case 'Tab':
        if (isOpen) {
          setOpen(false);
        }
        return;
      case 'Enter':
        event.preventDefault();
        commitActiveOrTag();
        return;
      case ' ':
        // Space toggles/commits the select-only combobox; when a text input is
        // present it must type a space instead.
        if (!hasInput) {
          event.preventDefault();
          if (!isOpen) {
            setOpen(true);
          } else if (activeIndex >= 0 && displayedOptions[activeIndex]) {
            handleSelect(displayedOptions[activeIndex]);
          }
        }
        return;
      case 'Backspace':
        if (!effectiveQuery && isMultiple && selectedValues.length > 0) {
          removeValue(selectedValues[selectedValues.length - 1]);
        }
        return;
      default:
        if (isTags && query && (tokenSeparators ?? []).includes(event.key)) {
          event.preventDefault();
          if (selectedValues.some((v) => String(v) === query)) {
            clearQuery();
          } else {
            addValue(query);
          }
        }
    }
  };

  // Fire consumer onFocus/onBlur only when focus enters/leaves the whole select;
  // ignore focus moving between the selector and the inner search input.
  const handleRootFocus = (event: FocusEvent<HTMLDivElement>): void => {
    if (
      event.relatedTarget &&
      event.currentTarget.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    onFocus?.(event);
  };
  const handleRootBlur = (event: FocusEvent<HTMLDivElement>): void => {
    if (
      event.relatedTarget &&
      event.currentTarget.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    onBlur?.(event);
  };

  const hasValue = selectedValues.length > 0;
  const showClear = allowClear && hasValue && !isDisabled;
  const placeholderStr =
    typeof placeholder === 'string' ? placeholder : undefined;

  const menu: ReactNode = (
    <OptionList
      loading={loading}
      options={displayedOptions}
      notFoundContent={notFoundContent}
      listHeight={listHeight}
      isMultiple={isMultiple}
      listboxId={listboxId}
      selectedValues={selectedValues}
      activeIndex={activeIndex}
      rowKey={rowKey}
      optionDomId={optionDomId}
      onOptionActivate={setActiveIndex}
      onOptionSelect={handleSelect}
    />
  );

  const handleSearchKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ): void => {
    onInputKeyDown?.(event);
    onKeyDown?.(event);
    handleKeyDown(event);
  };

  const selectorContent = (
    <SelectorContent
      isMultiple={isMultiple}
      showSearch={showSearch}
      hasValue={hasValue}
      placeholder={placeholder}
      placeholderStr={placeholderStr}
      selectedValues={selectedValues}
      effectiveQuery={effectiveQuery}
      labelFor={labelFor}
      onRemoveValue={removeValue}
      inputRef={inputRef}
      isDisabled={isDisabled}
      hasInput={hasInput}
      autoFocus={autoFocus}
      maxLength={maxLength}
      id={id}
      isOpen={isOpen}
      listboxId={listboxId}
      activeIndex={activeIndex}
      optionDomId={optionDomId}
      onSearchChange={handleSearchChange}
      onSearchKeyDown={handleSearchKeyDown}
    />
  );

  const selector = (
    <S.SelectWrapper
      className="ds-select-wrapper"
      style={style}
      ref={raw ? ref : undefined}
      onClick={onClick}
      onFocus={handleRootFocus}
      onBlur={handleRootBlur}
      {...passthroughAttrs}
    >
      {!!prefixel && <S.PrefixWrapper>{prefixel}</S.PrefixWrapper>}
      <Dropdown
        open={isOpen}
        onOpenChange={setOpen}
        disabled={isDisabled}
        placement={placement}
        size={
          typeof dropdownMatchSelectWidth === 'number'
            ? dropdownMatchSelectWidth
            : dropdownMatchSelectWidth
              ? 'match-trigger'
              : 'min-match-trigger'
        }
        getPopupContainer={
          getPopupContainer as (trigger: HTMLElement) => HTMLElement
        }
        hideOnItemClick={false}
        overlayClassName={cx(
          'ds-select-dropdown',
          'ps__child--consume',
          dropdownClassName,
          popupClassName,
        )}
        overlayStyle={dropdownStyle}
        asChild
        overlay={dropdownRender ? dropdownRender(menu as ReactElement) : menu}
      >
        <S.Selector
          ref={selectorRef}
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
          aria-disabled={isDisabled}
          tabIndex={tabIndex ?? (hasInput || isDisabled ? undefined : 0)}
          onKeyDown={
            hasInput
              ? undefined
              : (event) => {
                  onKeyDown?.(event);
                  handleKeyDown(event);
                }
          }
          role={hasInput ? undefined : 'combobox'}
          aria-expanded={hasInput ? undefined : isOpen}
          aria-haspopup={hasInput ? undefined : 'listbox'}
          aria-controls={!hasInput && isOpen ? listboxId : undefined}
          aria-activedescendant={
            !hasInput && isOpen && activeIndex >= 0
              ? optionDomId(activeIndex)
              : undefined
          }
        >
          {selectorContent}
          {suffixIcon ? (
            <S.Arrow className="ds-select-arrow">{suffixIcon}</S.Arrow>
          ) : (
            showArrow && (
              <S.Arrow className="ds-select-arrow" $open={isOpen}>
                <Icon component={<AngleDownS />} />
              </S.Arrow>
            )
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
