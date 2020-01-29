import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { CheckboxProps as AntCheckboxProps } from 'antd/lib/checkbox';
import { Description, ErrorText } from '@synerise/ds-typography';
import * as S from './Checkbox.styles';

export interface CheckboxProps extends AntCheckboxProps {
  description?: string;
  errorText?: string;
}

class Checkbox extends React.Component<CheckboxProps> {
  static Group = S.AntdCheckbox.Group;

  render(): React.ReactNode {
    const { description, errorText, children, ...antdCheckboxProps } = this.props;

    return (
      <S.CheckboxWrapper className="ds-checkbox">
        <S.AntdCheckbox
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...antdCheckboxProps}
          className={errorText ? 'error' : undefined}
          solo={!children && !errorText && !description}
        >
          {children}
        </S.AntdCheckbox>
        <S.AdditionalData>
          {errorText && <ErrorText>{errorText}</ErrorText>}
          {description && <Description disabled={antdCheckboxProps.disabled}>{description}</Description>}
        </S.AdditionalData>
      </S.CheckboxWrapper>
    );
  }
}

export default Checkbox;
