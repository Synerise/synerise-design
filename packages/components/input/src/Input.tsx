import React, {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';

import { useMergeRefs } from '@floating-ui/react';
import FormField from '@synerise/ds-form-field';
import Icon, { CloseS } from '@synerise/ds-icon';

import {
  SIZER_STYLE,
  useAutosizeWidth,
} from './AutosizeInput/useAutosizeWidth';
import { useStretchToFit } from './AutosizeInput/useStretchToFit';
import * as S from './Input.styles';
import type { InputProps } from './Input.types';
import { ElementIcons, ExpandableWrapper } from './components';
import { useElementFocus } from './hooks';
import { useCounterLimit } from './hooks/useCounterLimit';
import { getCharCount } from './utils';

const DEFAULT_EXTRA_WIDTH = 2;
const CLEAR_BASE_OFFSET = 8;
const ICON_SLOT_WIDTH = 28;

export const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      className,
      errorText,
      label,
      description,
      counterLimit,
      tooltip,
      tooltipConfig,
      icon1,
      icon1Tooltip,
      autoResize,
      icon2,
      icon2Tooltip,
      resetMargin,
      handleInputRef,
      prefixel,
      suffixel,
      error,
      expandable,
      expandableTooltip,
      renderCustomCounter,
      autoResizeProps,
      allowClear,
      size,
      innerPrefix,
      // antd affix/border props are intentionally not forwarded to the native
      // input (the DS uses icon1/icon2 + prefixel/suffixel + innerPrefix); kept
      // out of `...inputProps`.
      prefix: _prefix,
      suffix: _suffix,
      bordered: _bordered,
      onPressEnter,
      addonBefore,
      addonAfter,
      ...inputProps
    },
    forwardedRef,
  ) => {
    const id = useMemo(() => uuid(), []);
    const charCount = getCharCount(inputProps.value, counterLimit);
    const expandableTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [expanded, setExpanded] = useState(false);
    const [overflown, setOverflown] = useState(false);
    const scrollLeftRef = useRef(0);
    const paddingDiff = useRef<number>();
    const hasErrorMessage = Boolean(errorText);
    const inputRef = useRef<HTMLInputElement>(null);
    const externalRef = useRef<HTMLInputElement | null>(null);
    const elementRef = useRef<HTMLDivElement | null>(null);

    const beforeAddon = prefixel ?? addonBefore;
    const afterAddon = suffixel ?? addonAfter;
    const { value, placeholder, disabled, readOnly } = inputProps;
    const hasValue = value !== undefined && value !== null && `${value}` !== '';

    const iconCount = useMemo(() => {
      return Number(!!icon1) + Number(!!icon2) + Number(!!expandable);
    }, [icon1, icon2, expandable]);

    const handleIconsClick = useElementFocus(inputRef);

    const stretchToFit =
      autoResize && autoResize !== true && Boolean(autoResize.stretchToFit);

    useEffect(() => {
      externalRef.current = inputRef.current;
      handleInputRef && handleInputRef(externalRef);
    }, [handleInputRef]);

    // Cache the input's horizontal padding for the stretch-to-fit max-width math.
    // Only re-measure when a padding-affecting prop changes — not on every render
    // (this reads getComputedStyle, which forces a synchronous layout).
    useEffect(() => {
      if (inputRef.current) {
        const { paddingLeft, paddingRight } = getComputedStyle(
          inputRef.current,
        );
        paddingDiff.current =
          parseFloat(paddingLeft) + parseFloat(paddingRight);
      }
    }, [size, iconCount, autoResize, expandable]);

    useEffect(() => {
      if (!autoResize && expandable && inputRef.current) {
        setOverflown(
          inputRef.current.scrollWidth > inputRef.current.clientWidth,
        );
      }
    }, [autoResize, expandable, expanded]);

    // Autosize: the hook writes the content-box width onto the input itself.
    const handleAutosize = useCallback(
      (newWidth: number) => {
        if (autoResize && expandable && inputRef.current) {
          const minWidth = parseInt(
            window.getComputedStyle(inputRef.current).minWidth,
            10,
          );
          setOverflown(newWidth > minWidth);
        }
      },
      [autoResize, expandable],
    );

    const { sizerRef, containerRef } = useAutosizeWidth<HTMLInputElement>({
      value:
        typeof value === 'string' || typeof value === 'number' ? value : '',
      placeholder,
      extraWidth: autoResizeProps?.extraWidth ?? DEFAULT_EXTRA_WIDTH,
      placeholderIsMinWidth: autoResizeProps?.placeholderIsMinWidth,
      inputRef,
      onAutosize: handleAutosize,
    });
    const mergedInputRef = useMergeRefs([inputRef, containerRef]);

    // Stretch-to-fit: clamp the input's max-width to the available width.
    const handleStretchBefore = useCallback(() => {
      if (inputRef.current) {
        scrollLeftRef.current = inputRef.current.scrollLeft || 0;
        inputRef.current.style.removeProperty('max-width');
      }
    }, []);
    const handleStretchAfter = useCallback(() => {
      if (inputRef.current) {
        inputRef.current.scrollLeft = scrollLeftRef.current;
      }
    }, []);
    const getMaxWidth = useCallback(
      (availableWidth: number) => availableWidth - (paddingDiff.current ?? 0),
      [],
    );
    const { outerRef } = useStretchToFit({
      enabled: !!stretchToFit,
      targetRef: inputRef,
      getMaxWidth,
      onBeforeResize: handleStretchBefore,
      onAfterResize: handleStretchAfter,
    });
    const mergedOuterRef = useMergeRefs([elementRef, outerRef, forwardedRef]);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const {
          value: newValue,
          scrollWidth,
          clientWidth,
        } = event.currentTarget;
        const isNowOverflown = scrollWidth > clientWidth;
        if (!autoResize && expandable && isNowOverflown !== overflown) {
          setOverflown(isNowOverflown);
        }
        if (counterLimit && newValue.length > counterLimit) {
          return;
        }
        inputProps.onChange && inputProps.onChange(event);
      },
      [inputProps, autoResize, counterLimit, expandable, overflown],
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        inputProps.onKeyDown && inputProps.onKeyDown(event);
        if (event.key === 'Enter') {
          onPressEnter && onPressEnter(event);
        }
      },
      [inputProps, onPressEnter],
    );

    const handleClear = useCallback(() => {
      const element = inputRef.current;
      if (!element) {
        return;
      }
      // Set the value via the native setter + dispatch an input event so a
      // controlled onChange fires with a real event (React clear pattern).
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set;
      setter?.call(element, '');
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.focus();
    }, []);

    const handleTextareaChange = (
      event: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const { value: newValue } = event.currentTarget;
      if (counterLimit && newValue.length > counterLimit) {
        return;
      }
      inputProps.onChange && inputProps.onChange(event);
    };

    const handleExpandableTextareaBlur = (
      event: FocusEvent<HTMLTextAreaElement>,
    ) => {
      setExpanded(false);
      if (inputRef.current) {
        inputRef.current.value = event.target.value;
        inputRef.current.focus();
      }
    };

    const handleExpandIconClick = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (inputRef.current && expandableTextAreaRef.current) {
        expandableTextAreaRef.current.value = inputRef.current.value ?? '';
        expandableTextAreaRef.current.focus();
      }
      setExpanded(true);
    };

    useEffect(() => {
      if (expanded) {
        expandableTextAreaRef.current && expandableTextAreaRef.current.focus();
      }
    }, [expanded]);

    const rightSide = useCounterLimit({
      renderCustomCounter,
      counterLimit,
      charCount,
    });

    const showClear = Boolean(allowClear) && hasValue && !disabled && !readOnly;
    const clearOffset =
      CLEAR_BASE_OFFSET + (iconCount > 0 ? iconCount * ICON_SLOT_WIDTH : 0);

    const inputControl = (
      <S.NativeInput
        autoResize={autoResize}
        $size={size}
        $hasPrefixel={!!beforeAddon}
        $hasSuffixel={!!afterAddon}
        $hasInnerPrefix={!!innerPrefix}
        data-testid="input-autosize-input"
        {...inputProps}
        error={hasErrorMessage || error}
        className={hasErrorMessage || error ? 'error' : undefined}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        id={id}
        ref={mergedInputRef}
      />
    );

    const inputWithAddons =
      beforeAddon || afterAddon ? (
        <S.InputGroupRow>
          {beforeAddon && (
            <S.Addon
              className="ds-input-prefix"
              $position="before"
              $size={size}
            >
              {beforeAddon}
            </S.Addon>
          )}
          {inputControl}
          {afterAddon && (
            <S.Addon className="ds-input-suffix" $position="after" $size={size}>
              {afterAddon}
            </S.Addon>
          )}
        </S.InputGroupRow>
      ) : (
        inputControl
      );

    const autoSizedComponent = (
      <>
        {innerPrefix && <S.InnerAffix>{innerPrefix}</S.InnerAffix>}
        {inputWithAddons}
        {autoResize && <span ref={sizerRef} style={SIZER_STYLE} aria-hidden />}
        {showClear && (
          <S.ClearButton
            type="button"
            aria-label="clear"
            $offset={clearOffset}
            onClick={handleClear}
          >
            <Icon component={<CloseS />} />
          </S.ClearButton>
        )}
      </>
    );

    return (
      <S.OuterWrapper
        ref={mergedOuterRef}
        autoResize={autoResize}
        className={className}
        resetMargin={resetMargin}
        iconCount={iconCount}
      >
        <FormField
          label={label}
          rightSide={rightSide}
          id={id}
          tooltip={tooltip}
          tooltipConfig={tooltipConfig}
          description={description}
          errorText={errorText}
        >
          <S.InputWrapper iconCount={iconCount}>
            <ElementIcons
              handleIconsClick={handleIconsClick}
              disabled={disabled}
              icon1={icon1}
              icon2={icon2}
              icon1Tooltip={icon1Tooltip}
              icon2Tooltip={icon2Tooltip}
              className={className}
              type="input"
              expandable={expandable}
              overflown={overflown}
              handleExpandIconClick={handleExpandIconClick}
              expandableTooltip={expandableTooltip}
            />
            {expandable ? (
              <ExpandableWrapper
                onChange={handleTextareaChange}
                onBlur={handleExpandableTextareaBlur}
                ref={expandableTextAreaRef}
                value={value}
                expanded={expanded}
              >
                {autoSizedComponent}
              </ExpandableWrapper>
            ) : (
              autoSizedComponent
            )}
          </S.InputWrapper>
        </FormField>
      </S.OuterWrapper>
    );
  },
);

export const RawInput = ({
  error,
  size,
  className,
  // FormField / DS-only props that are not valid on a bare native input:
  label,
  description,
  errorText,
  tooltip,
  tooltipConfig,
  counterLimit,
  renderCustomCounter,
  icon1,
  icon1Tooltip,
  icon2,
  icon2Tooltip,
  resetMargin,
  handleInputRef,
  prefixel,
  suffixel,
  autoResize,
  autoResizeProps,
  expandable,
  expandableTooltip,
  // antd affix/group props handled by `Input`, not the raw input:
  allowClear,
  prefix,
  suffix,
  bordered,
  onPressEnter,
  addonBefore,
  addonAfter,
  ...rest
}: InputProps) => {
  return (
    <S.NativeInput
      {...rest}
      $size={size}
      error={error}
      className={
        [className, error && 'error'].filter(Boolean).join(' ') || undefined
      }
    />
  );
};

export { default as InputGroup } from './InputGroup';
export { default as InputMultivalue } from './InputMultivalue/InputMultivalue';
