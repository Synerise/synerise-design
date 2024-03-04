import React, { useRef, useEffect, MutableRefObject } from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdAutoComplete from 'antd/lib/auto-complete';
import { ErrorText, Description, Label } from '@synerise/ds-typography';
import Select from 'antd/lib/select';
import { AutosizeInput } from '@synerise/ds-input';
import { useResizeToFit } from '@synerise/ds-utils';
import { AutocompleteProps } from './Autocomplete.types';
import * as S from './Autocomplete.styles';

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
  } = props;
  const inputRef = useRef<Select | undefined>(undefined);
  const autocompleteInputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    handleInputRef && handleInputRef(inputRef);
  }, [inputRef, handleInputRef]);

  const getParentNode = (triggerNode: HTMLElement) => {
    return triggerNode.parentNode as HTMLElement;
  };

  const renderAutoCompleteComponent = () => {
    const Component = autoResize ? AutosizeInput : AntdAutoComplete;
    const autosizeProps = autoResize
      ? {
          transformRef: (el: HTMLElement) => el.querySelector('input'),
          refPropName: 'inputRef',
          extraWidth: 25,
          inputRef: (_inputRef: MutableRefObject<HTMLInputElement>, originalInput: HTMLDivElement) => {
            autocompleteInputRef.current = originalInput;
          },
        }
      : {};

    return (
      <Component
        {...(autoResize ? { renderInput: AntdAutoComplete, autoResize, ...autosizeProps } : {})}
        {...props}
        // @ts-ignore
        ref={inputRef}
        disabled={readOnly || disabled}
        dropdownClassName="ds-autocomplete-dropdown ps__child--consume"
        getPopupContainer={getPopupContainer || getParentNode}
      />
    );
  };

  const stretchToFit = typeof autoResize === 'object' && Boolean(autoResize.stretchToFit);

  const { observe, disconnect, elementRef } = useResizeToFit<HTMLDivElement>({
    onResize: (width: number) => {
      if (autocompleteInputRef.current) {
        autocompleteInputRef.current.style.maxWidth = `${width + 5}px`;
      }
    },
    autoObserve: true,
  });

  useEffect(() => {
    if (elementRef.current) {
      if (stretchToFit) {
        observe();
      } else {
        disconnect();
        if (autocompleteInputRef.current) {
          autocompleteInputRef.current.style.removeProperty('max-width');
        }
      }
    }
    return () => {
      disconnect();
    };
  }, [disconnect, observe, stretchToFit, elementRef]);

  return (
    <S.AutocompleteWrapper autoResize={autoResize} className={`ds-autocomplete ${className || ''}`}>
      {label && (
        <S.LabelWrapper>
          <Label>{label}</Label>
        </S.LabelWrapper>
      )}
      <S.ComponentWrapper ref={elementRef} readOnly={readOnly} error={!!errorText || error}>
        {renderAutoCompleteComponent()}
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
