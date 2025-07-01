import Button from 'antd/lib/button';
import React from 'react';

import * as S from './ButtonGroup.styles';
import { type ButtonGroupProps } from './ButtonGroup.types';

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
  compact = true,
  error,
}: ButtonGroupProps) => (
  <S.Container
    className={`ds-button-group ${className || ''}`}
    fullWidth={fullWidth}
    buttonsPosition={buttonsPosition}
    disabled={disabled}
    splitMode={splitMode}
    compact={compact}
    error={error}
  >
    {title && <S.Title>{title}</S.Title>}
    <Button.Group size={size}>{children}</Button.Group>
    {description && <S.Description>{description}</S.Description>}
  </S.Container>
);

export default ButtonGroup;
