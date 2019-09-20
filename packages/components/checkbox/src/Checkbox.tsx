import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { CheckboxProps } from 'antd/lib/checkbox';
import * as S from './Checkbox.styles';

interface Props extends CheckboxProps {
  description?: string;
  errorText?: string;
}

class Checkbox extends React.Component<Props> {
  static Group = S.AntdCheckbox.Group;

  render(): React.ReactNode {
    const { description, errorText, children, ...antdCheckboxProps } = this.props;

    return (
      <S.CheckboxWrapper>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <S.AntdCheckbox {...antdCheckboxProps} className={Boolean(errorText) && 'error'}>
          {children}
        </S.AntdCheckbox>
        <S.AdditionalData>
          {errorText && <S.ErrorText>{errorText}</S.ErrorText>}
          {description && <S.Description disabled={antdCheckboxProps.disabled}>{description}</S.Description>}
        </S.AdditionalData>
      </S.CheckboxWrapper>
    );
  }
}

export default Checkbox;
