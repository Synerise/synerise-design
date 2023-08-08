import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdAutoComplete from 'antd/lib/auto-complete';
import { ErrorText, Description, Label } from '@synerise/ds-typography';
import { AutocompleteProps, StaticComponents } from 'Autocomplete.types';
import Select from 'antd/lib/select';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { AutosizeInput } from '@synerise/ds-input';
import * as S from './Autocomplete.styles';

const Autocomplete: React.FC<AutocompleteProps> & StaticComponents = props => {
  const { className, label, description, errorText, disabled, error, handleInputRef, autoResize } = props;
  const inputRef = React.useRef<Select | undefined>(undefined);

  React.useEffect(() => {
    handleInputRef && handleInputRef(inputRef);
  }, [inputRef, handleInputRef]);

  const getParentNode = (triggerNode: HTMLElement): HTMLElement => {
    return triggerNode.parentNode as HTMLElement;
  };

  const renderAutoCompleteComponent = (): React.ReactNode => {
    const Component = autoResize ? AutosizeInput : AntdAutoComplete;
    return (
      <Component
        {...(autoResize ? { renderInput: AntdAutoComplete, autoResize } : {})}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        ref={inputRef}
        dropdownClassName="ds-autocomplete-dropdown ps__child--consume"
        className={!!errorText || error ? 'error' : undefined}
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
      {renderAutoCompleteComponent()}
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
