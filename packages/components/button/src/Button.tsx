import * as React from 'react';
import { ButtonProps } from 'antd/lib/button';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';

import AntdButton from './Button.styles';

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
}

const Button: React.FC<Props> = ({ type, mode, ...antdProps }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AntdButton type={type} mode={mode} {...antdProps}>
      {antdProps.children}
    </AntdButton>
  );
};

export default Button;
