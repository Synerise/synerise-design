import * as React from 'react';
import Button, { ButtonGroupProps as AntButtonGroupProps } from 'antd/lib/button';
import * as S from './ButtonGroup.styles';

export interface ButtonGroupProps extends AntButtonGroupProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  fullWidth?: boolean;
  buttonsPosition?: string | 'left' | 'center' | 'right';
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  className,
  children,
  title,
  description,
  size,
  fullWidth,
  buttonsPosition = 'center',
}) => (
  <S.Container className={`ds-button-group ${className}`} fullWidth={fullWidth} buttonsPosition={buttonsPosition}>
    {title && <S.Title>{title}</S.Title>}
    <Button.Group size={size}>{children}</Button.Group>
    {description && <S.Description>{description}</S.Description>}
  </S.Container>
);

export default ButtonGroup;
