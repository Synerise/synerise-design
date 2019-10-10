import * as React from 'react';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { ErrorText, Description, Label } from '@synerise/ds-typography';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import * as S from './Select.styles';

interface Props<T = SelectValue> extends SelectProps<T> {
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
}

class Select extends React.Component<Props> {
  static Option = S.AntdSelectOption;
  static OptGroup = S.AntdSelectOptGroup;

  render(): React.ReactNode {
    const { label, description, errorText, ...antdProps } = this.props;

    return (
      <>
        <S.LabelWrapper>{label && <Label>{label}</Label>}</S.LabelWrapper>
        <S.AntdSelect
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...antdProps}
          className={Boolean(errorText) && 'error'}
        />
        <S.ErrorWrapper>{errorText && <ErrorText>{errorText}</ErrorText>}</S.ErrorWrapper>
        <S.DescWrapper>
          {description && <Description disabled={antdProps.disabled}>{description}</Description>}
        </S.DescWrapper>
      </>
    );
  }
}

export default Select;
