import * as React from 'react';
import Button from 'antd/lib/button';
import * as S from './ButtonGroup.styles';
import { ButtonGroupProps } from './ButtonGroup.types';

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  className,
  children,
  title,
  description,
  size,
  fullWidth,
  buttonsPosition = 'center',
  disabled,
  splitMode,
}) => (
  <S.Container
    className={`ds-button-group ${className || ''}`}
    fullWidth={fullWidth}
    buttonsPosition={buttonsPosition}
    disabled={disabled}
    splitMode={splitMode}
  >
    {title && <S.Title>{title}</S.Title>}
    <Button.Group size={size}>{children}</Button.Group>
    {description && <S.Description>{description}</S.Description>}
  </S.Container>
);

export default ButtonGroup;
