import React, { useRef, useEffect } from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdAutoComplete from 'antd/lib/auto-complete';
import { ErrorText, Description, Label } from '@synerise/ds-typography';
import Select from 'antd/lib/select';
import { AutosizeInput } from '@synerise/ds-input';
import { AutocompleteProps } from './Autocomplete.types';
import * as S from './Autocomplete.styles';

const Autocomplete = (props: AutocompleteProps) => {
  const { className, label, description, errorText, disabled, error, handleInputRef, autoResize, readOnly } = props;
  const inputRef = useRef<Select | undefined>(undefined);

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
          extraWidth: 24,
        }
      : {};

    return (
      <Component
        {...(autoResize ? { renderInput: AntdAutoComplete, autoResize, autosizeProps } : {})}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        // @ts-ignore
        ref={inputRef}
        disabled={readOnly || disabled}
        dropdownClassName="ds-autocomplete-dropdown ps__child--consume"
        getPopupContainer={getParentNode}
      />
    );
  };

  return (
    <S.AutocompleteWrapper autoResize={autoResize} className={`ds-autocomplete ${className || ''}`}>
      {label && (
        <S.LabelWrapper>
          <Label>{label}</Label>
        </S.LabelWrapper>
      )}
      <S.ComponentWrapper readOnly={readOnly} error={!!errorText || error}>
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
