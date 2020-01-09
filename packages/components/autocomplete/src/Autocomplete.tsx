import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdAutoComplete, { AutoCompleteProps as OriginalProps } from 'antd/lib/auto-complete';
import { ErrorText, Description, Label } from '@synerise/ds-typography';
import * as S from './Autocomplete.styles';

export interface AutocompleteProps {
  getPopupContainer?: () => Element | undefined;
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
}

const getDefaultPopupContainer = (): HTMLElement => document.querySelector(`.ant-select-auto-complete`) as HTMLElement;

class Autocomplete extends React.PureComponent<AutocompleteProps & OriginalProps> {
  static Option = AntdAutoComplete.Option;

  render(): React.ReactElement {
    const { label, description, errorText, getPopupContainer, disabled } = this.props;
    return (
      <S.AutocompleteWrapper>
        {label && (
          <S.LabelWrapper>
            <Label>{label}</Label>
          </S.LabelWrapper>
        )}
        <AntdAutoComplete
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...this.props}
          getPopupContainer={getPopupContainer || getDefaultPopupContainer}
          className={errorText ? 'error' : undefined}
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
