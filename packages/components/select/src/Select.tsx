import React, { type ReactNode, forwardRef, useMemo, useState } from 'react';

import Dropdown from '@synerise/ds-dropdown';
import FormField from '@synerise/ds-form-field';
import Icon, { AngleDownS, Close3M } from '@synerise/ds-icon';
import Loader from '@synerise/ds-loader';
import Scrollbar from '@synerise/ds-scrollbar';
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

/**
 * DS-native Select (antd-free). **Increment 1: single-select.** `mode="multiple"`
 * renders selected values but the chip selector, `tags` free-text entry, in-selector
 * `showSearch`, remote `onSearch` and `dropdownRender` are TODO (increment 2) — the
 * props are accepted so consumer call sites keep type-checking.
 */
const SelectInner = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    onSelect,
    onDeselect,
    onDropdownVisibleChange,
    mode,
    options,
    children,
    placeholder,
    disabled,
    readOnly,
    loading,
    allowClear,
    optionLabelProp,
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
    rowKey,
  } = props;

  const isMultiple = mode === 'multiple' || mode === 'tags';
  const isDisabled = Boolean(disabled || readOnly);

  const [internalValue, setInternalValue] = useState<SelectValue>(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;
  const selectedValues = toArray(currentValue);

  const [internalOpen, setInternalOpen] = useState<boolean>(!!defaultOpen);
  const isControlledOpen = openProp !== undefined;
  const isOpen = isControlledOpen ? !!openProp : internalOpen;

  const resolvedOptions = useMemo<SelectOption[]>(() => {
    if (options && options.length > 0) {
      return options;
    }
    return getOptionsFromChildren(children);
  }, [options, children]);

  const $size =
    size === 'large' ? 'large' : size === 'small' ? 'small' : 'default';

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

  const handleSelect = (option: SelectOption): void => {
    if (option.disabled) {
      return;
    }
    if (isMultiple) {
      const already = selectedValues.includes(option.value);
      const next = already
        ? selectedValues.filter((v) => v !== option.value)
        : [...selectedValues, option.value];
      commit(next);
      onChange?.(
        next as SelectValue,
        next
          .map((v) => findOption(resolvedOptions, v))
          .filter(Boolean) as SelectOption[],
      );
      if (already) {
        onDeselect?.(option.value, option);
      } else {
        onSelect?.(option.value, option);
      }
    } else {
      commit(option.value);
      onChange?.(option.value as SelectValue, option);
      onSelect?.(option.value, option);
      setOpen(false);
    }
  };

  const handleClear = (event: React.MouseEvent): void => {
    event.stopPropagation();
    const cleared: SelectValue = isMultiple ? [] : undefined;
    commit(cleared);
    onChange?.(cleared, isMultiple ? [] : undefined);
  };

  const displayNode = useMemo<ReactNode>(() => {
    if (selectedValues.length === 0) {
      return null;
    }
    const labelFor = (v: RawValueType): ReactNode => {
      const option = findOption(resolvedOptions, v);
      if (option && optionLabelProp === 'value') {
        return option.value;
      }
      return option?.label ?? v;
    };
    if (isMultiple) {
      return selectedValues
        .map(labelFor)
        .reduce<
          ReactNode[]
        >((acc, node, i) => (i === 0 ? [node] : [...acc, ', ', node]), []);
    }
    return labelFor(selectedValues[0]);
  }, [selectedValues, resolvedOptions, isMultiple, optionLabelProp]);

  const hasValue = selectedValues.length > 0;
  const showClear = allowClear && hasValue && !isDisabled;

  const menu: ReactNode = (
    <S.DropdownWrapper>
      {loading ? (
        <S.Loading className="ds-select-loading">
          <Loader size="M" />
        </S.Loading>
      ) : resolvedOptions.length === 0 ? (
        <S.NotFound className="ds-select-empty">{notFoundContent}</S.NotFound>
      ) : (
        <S.ScrollList>
          <Scrollbar
            absolute
            maxHeight={Number(listHeight) || DEFAULT_LIST_HEIGHT}
          >
            <S.Inner>
              {resolvedOptions.map((option) => (
                <S.OptionItem
                  key={rowKey ? rowKey(option) : option.value}
                  role="option"
                  className={cx(
                    'ds-select-item-option',
                    selectedValues.includes(option.value) &&
                      'ds-select-item-option-selected',
                  )}
                  aria-selected={selectedValues.includes(option.value)}
                  data-testid="select-option"
                  title={option.title}
                  text={option.label ?? option.value}
                  disabled={option.disabled}
                  onClick={() => handleSelect(option)}
                />
              ))}
            </S.Inner>
          </Scrollbar>
        </S.ScrollList>
      )}
    </S.DropdownWrapper>
  );

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
          $withPrefixel={!!prefixel}
          $withSuffixel={!!suffixel}
          $selectorStyle={selectorStyle}
          role="combobox"
          aria-expanded={isOpen}
          aria-disabled={isDisabled}
        >
          {hasValue ? (
            <S.SelectionItem className="ds-select-selection-item">
              {displayNode}
            </S.SelectionItem>
          ) : (
            <S.Placeholder className="ds-select-selection-placeholder">
              {placeholder}
            </S.Placeholder>
          )}
          {showClear ? (
            <S.ClearWrapper
              className="ds-select-clear"
              onClick={handleClear}
              data-testid="select-clear"
            >
              <Tooltip title={clearTooltip}>
                <span>
                  {clearIcon ?? (
                    <Icon
                      component={<Close3M />}
                      size={$size === 'small' ? 18 : 24}
                    />
                  )}
                </span>
              </Tooltip>
            </S.ClearWrapper>
          ) : (
            <S.Arrow className="ds-select-arrow" $open={isOpen}>
              <Icon component={<AngleDownS />} />
            </S.Arrow>
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
