import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  ComponentType,
  useMemo,
  MouseEvent,
  FocusEvent,
  useCallback,
} from 'react';
import { v4 as uuid } from 'uuid';
import { StyledComponent } from 'styled-components';
import AntdInput, { InputProps as AntdInputProps } from 'antd/lib/input';
import AntdTextArea from 'antd/lib/input/TextArea';
import { MaskedInputProps as AntdMaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import AntdMaskedInput from 'antd-mask-input';

import { useResizeObserver } from '@synerise/ds-utils';

import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import * as S from './Input.styles';

import {
  ContentAboveElement,
  ContentBelowElement,
  ElementIcons,
  AutosizeWrapper,
  ExpandableWrapper,
} from './components';
import { useInputAddonHeight, useElementFocus } from './hooks';
import { getCharCount } from './utils';

import type { BaseProps, InputProps as DSInputProps } from './Input.types';
import type { AutosizeInputRefType } from './AutosizeInput/AutosizeInput.types';

const VERTICAL_BORDER_OFFSET = 2;

const createInputComponent =
  <E extends AntdInput | AntdMaskedInput, T extends AntdInputProps | AntdMaskedInputProps>(
    WrappedComponent: StyledComponent<ComponentType<AntdInputProps | AntdMaskedInputProps>, { error?: string }>
  ): ComponentType<BaseProps & T> =>
  ({
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
    ...antdInputProps
  }) => {
    const id = useMemo(() => uuid(), []);
    const charCount = getCharCount(antdInputProps.value, counterLimit);
    const expandableTextAreaRef = useRef<AntdTextArea | null>(null);
    const [expanded, setExpanded] = useState(false);
    const [overflown, setOverflown] = useState(false);
    const scrollLeftRef = useRef(0);
    const hasErrorMessage = Boolean(errorText);
    const paddingDiff = useRef<number>();
    const inputRef = useRef<E>(null);
    const autosizeRef = useRef<AutosizeInputRefType | null>(null);
    const externalRef = useRef<HTMLInputElement | null>(null);
    const elementRef = useRef<HTMLDivElement | null>(null);

    const handleIconsClick = useElementFocus(inputRef);
    const { inputAddonHeight } = useInputAddonHeight(inputRef);
    useResizeObserver(elementRef);

    useEffect(() => {
      if (inputRef.current) {
        externalRef.current = inputRef.current.input;
      }
      handleInputRef && handleInputRef(externalRef);
    }, [handleInputRef]);

    useEffect(() => {
      if (autosizeRef.current) {
        externalRef.current = autosizeRef.current.inputRef.current;
        handleInputRef && handleInputRef(externalRef);
      }
    }, [handleInputRef]);

    useEffect(() => {
      if (inputRef.current) {
        const { paddingLeft, paddingRight } = getComputedStyle(inputRef.current.input);
        paddingDiff.current = parseFloat(paddingLeft) + parseFloat(paddingRight);
      }
    });
    useEffect(() => {
      if (!autoResize && expandable && inputRef && inputRef.current) {
        setOverflown(inputRef.current.input.scrollWidth > inputRef.current.input.clientWidth);
      }
    }, [autoResize, expandable, expanded]);

    const handleTextareaChange = (event: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>) => {
      const { value: newValue } = event.currentTarget;
      if (counterLimit && newValue.length > counterLimit) {
        return;
      }
      antdInputProps.onChange && antdInputProps.onChange(event);
    };

    const handleExpandableTextareaBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
      setExpanded(false);
      if (inputRef.current) {
        inputRef.current.input.value = event.target.value;
        inputRef.current.input.focus();
      }
    };

    const handleExpandIconClick = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (inputRef.current && expandableTextAreaRef.current) {
        // @ts-ignore
        expandableTextAreaRef.current.value = inputRef.current.input.value;
        expandableTextAreaRef.current.focus();
      }
      setExpanded(true);
    };

    useEffect(() => {
      if (expanded) {
        expandableTextAreaRef.current && expandableTextAreaRef.current.focus();
      }
    }, [expandableTextAreaRef, expanded]);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const { value: newValue, scrollWidth, clientWidth } = event.currentTarget;
        const isNowOverflown = scrollWidth > clientWidth;

        if (!autoResize && expandable && isNowOverflown !== overflown) {
          setOverflown(isNowOverflown);
        }
        if (counterLimit && newValue.length > counterLimit) return;

        antdInputProps.onChange && antdInputProps.onChange(event);
      },
      [antdInputProps, autoResize, counterLimit, expandable, overflown]
    );

    const stretchToFit = autoResize && autoResize !== true && Boolean(autoResize.stretchToFit);
    const preAutosize = () => {
      scrollLeftRef.current = inputRef.current?.input.scrollLeft || 0;
      inputRef.current && inputRef.current.input.style.removeProperty('max-width');
    };

    const onAutosize = (newWidth: number) => {
      const parentRect = elementRef.current && elementRef.current.getBoundingClientRect();
      if (stretchToFit && inputRef.current && parentRect?.width && paddingDiff.current) {
        inputRef.current.input.style.maxWidth = `${parentRect?.width - paddingDiff.current}px`;
        inputRef.current.input.scrollLeft = scrollLeftRef.current;
      }

      if (autoResize && inputRef.current && expandable) {
        const style = window.getComputedStyle(inputRef.current.input);
        const minWidth = parseInt(style.minWidth, 10);
        setOverflown(newWidth > minWidth);
      }
    };

    const autoSizedComponent = (
      <AutosizeWrapper
        preAutosize={preAutosize}
        onAutosize={onAutosize}
        value={antdInputProps.value as string}
        autoResize={!!autoResize}
      >
        <WrappedComponent
          autoResize={autoResize}
          data-testid="input-autosize-input"
          {...antdInputProps}
          className={hasErrorMessage || error ? 'error' : undefined}
          addonBefore={
            !!prefixel && (
              <S.AddonWrapper className="ds-input-prefix" height={inputAddonHeight - VERTICAL_BORDER_OFFSET}>
                {prefixel}
              </S.AddonWrapper>
            )
          }
          addonAfter={
            !!suffixel && (
              <S.AddonWrapper className="ds-input-suffix" height={inputAddonHeight - VERTICAL_BORDER_OFFSET}>
                {suffixel}
              </S.AddonWrapper>
            )
          }
          error={hasErrorMessage || error}
          onChange={handleChange}
          value={antdInputProps.value}
          autoComplete="off"
          id={id}
          ref={inputRef}
        />
      </AutosizeWrapper>
    );

    return (
      <S.OuterWrapper ref={elementRef} autoResize={autoResize} className={className} resetMargin={resetMargin}>
        <ContentAboveElement
          label={label}
          counterLimit={counterLimit}
          id={id}
          tooltip={tooltip}
          tooltipConfig={tooltipConfig}
          charCount={charCount}
          renderCustomCounter={renderCustomCounter}
        />
        <S.InputWrapper icon1={Boolean(icon1)} icon2={Boolean(icon2)} icon3={!!expandable}>
          <ElementIcons
            handleIconsClick={handleIconsClick}
            disabled={antdInputProps.disabled}
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
              value={antdInputProps.value}
              expanded={expanded}
            >
              {autoSizedComponent}
            </ExpandableWrapper>
          ) : (
            autoSizedComponent
          )}
        </S.InputWrapper>

        <ContentBelowElement description={description} errorText={errorText} />
      </S.OuterWrapper>
    );
  };

export const Input = createInputComponent<AntdInput, AntdInputProps>(S.AntdInput);

/**
 * @deprecated MaskedInput component will no longer receive any updates
 */

export const MaskedInput = createInputComponent<AntdMaskedInput, AntdMaskedInputProps>(S.AntdMaskedInput);
/**
 * @deprecated RawMaskedInput component will no longer receive any updates
 */
export const RawMaskedInput = S.AntdMaskedInput;

export const RawInput = (props: DSInputProps) => {
  const { error } = props;
  return <S.AntdInput className={error ? 'error' : ''} {...props} />;
};

export { default as InputGroup } from './InputGroup';
export { default as InputMultivalue } from './InputMultivalue/InputMultivalue';

// @deprecated
export const AutoResize = Object.assign(S.AutoResize);

// @deprecated
export const WrapperAutoResize = Object.assign(S.WrapperAutoResize);
