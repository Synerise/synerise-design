import * as React from 'react';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { ErrorText, Description } from '@synerise/ds-typography';
import { Label } from '@synerise/ds-input';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import * as S from './Select.styles';

interface Props<T = SelectValue> extends SelectProps<T> {
  errorText?: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  tooltip?: React.ReactNode;
}

class Select extends React.Component<Props> {
  static Option = S.AntdSelectOption;
  static OptGroup = S.AntdSelectOptGroup;

  render(): React.ReactNode {
    const { label, description, errorText, tooltip, ...antdProps } = this.props;

    return (
      <>
        <Label label={label} tooltip={tooltip} />
        <S.AntdSelect
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...antdProps}
          className={errorText ? 'error' : undefined}
        />
        {errorText && (
          <S.ErrorWrapper>
            <ErrorText>{errorText}</ErrorText>
          </S.ErrorWrapper>
        )}
        {description && (
          <S.DescWrapper>
            {description && <Description disabled={antdProps.disabled}>{description}</Description>}
          </S.DescWrapper>
        )}
      </>
    );
  }
}

export default Select;
