import AntdAutoComplete from 'antd/lib/auto-complete';
import type { RefSelectProps } from 'antd/lib/select';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import FormField from '@synerise/ds-form-field';
import { type AutosizeInputRefType, AutosizeWrapper } from '@synerise/ds-input';
import Tooltip from '@synerise/ds-tooltip';
import { useResizeObserver } from '@synerise/ds-utils';

import * as S from './Autocomplete.styles';
import { type AutocompleteProps } from './Autocomplete.types';
import './style/index.less';
import { getIconsWidth } from './utils/getIconsWidth';

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
  icon1,
  icon1Tooltip,
  icon2,
  icon2Tooltip,
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
      autocompleteInputRef.current =
        autosizeRef.current.inputWrapperRef.current;
      inputRef.current = autosizeRef.current.inputRef.current;
    }
  }, []);

  const getParentNode = (triggerNode: HTMLElement) => {
    return triggerNode.parentNode as HTMLElement;
  };

  const stretchToFit =
    autoResize && autoResize !== true && Boolean(autoResize.stretchToFit);
  const placeholderString =
    typeof rest.placeholder === 'string' ? rest.placeholder : undefined;

  const handlePreAutosize = useCallback(() => {
    scrollLeftRef.current = inputRef.current?.scrollLeft || 0;
    autocompleteInputRef.current &&
      autocompleteInputRef.current.style.removeProperty('max-width');
  }, []);

  const handleAutosize = useCallback(() => {
    const parentRect =
      elementRef.current && elementRef.current.getBoundingClientRect();
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
  const iconCount = +!!icon1 + +!!icon2;

  const handleIconsClick = useCallback(() => {
    antSelectRef.current?.focus();
  }, []);

  const icons = useMemo(() => {
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
      <>
        {(icon1WithTooltip || icon2WithTooltip) && (
          <S.IconWrapper onClick={handleIconsClick}>
            {icon1WithTooltip} {icon2WithTooltip}
          </S.IconWrapper>
        )}
      </>
    );
  }, [handleIconsClick, icon1, icon2, icon1Tooltip, icon2Tooltip]);

  return (
    <S.AutocompleteWrapper
      ref={elementRef}
      autoResize={autoResize}
      className={`ds-autocomplete ${className || ''}`}
    >
      <FormField
        label={label}
        tooltip={tooltip}
        tooltipConfig={tooltipConfig}
        description={description}
        errorText={errorText}
      >
        <S.ComponentWrapper
          readOnly={readOnly}
          error={!!errorText || error}
          iconCount={iconCount}
        >
          <AutosizeWrapper
            autoResize={!!autoResize}
            value={rest.value}
            placeholder={placeholderString}
            transformRef={transformRef}
            ref={autosizeRef}
            extraWidth={AUTOSIZE_EXTRA_WIDTH + getIconsWidth(iconCount)}
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
            {icons}
          </AutosizeWrapper>
        </S.ComponentWrapper>
      </FormField>
    </S.AutocompleteWrapper>
  );
};

Autocomplete.Option = AntdAutoComplete.Option;

export default Autocomplete;
