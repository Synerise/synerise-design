import React, { useRef, useEffect, useCallback } from 'react';
import './style/index.less';

import AntdAutoComplete from 'antd/lib/auto-complete';
import type { RefSelectProps } from 'antd/lib/select';

import FormField from '@synerise/ds-form-field';
import { AutosizeWrapper } from '@synerise/ds-input';
import type { AutosizeInputRefType } from '@synerise/ds-input';
import { useResizeObserver } from '@synerise/ds-utils';

import { AutocompleteProps } from './Autocomplete.types';
import * as S from './Autocomplete.styles';

const AUTOSIZE_EXTRA_WIDTH = 27;

const Autocomplete = ({
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
  tooltip,
  tooltipConfig,
  ...rest
}: AutocompleteProps) => {
  const scrollLeftRef = useRef(0);
  const antSelectRef = useRef<RefSelectProps | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autosizeRef = useRef<AutosizeInputRefType | null>(null);
  const autocompleteInputRef = useRef<HTMLElement | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    handleInputRef && handleInputRef(antSelectRef);
  }, [antSelectRef, handleInputRef]);

  useEffect(() => {
    if (autosizeRef.current) {
      autocompleteInputRef.current = autosizeRef.current.inputWrapperRef.current;
      inputRef.current = autosizeRef.current.inputRef.current;
    }
  }, []);

  const getParentNode = (triggerNode: HTMLElement) => {
    return triggerNode.parentNode as HTMLElement;
  };

  const stretchToFit = autoResize && autoResize !== true && Boolean(autoResize.stretchToFit);
  const placeholderString = typeof rest.placeholder === 'string' ? rest.placeholder : undefined;

  const handlePreAutosize = useCallback(() => {
    scrollLeftRef.current = inputRef.current?.scrollLeft || 0;
    autocompleteInputRef.current && autocompleteInputRef.current.style.removeProperty('max-width');
  }, []);

  const handleAutosize = useCallback(() => {
    const parentRect = elementRef.current && elementRef.current.getBoundingClientRect();
    if (stretchToFit && autocompleteInputRef.current && parentRect?.width) {
      autocompleteInputRef.current.style.maxWidth = `${parentRect?.width + 1}px`;
      inputRef.current && inputRef.current.scrollTo(scrollLeftRef.current, 0);
    }
  }, [stretchToFit]);

  const handleWrapperResize = useCallback(() => {
    handlePreAutosize();
    handleAutosize();
  }, [handleAutosize, handlePreAutosize]);

  const transformRef = useCallback((element: HTMLElement) => {
    autocompleteInputRef.current = element as HTMLDivElement;
    return element.querySelector('input') as HTMLInputElement;
  }, []);

  useResizeObserver(elementRef, handleWrapperResize);

  return (
    <S.AutocompleteWrapper ref={elementRef} autoResize={autoResize} className={`ds-autocomplete ${className || ''}`}>
      <FormField
        label={label}
        tooltip={tooltip}
        tooltipConfig={tooltipConfig}
        description={description}
        errorText={errorText}
      >
        <S.ComponentWrapper readOnly={readOnly} error={!!errorText || error}>
          <AutosizeWrapper
            autoResize={!!autoResize}
            value={rest.value}
            placeholder={placeholderString}
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
      </FormField>
    </S.AutocompleteWrapper>
  );
};

Autocomplete.Option = AntdAutoComplete.Option;

export default Autocomplete;
