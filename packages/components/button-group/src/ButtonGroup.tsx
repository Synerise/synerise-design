import * as React from 'react';
import Button, { ButtonGroupProps as AntButtonGroupProps } from 'antd/lib/button';
import * as S from './ButtonGroup.styles';

export interface ButtonGroupProps extends AntButtonGroupProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ className, children, title, description, size }) => (
  <S.Container className={`ds-button-group ${className}`}>
    {title && <S.Title>{title}</S.Title>}
    <Button.Group size={size}>{children}</Button.Group>
    {description && <S.Description>{description}</S.Description>}
  </S.Container>
);

export default ButtonGroup;
