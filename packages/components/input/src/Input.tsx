import React, { ComponentType, useEffect, useRef, useCallback, ChangeEvent, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { StyledComponent } from 'styled-components';

import AntdInput, { InputProps as AntdInputProps } from 'antd/lib/input';
import AntdMaskedInput from 'antd-mask-input';
import { MaskedInputProps as AntdMaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import '@synerise/ds-core/dist/js/style';
import { useResizeObserver } from '@synerise/ds-utils';

import './style/index.less';

import * as S from './Input.styles';
import { ContentAboveElement, ContentBelowElement, ElementIcons } from './components';

import { BaseProps, InputProps as DSInputProps } from './Input.types';
import { useInputAddonHeight, useElementFocus } from './hooks';
import { getCharCount } from './utils';

import { AutosizeWrapper } from './AutosizeWrapper/AutosizeWrapper';
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
    ...antdInputProps
  }) => {
    const id = useMemo(() => uuid(), []);
    const charCount = getCharCount(antdInputProps.value, counterLimit);

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

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const { value: newValue } = e.currentTarget;
        if (counterLimit && newValue.length > counterLimit) return;

        antdInputProps.onChange && antdInputProps.onChange(e);
      },
      [antdInputProps, counterLimit]
    );

    const stretchToFit = autoResize && autoResize !== true && Boolean(autoResize.stretchToFit);
    const preAutosize = () => {
      scrollLeftRef.current = inputRef.current?.input.scrollLeft || 0;
      inputRef.current && inputRef.current.input.style.removeProperty('max-width');
    };
    const onAutosize = () => {
      const parentRect = elementRef.current && elementRef.current.getBoundingClientRect();
      if (stretchToFit && inputRef.current && parentRect?.width && paddingDiff.current) {
        inputRef.current.input.style.maxWidth = `${parentRect?.width - paddingDiff.current}px`;
        inputRef.current.input.scrollLeft = scrollLeftRef.current;
      }
    };

    return (
      <S.OuterWrapper ref={elementRef} autoResize={autoResize} className={className} resetMargin={resetMargin}>
        <ContentAboveElement
          label={label}
          counterLimit={counterLimit}
          id={id}
          tooltip={tooltip}
          tooltipConfig={tooltipConfig}
          charCount={charCount}
        />
        <S.InputWrapper icon1={Boolean(icon1)} icon2={Boolean(icon2)}>
          <ElementIcons
            handleIconsClick={handleIconsClick}
            disabled={antdInputProps.disabled}
            icon1={icon1}
            icon2={icon2}
            icon1Tooltip={icon1Tooltip}
            icon2Tooltip={icon2Tooltip}
            className={className}
            type="input"
          />
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
        </S.InputWrapper>
        <ContentBelowElement description={description} errorText={errorText} />
      </S.OuterWrapper>
    );
  };

export const Input = createInputComponent<AntdInput, AntdInputProps>(S.AntdInput);
export const MaskedInput = createInputComponent<AntdMaskedInput, AntdMaskedInputProps>(S.AntdMaskedInput);

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
