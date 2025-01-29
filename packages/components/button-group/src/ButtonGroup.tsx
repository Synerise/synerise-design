import React from 'react';
import Button from 'antd/lib/button';
import * as S from './ButtonGroup.styles';
import { ButtonGroupProps } from './ButtonGroup.types';

const ButtonGroup = ({
  className,
  children,
  title,
  description,
  size,
  fullWidth,
  buttonsPosition = 'center',
  disabled,
  splitMode,
  error,
}: ButtonGroupProps) => (
  <S.Container
    className={`ds-button-group ${className || ''}`}
    fullWidth={fullWidth}
    buttonsPosition={buttonsPosition}
    disabled={disabled}
    splitMode={splitMode}
    error={error}
  >
    {title && <S.Title>{title}</S.Title>}
    <Button.Group size={size}>{children}</Button.Group>
    {description && <S.Description>{description}</S.Description>}
  </S.Container>
);

export default ButtonGroup;
