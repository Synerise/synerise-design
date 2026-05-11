import React from 'react';

import * as S from './ButtonGroup.styles';
import { type ButtonGroupProps } from './ButtonGroup.types';

const sizeClassMap: Record<string, string> = { large: 'lg', small: 'sm' };

const ButtonGroup = ({
  className,
  style,
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
}: ButtonGroupProps) => {
  const sizeCls = size ? sizeClassMap[size] || '' : '';
  const groupClass = ['ant-btn-group', sizeCls && `ant-btn-group-${sizeCls}`]
    .filter(Boolean)
    .join(' ');

  const sizedChildren = size
    ? React.Children.map(children, (child) =>
        React.isValidElement<{ size?: typeof size }>(child)
          ? React.cloneElement(child, { size })
          : child,
      )
    : children;

  return (
    <S.Container
      className={`ds-button-group ${className || ''}`}
      style={style}
      fullWidth={fullWidth}
      buttonsPosition={buttonsPosition}
      disabled={disabled}
      splitMode={splitMode}
      compact={compact}
      error={error}
    >
      {title && <S.Title>{title}</S.Title>}
      <div className={groupClass}>{sizedChildren}</div>
      {description && <S.Description>{description}</S.Description>}
    </S.Container>
  );
};

export default ButtonGroup;
