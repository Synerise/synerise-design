import * as React from 'react';
import { ButtonProps } from 'antd/lib/button';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';

import { JustifyContentProperty } from 'csstype';

import Icon from '@synerise/ds-icon';
import { SpinnerM } from '@synerise/ds-icon/dist/icons';
import AntdButton, * as S from './Button.styles';

export interface Props extends Omit<ButtonProps, 'type'> {
  type?:
    | string
    | 'default'
    | 'primary'
    | 'ghost'
    | 'dashed'
    | 'danger'
    | 'link'
    | 'success'
    | 'flat'
    | 'warning'
    | 'tertiary-white'
    | 'ghost-primary'
    | 'ghost-white';
  mode?: string;
  justifyContent?: JustifyContentProperty;
  spinner?: boolean;
}

const Button: React.FC<Props> = ({ type, mode, justifyContent = 'center', spinner = false, ...antdProps }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AntdButton justifyContent={justifyContent} type={type} mode={mode} spinner={spinner} {...antdProps}>
      {antdProps.children}
      {spinner && (
        <S.Spinner data-testid="button-spinner">
          <Icon component={<SpinnerM />} color="#fff" />
        </S.Spinner>
      )}
    </AntdButton>
  );
};

export default Button;
