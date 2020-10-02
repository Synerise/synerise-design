import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdAutoComplete from 'antd/lib/auto-complete';
import { ErrorText, Description, Label } from '@synerise/ds-typography';
import { AutocompleteProps } from 'Autocomplete.types';
import * as S from './Autocomplete.styles';

class Autocomplete extends React.PureComponent<AutocompleteProps> {
  static Option = AntdAutoComplete.Option;

  render(): React.ReactElement {
    const { className, label, description, errorText, disabled, error } = this.props;
    return (
      <S.AutocompleteWrapper className={`ds-autocomplete ${className || ''}`}>
        {label && (
          <S.LabelWrapper>
            <Label>{label}</Label>
          </S.LabelWrapper>
        )}
        <AntdAutoComplete
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...this.props}
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
  }
}

export default Autocomplete;
