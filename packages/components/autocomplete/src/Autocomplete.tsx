import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdAutoComplete from 'antd/lib/auto-complete';
import { ErrorText, Description, Label } from '@synerise/ds-typography';
import { AutocompleteProps, StaticComponents } from 'Autocomplete.types';
import Select from 'antd/lib/select';
import * as S from './Autocomplete.styles';

const Autocomplete: React.FC<AutocompleteProps> & StaticComponents = props => {
  const {
    className,
    label,
    description,
    errorText,
    disabled,
    error,
    handleInputRef,
    autoResize,
    ...antdAutocompleteProps
  } = props;
  const inputRef = React.useRef<Select | undefined>(undefined);

  React.useEffect(() => {
    handleInputRef && handleInputRef(inputRef);
  }, [inputRef, handleInputRef]);

  return (
    <S.AutocompleteWrapper className={`ds-autocomplete ${className || ''}`}>
      {label && (
        <S.LabelWrapper>
          <Label>{label}</Label>
        </S.LabelWrapper>
      )}
      <AntdAutoComplete
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        {...(autoResize
          ? {
              style: {
                width: `${antdAutocompleteProps.value && antdAutocompleteProps.value.toString().length + 1}3px`,
              },
            }
          : {})}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        ref={inputRef}
        dropdownClassName="ds-autocomplete-dropdown"
        className={!!errorText || error ? 'error' : undefined}
      />
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
