import * as React from 'react';
import * as S from './Icon.styles';
import { IconProps } from './Icon.types';

const Icon: React.FC<IconProps> = props => {
  const { color, name, size, stroke, onClick, component, className, style, ...rest } = props;

  return (
    <S.IconContainer
      className={`ds-icon ${className || ''}`}
      style={style}
      color={color}
      title={name}
      size={size}
      stroke={stroke}
      onClick={onClick}
      {...rest}
    >
      {component}
    </S.IconContainer>
  );
};

export default Icon;
