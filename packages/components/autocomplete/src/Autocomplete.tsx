import React, { useRef, useEffect } from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdAutoComplete from 'antd/lib/auto-complete';
import { ErrorText, Description, Label } from '@synerise/ds-typography';
import type { RefSelectProps } from 'antd/lib/select';
import { AutosizeWrapper } from '@synerise/ds-input';
import type { AutosizeInputRefType } from '@synerise/ds-input';
import { useResizeObserver } from '@synerise/ds-utils';
import { AutocompleteProps } from './Autocomplete.types';
import * as S from './Autocomplete.styles';

const AUTOSIZE_EXTRA_WIDTH = 27;

const Autocomplete = (props: AutocompleteProps) => {
  const {
    className,
    label,
    description,
    errorText,
    disabled,
    error,
    handleInputRef,
    getPopupContainer,
    autoResize,
    readOnly,
    ...rest
  } = props;
  const scrollLeftRef = useRef(0);
  const antSelectRef = useRef<RefSelectProps | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autosizeRef = useRef<AutosizeInputRefType | null>(null);
  const autocompleteInputRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  useResizeObserver(elementRef);

  useEffect(() => {
    handleInputRef && handleInputRef(antSelectRef);
  }, [antSelectRef, handleInputRef]);

  useEffect(() => {
    if (autosizeRef.current) {
      autocompleteInputRef.current = autosizeRef.current.wrapperRef.current;
      inputRef.current = autosizeRef.current.inputRef.current;
    }
  }, []);

  const getParentNode = (triggerNode: HTMLElement) => {
    return triggerNode.parentNode as HTMLElement;
  };

  const stretchToFit = autoResize && autoResize !== true && Boolean(autoResize.stretchToFit);
  const placeholder = typeof rest.placeholder === 'string' ? rest.placeholder : undefined;
  const handlePreAutosize = () => {
    scrollLeftRef.current = inputRef.current?.scrollLeft || 0;
    autocompleteInputRef.current && autocompleteInputRef.current.style.removeProperty('max-width');
  };
  const handleAutosize = () => {
    const parentRect = elementRef.current && elementRef.current.getBoundingClientRect();
    if (stretchToFit && autocompleteInputRef.current && parentRect?.width) {
      autocompleteInputRef.current.style.maxWidth = `${parentRect?.width + 1}px`;
      inputRef.current && inputRef.current.scrollTo(scrollLeftRef.current, 0);
    }
  };
  const transformRef = (element: HTMLElement) => {
    autocompleteInputRef.current = element as HTMLDivElement;
    return element.querySelector('input') as HTMLInputElement;
  };

  return (
    <S.AutocompleteWrapper ref={elementRef} autoResize={autoResize} className={`ds-autocomplete ${className || ''}`}>
      {label && (
        <S.LabelWrapper>
          <Label>{label}</Label>
        </S.LabelWrapper>
      )}
      <S.ComponentWrapper readOnly={readOnly} error={!!errorText || error}>
        <AutosizeWrapper
          autoResize={!!autoResize}
          value={rest.value}
          placeholder={placeholder}
          transformRef={transformRef}
          ref={autosizeRef}
          extraWidth={AUTOSIZE_EXTRA_WIDTH}
          preAutosize={handlePreAutosize}
          onAutosize={handleAutosize}
        >
          <AntdAutoComplete
            {...rest}
            disabled={readOnly || disabled}
            dropdownClassName="ds-autocomplete-dropdown ps__child--consume"
            getPopupContainer={getPopupContainer || getParentNode}
            ref={antSelectRef}
            data-testid="autocomplete-autosize-input"
          />
        </AutosizeWrapper>
      </S.ComponentWrapper>
      {errorText && (
        <S.ErrorWrapper>
          <ErrorText>{errorText}</ErrorText>
        </S.ErrorWrapper>
      )}
      {description && (
        <S.DescWrapper>{description && <Description disabled={disabled}>{description}</Description>}</S.DescWrapper>
      )}
    </S.AutocompleteWrapper>
  );
};

Autocomplete.Option = AntdAutoComplete.Option;

export default Autocomplete;
