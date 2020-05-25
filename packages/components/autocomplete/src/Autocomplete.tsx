import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdAutoComplete, { AutoCompleteProps as OriginalProps } from 'antd/lib/auto-complete';
import { ErrorText, Description, Label } from '@synerise/ds-typography';
import * as S from './Autocomplete.styles';

export type OverrideProps = {
  className?: string;
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  error?: boolean;
};

export type AutocompleteProps = OverrideProps & OriginalProps;

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
