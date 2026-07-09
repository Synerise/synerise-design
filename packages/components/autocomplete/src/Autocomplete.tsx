import React, {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Dropdown from '@synerise/ds-dropdown';
import FormField from '@synerise/ds-form-field';
import { SIZER_STYLE, useAutosizeWidth } from '@synerise/ds-input';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './Autocomplete.styles';
import {
  type AutocompleteInputHandle,
  type AutocompleteOption,
  type AutocompleteProps,
} from './Autocomplete.types';
import AutocompleteDropdown from './AutocompleteDropdown/AutocompleteDropdown';
import { Option } from './Option';
import { getIconsWidth } from './utils/getIconsWidth';
import { getOptionsFromChildren } from './utils/getOptionsFromChildren';

const AUTOSIZE_EXTRA_WIDTH = 27;

const Autocomplete = ({
  className,
  style,
  label,
  description,
  errorText,
  disabled,
  error,
  handleInputRef,
  getPopupContainer,
  autoResize,
  readOnly,
  tooltip,
  tooltipConfig,
  icon1,
  icon1Tooltip,
  icon2,
  icon2Tooltip,
  options,
  children,
  value,
  defaultValue,
  placeholder,
  allowClear,
  autoFocus,
  maxLength,
  id,
  defaultActiveFirstOption = true,
  notFoundContent,
  placement = 'bottomLeft',
  open,
  defaultOpen,
  onDropdownVisibleChange,
  onChange,
  onSearch,
  filterOption,
  onSelect,
  onFocus,
  onBlur,
}: AutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const externalHandleRef = useRef<AutocompleteInputHandle | null>(null);
  // After selecting an option we refocus the input for keyboard continuity, but
  // that focus must not re-open the dropdown — this guards that one focus event.
  const skipOpenOnFocusRef = useRef(false);

  const isDisabled = !!(readOnly || disabled);
  const isControlledOpen = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(!!defaultOpen);
  const isOpen = isControlledOpen ? !!open : internalOpen;

  // Track the input text ourselves so autosize, filterOption and allowClear work in
  // uncontrolled mode (`defaultValue`, no `value`) as well as controlled — each of those
  // reads `currentValue`, which mirrors `value` when controlled and the DOM value otherwise.
  const [internalValue, setInternalValue] = useState<string>(
    typeof defaultValue === 'string' ? defaultValue : '',
  );
  const currentValue = value !== undefined ? value : internalValue;

  const resolvedOptions = useMemo<AutocompleteOption[]>(() => {
    if (options && options.length > 0) {
      return options;
    }
    return getOptionsFromChildren(children);
  }, [options, children]);

  // Optional client-side filtering (antd-parity). Off by default so consumers
  // that filter server-side via onSearch are unchanged; when `filterOption` is
  // set, narrow the rendered options by the current input value.
  const displayedOptions = useMemo<AutocompleteOption[]>(() => {
    const query = currentValue;
    if (!filterOption || !query) {
      return resolvedOptions;
    }
    const match =
      typeof filterOption === 'function'
        ? filterOption
        : (input: string, option: AutocompleteOption): boolean => {
            const optionLabel =
              typeof option.label === 'string' ? option.label : '';
            return `${option.value} ${optionLabel}`
              .toLowerCase()
              .includes(input.toLowerCase());
          };
    return resolvedOptions.filter((option) => match(query, option));
  }, [filterOption, resolvedOptions, currentValue]);

  // Keyboard navigation + selection are handled by ds-dropdown's built-in
  // floating-ui list navigation (it focuses each ListItem; the ListItem selects
  // on Enter/click). We deliberately do NOT keep a second manual highlight here
  // — that produced a duplicate (light-blue) active row offset from the real
  // focused one.

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (isDisabled) {
        return;
      }
      if (!isControlledOpen) {
        setInternalOpen(nextOpen);
      }
      onDropdownVisibleChange && onDropdownVisibleChange(nextOpen);
    },
    [isControlledOpen, isDisabled, onDropdownVisibleChange],
  );

  const handleSelect = useCallback(
    (selectedValue: string) => {
      // In uncontrolled mode reflect the choice into our state + the DOM input
      // (there is no parent `value` to write it back).
      if (value === undefined) {
        setInternalValue(selectedValue);
        if (inputRef.current) {
          inputRef.current.value = selectedValue;
        }
      }
      onSelect && onSelect(selectedValue);
      onChange && onChange(selectedValue);
      setOpen(false);
      skipOpenOnFocusRef.current = true;
      inputRef.current && inputRef.current.focus();
    },
    [onChange, onSelect, setOpen, value],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value;
      if (value === undefined) {
        setInternalValue(nextValue);
      }
      onSearch && onSearch(nextValue);
      onChange && onChange(nextValue);
      if (!isOpen) {
        setOpen(true);
      }
    },
    [isOpen, onChange, onSearch, setOpen, value],
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      onFocus && onFocus(event);
      if (skipOpenOnFocusRef.current) {
        skipOpenOnFocusRef.current = false;
        return;
      }
      setOpen(true);
    },
    [onFocus, setOpen],
  );

  // Clicking the input always opens (never toggles) — covers re-clicking an
  // already-focused input after it was closed via Escape or a selection, where
  // no focus event fires to re-open it.
  const handleClick = useCallback(() => {
    if (!isOpen) {
      setOpen(true);
    }
  }, [isOpen, setOpen]);

  const handleClear = useCallback(() => {
    if (value === undefined) {
      setInternalValue('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
    onSearch && onSearch('');
    onChange && onChange('');
    inputRef.current && inputRef.current.focus();
  }, [onChange, onSearch, value]);

  // antd parity for `defaultActiveFirstOption` (default true): pressing Enter while the
  // dropdown is open — and before arrow-navigating into it — selects the first enabled
  // option. Once the user arrows down, focus moves onto the ListItem (ds-dropdown's
  // floating-ui list navigation), so this input-level handler no longer fires and the
  // focused item handles Enter itself — no double-select.
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (
        event.key === 'Enter' &&
        isOpen &&
        defaultActiveFirstOption !== false
      ) {
        const firstEnabled = displayedOptions.find(
          (option) => !option.disabled,
        );
        if (firstEnabled) {
          event.preventDefault();
          handleSelect(firstEnabled.value);
        }
      }
    },
    [isOpen, defaultActiveFirstOption, displayedOptions, handleSelect],
  );

  // Expose the imperative handle (native replacement for antd RefSelectProps).
  useEffect(() => {
    externalHandleRef.current = {
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      input: inputRef.current,
    };
    handleInputRef &&
      handleInputRef(
        externalHandleRef as MutableRefObject<AutocompleteInputHandle | null>,
      );
  }, [handleInputRef]);

  const getParentNode = useCallback(
    (triggerNode: HTMLElement) => triggerNode.parentNode as HTMLElement,
    [],
  );

  const iconCount = +!!icon1 + +!!icon2;

  const placeholderString =
    typeof placeholder === 'string' ? placeholder : undefined;

  // Autosize: measure the value and write the width onto the InputContainer — a
  // content-sized (inline-flex, border-box) box whose width therefore propagates
  // as the flex-basis to layout-balancing parents (e.g. Condition rows). The
  // <input> just fills the container. stretchToFit is pure CSS: the container's
  // `max-width: 100%` clamps it to its containing block (the flex-allocated
  // slot, inside any parent padding) without touching the flex-basis — a
  // percentage max-width is ignored for max-content — so there is no JS,
  // no ResizeObserver, and no settling. Mirrors the production behaviour.
  const { sizerRef, containerRef } = useAutosizeWidth<HTMLDivElement>({
    value: currentValue,
    placeholder: placeholderString,
    extraWidth: AUTOSIZE_EXTRA_WIDTH + getIconsWidth(iconCount),
    inputRef,
  });

  const handleIconsClick = useCallback(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  const icons = useMemo(() => {
    if (!icon1 && !icon2) {
      return null;
    }
    const icon1WithTooltip = icon1Tooltip ? (
      <Tooltip title={icon1Tooltip}>{icon1}</Tooltip>
    ) : (
      icon1
    );
    const icon2WithTooltip = icon2Tooltip ? (
      <Tooltip title={icon2Tooltip}>{icon2}</Tooltip>
    ) : (
      icon2
    );
    return (
      <S.IconWrapper onClick={handleIconsClick}>
        {icon1WithTooltip} {icon2WithTooltip}
      </S.IconWrapper>
    );
  }, [handleIconsClick, icon1, icon2, icon1Tooltip, icon2Tooltip]);

  const showClear = !!allowClear && !isDisabled && currentValue !== '';

  // Only surface the dropdown when there is something to show — options, or an
  // explicit notFoundContent. Otherwise an empty/no-match value would render a
  // blank "not found" overlay (the antd AutoComplete showed nothing here).
  const hasDropdownContent =
    displayedOptions.length > 0 ||
    (notFoundContent !== undefined && notFoundContent !== null);

  return (
    <S.AutocompleteWrapper
      autoResize={autoResize}
      style={style}
      className={`ds-autocomplete ${className || ''}`}
    >
      <FormField
        label={label}
        tooltip={tooltip}
        tooltipConfig={tooltipConfig}
        description={description}
        errorText={errorText}
        id={id}
      >
        <S.ComponentWrapper
          readOnly={readOnly}
          error={!!errorText || error}
          iconCount={iconCount}
        >
          <Dropdown
            open={isOpen && hasDropdownContent}
            onOpenChange={setOpen}
            disabled={isDisabled}
            placement={placement}
            size="match-trigger"
            // Autocomplete owns the open state through the input's focus / click /
            // change handlers. Letting ds-dropdown ALSO toggle on trigger click
            // double-fired against the focus-open (focus opens it, the same click
            // toggled it shut) — the panel flashed open then closed on re-click.
            // Keep ds-dropdown for positioning + outside-dismiss only; the input
            // handlers drive open/close.
            trigger={[]}
            getPopupContainer={getPopupContainer || getParentNode}
            overlayClassName="ds-autocomplete-dropdown ps__child--consume"
            asChild
            overlay={
              <AutocompleteDropdown
                options={displayedOptions}
                notFoundContent={notFoundContent}
                onSelect={handleSelect}
              />
            }
          >
            <S.InputContainer ref={containerRef} autoResize={autoResize}>
              <S.NativeInput
                ref={inputRef}
                iconCount={iconCount}
                role="combobox"
                aria-expanded={isOpen}
                aria-autocomplete="list"
                autoComplete="off"
                data-testid="autocomplete-autosize-input"
                id={id}
                {...(value !== undefined ? { value } : { defaultValue })}
                placeholder={placeholderString}
                disabled={isDisabled}
                autoFocus={autoFocus}
                maxLength={maxLength}
                onChange={handleChange}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={onBlur}
              />
              {autoResize && (
                <span ref={sizerRef} style={SIZER_STYLE} aria-hidden />
              )}
              {showClear && (
                <S.ClearButton
                  type="button"
                  aria-label="clear"
                  data-testid="autocomplete-clear"
                  onClick={handleClear}
                >
                  ×
                </S.ClearButton>
              )}
              {icons}
            </S.InputContainer>
          </Dropdown>
        </S.ComponentWrapper>
      </FormField>
    </S.AutocompleteWrapper>
  );
};

Autocomplete.Option = Option;

export default Autocomplete;
