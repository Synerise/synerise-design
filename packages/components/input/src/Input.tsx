import type { InputRef } from 'antd/lib/input';
import type { TextAreaRef } from 'antd/lib/input/TextArea';
import React, {
  type ChangeEvent,
  type FocusEvent,
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
import '@synerise/ds-core/dist/js/style';
import FormField from '@synerise/ds-form-field';
import { useResizeObserver } from '@synerise/ds-utils';

import type { AutosizeInputRefType } from './AutosizeInput/AutosizeInput.types';
import * as S from './Input.styles';
import type { InputProps } from './Input.types';
import { AutosizeWrapper, ElementIcons, ExpandableWrapper } from './components';
import { useElementFocus, useInputAddonHeight } from './hooks';
import { useCounterLimit } from './hooks/useCounterLimit';
import './style/index.less';
import { getCharCount } from './utils';

const VERTICAL_BORDER_OFFSET = 2;

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
      ...antdInputProps
    },
    forwardedRef,
  ) => {
    const id = useMemo(() => uuid(), []);
    const charCount = getCharCount(antdInputProps.value, counterLimit);
    const expandableTextAreaRef = useRef<TextAreaRef | null>(null);
    const [expanded, setExpanded] = useState(false);
    const [overflown, setOverflown] = useState(false);
    const scrollLeftRef = useRef(0);
    const hasErrorMessage = Boolean(errorText);
    const paddingDiff = useRef<number>();
    const inputRef = useRef<InputRef>(null);
    const autosizeRef = useRef<AutosizeInputRefType | null>(null);
    const externalRef = useRef<HTMLInputElement | null>(null);
    const elementRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs([elementRef, forwardedRef]);

    const iconCount = useMemo(() => {
      return Number(!!icon1) + Number(!!icon2) + Number(!!expandable);
    }, [icon1, icon2, expandable]);

    const handleIconsClick = useElementFocus(inputRef);
    const { inputAddonHeight } = useInputAddonHeight(inputRef);

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
      if (inputRef.current?.input) {
        const { paddingLeft, paddingRight } = getComputedStyle(
          inputRef.current.input,
        );
        paddingDiff.current =
          parseFloat(paddingLeft) + parseFloat(paddingRight);
      }
    });
    useEffect(() => {
      if (!autoResize && expandable && inputRef.current?.input) {
        setOverflown(
          inputRef.current.input.scrollWidth >
            inputRef.current.input.clientWidth,
        );
      }
    }, [autoResize, expandable, expanded]);

    const handleTextareaChange = (
      event: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const { value: newValue } = event.currentTarget;
      if (counterLimit && newValue.length > counterLimit) {
        return;
      }
      antdInputProps.onChange && antdInputProps.onChange(event);
    };

    const handleExpandableTextareaBlur = (
      event: FocusEvent<HTMLTextAreaElement>,
    ) => {
      setExpanded(false);
      if (inputRef.current?.input) {
        inputRef.current.input.value = event.target.value;
        inputRef.current.input.focus();
      }
    };

    const handleExpandIconClick = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (inputRef.current && expandableTextAreaRef.current) {
        // @ts-expect-error Property 'value' does not exist on type 'TextAreaRef'.
        expandableTextAreaRef.current.value = inputRef.current.input?.value;
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
        antdInputProps.onChange && antdInputProps.onChange(event);
      },
      [antdInputProps, autoResize, counterLimit, expandable, overflown],
    );

    const stretchToFit =
      autoResize && autoResize !== true && Boolean(autoResize.stretchToFit);
    const preAutosize = useCallback(() => {
      scrollLeftRef.current = inputRef.current?.input?.scrollLeft || 0;
      inputRef.current?.input &&
        inputRef.current.input.style.removeProperty('max-width');
    }, []);

    const onAutosize = useCallback(
      (newWidth?: number) => {
        const parentRect =
          elementRef.current && elementRef.current.getBoundingClientRect();
        if (
          stretchToFit &&
          inputRef.current?.input &&
          parentRect?.width &&
          paddingDiff.current
        ) {
          inputRef.current.input.style.maxWidth = `${parentRect?.width - paddingDiff.current}px`;
          inputRef.current.input.scrollLeft = scrollLeftRef.current;
        }

        if (
          newWidth !== undefined &&
          autoResize &&
          inputRef.current?.input &&
          expandable
        ) {
          const style = window.getComputedStyle(inputRef.current.input);
          const minWidth = parseInt(style.minWidth, 10);
          setOverflown(newWidth > minWidth);
        }
      },
      [autoResize, expandable, stretchToFit],
    );

    const handleWrapperResize = useCallback(() => {
      preAutosize();
      onAutosize();
    }, [onAutosize, preAutosize]);

    useResizeObserver(elementRef, handleWrapperResize);

    const rightSide = useCounterLimit({
      renderCustomCounter,
      counterLimit,
      charCount,
    });

    const autoSizedComponent = (
      <AutosizeWrapper
        {...autoResizeProps}
        preAutosize={preAutosize}
        onAutosize={onAutosize}
        value={antdInputProps.value}
        autoResize={!!autoResize}
      >
        <S.AntdInput
          autoResize={autoResize}
          data-testid="input-autosize-input"
          {...antdInputProps}
          className={hasErrorMessage || error ? 'error' : undefined}
          addonBefore={
            !!prefixel && (
              <S.AddonWrapper
                className="ds-input-prefix"
                height={inputAddonHeight - VERTICAL_BORDER_OFFSET}
              >
                {prefixel}
              </S.AddonWrapper>
            )
          }
          addonAfter={
            !!suffixel && (
              <S.AddonWrapper
                className="ds-input-suffix"
                height={inputAddonHeight - VERTICAL_BORDER_OFFSET}
              >
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
      <S.OuterWrapper
        ref={mergedRef}
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
        </FormField>
      </S.OuterWrapper>
    );
  },
);

export const RawInput = (props: InputProps) => {
  const { error } = props;
  return <S.AntdInput className={error ? 'error' : ''} {...props} />;
};

export { default as InputGroup } from './InputGroup';
export { default as InputMultivalue } from './InputMultivalue/InputMultivalue';
