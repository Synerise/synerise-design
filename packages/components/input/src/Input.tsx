import React, { useEffect, useRef, useCallback, ChangeEvent, useMemo, ReactElement } from 'react';
import { v4 as uuid } from 'uuid';
import { StyledComponent } from 'styled-components';

import AntdInput, { InputProps as AntdInputProps } from 'antd/lib/input';
import AntdMaskedInput from 'antd-mask-input';
import { MaskedInputProps as AntdMaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import '@synerise/ds-core/dist/js/style';

import './style/index.less';

import { useResizeToFit } from '@synerise/ds-utils';

import * as S from './Input.styles';
import { ContentAboveElement, ContentBelowElement, ElementIcons } from './components';
import Textarea from './Textarea/Textarea';
import { BaseProps, InputProps as DSInputProps, TextareaProps } from './Input.types';
import AutosizeInput from './autosize/autosize';
import { useInputAddonHeight, useElementFocus } from './hooks';
import { getCharCount } from './utils';

const VERTICAL_BORDER_OFFSET = 2;

const createInputComponent =
  <E extends AntdInput | AntdMaskedInput, T extends AntdInputProps | AntdMaskedInputProps>(
    WrappedComponent: StyledComponent<React.ComponentType<AntdInputProps | AntdMaskedInputProps>, { error?: string }>
  ): React.ComponentType<BaseProps & T> =>
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
    const InputComponent = autoResize ? AutosizeInput : WrappedComponent;

    const hasErrorMessage = Boolean(errorText);

    const inputRef = useRef<E>(null);
    const externalRef = useRef<HTMLInputElement | null>(null);
    const handleIconsClick = useElementFocus(inputRef);
    const { inputAddonHeight } = useInputAddonHeight(inputRef);

    useEffect(() => {
      if (inputRef && inputRef.current) {
        externalRef.current = inputRef.current.input;
      }
      handleInputRef && handleInputRef(externalRef);
    }, [inputRef, handleInputRef]);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const { value: newValue } = e.currentTarget;

        if (counterLimit && newValue.length > counterLimit) return;

        antdInputProps.onChange && antdInputProps.onChange(e);
      },
      [antdInputProps, counterLimit]
    );

    const renderInputComponent = () => {
      return (
        <InputComponent
          {...antdInputProps}
          {...(autoResize ? { renderInput: WrappedComponent, autoResize } : {})}
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
          id={id}
          ref={inputRef}
          autoComplete="off"
        />
      );
    };

    const stretchToFit = typeof autoResize === 'object' && Boolean(autoResize.stretchToFit);
    const paddingDiff = useRef<number>();

    const { observe, disconnect, elementRef } = useResizeToFit<HTMLDivElement>({
      onResize: (width: number) => {
        if (inputRef.current && paddingDiff.current) {
          // @ts-ignore
          inputRef.current.input.style.maxWidth = `${width - paddingDiff.current}px`;
        }
      },
      autoObserve: true,
    });

    useEffect(() => {
      if (inputRef.current) {
        // @ts-ignore
        const { paddingLeft, paddingRight } = getComputedStyle(inputRef.current.input);
        paddingDiff.current = parseFloat(paddingLeft) + parseFloat(paddingRight);
      }
    }, [paddingDiff]);

    useEffect(() => {
      if (elementRef.current) {
        if (stretchToFit) {
          observe();
        } else {
          disconnect();
          // @ts-ignore
          if (inputRef.current && inputRef.current.input) {
            // @ts-ignore
            inputRef.current.input.style.removeProperty('max-width');
          }
        }
      }
      return () => {
        disconnect();
      };
    }, [disconnect, observe, stretchToFit, elementRef]);

    return (
      <S.OuterWrapper autoResize={autoResize} className={className} resetMargin={resetMargin}>
        <ContentAboveElement
          label={label}
          counterLimit={counterLimit}
          id={id}
          tooltip={tooltip}
          tooltipConfig={tooltipConfig}
          charCount={charCount}
        />
        <S.InputWrapper ref={elementRef} icon1={Boolean(icon1)} icon2={Boolean(icon2)}>
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
          {renderInputComponent()}
        </S.InputWrapper>
        <ContentBelowElement description={description} errorText={errorText} />
      </S.OuterWrapper>
    );
  };

export const Input = createInputComponent<AntdInput, AntdInputProps>(S.AntdInput);
export const MaskedInput = createInputComponent<AntdMaskedInput, AntdMaskedInputProps>(S.AntdMaskedInput);

export const TextArea = ({
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
  ...antdTextareaProps
}: TextareaProps) => {
  const id = useMemo(() => uuid(), []);
  const charCount = getCharCount(antdTextareaProps.value, counterLimit);
  const hasErrorMessage = Boolean(errorText);

  const ref = useRef<HTMLTextAreaElement>(null);
  const handleIconsClick = useElementFocus(ref);

  useEffect(() => {
    handleInputRef && handleInputRef(ref);
  }, [ref, handleInputRef]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { value: newValue } = e.currentTarget;
      if (counterLimit && newValue.length > counterLimit) {
        return;
      }
      antdTextareaProps.onChange && antdTextareaProps.onChange(e);
    },
    [antdTextareaProps, counterLimit]
  );

  return (
    <S.OuterWrapper autoResize={autoResize} className={className} resetMargin={resetMargin}>
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
          disabled={antdTextareaProps.disabled}
          icon1Tooltip={icon1Tooltip}
          icon1={icon1}
          icon2={icon2}
          icon2Tooltip={icon2Tooltip}
          className={className}
          type="textArea"
        />
        <Textarea
          {...antdTextareaProps}
          className={hasErrorMessage || error ? 'error' : undefined}
          error={hasErrorMessage || error}
          onChange={handleChange}
          value={antdTextareaProps.value}
          id={id}
          // ref={ref}
          autoComplete="off"
        />
      </S.InputWrapper>
      <ContentBelowElement description={description} errorText={errorText} />
    </S.OuterWrapper>
  );
};

export const RawMaskedInput = S.AntdMaskedInput;
export { default as InputGroup } from './InputGroup';

export const RawInput = (props: DSInputProps): ReactElement => {
  const { error } = props;
  return <S.AntdInput className={error ? 'error' : ''} {...props} />;
};
export const RawTextArea = S.AntdTextArea;
export { default as InputMultivalue } from './InputMultivalue/InputMultivalue';
export const AutoResize = Object.assign(S.AutoResize);
export const WrapperAutoResize = Object.assign(S.WrapperAutoResize);
