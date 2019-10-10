import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { CheckboxProps } from 'antd/lib/checkbox';
import { Description, ErrorText } from '@synerise/ds-typography';
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
        <S.AntdCheckbox
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...antdCheckboxProps}
          className={Boolean(errorText) && 'error'}
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
