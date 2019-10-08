import * as React from 'react';
import * as S from './Icon.styles';

type IconProps = {
  color?: string;
  name?: string;
  title?: string;
  size?: string | number;
  type?: string;
  stroke?: boolean;
  onClick?: EventListener;
  component?: React.ReactNode;
};

const Icon: React.FC<IconProps> = props => {
  const { color, name, size, type, stroke, onClick, component } = props;

  return (
    <S.IconContainer color={color} title={name} size={size} type={type} stroke={stroke} onClick={onClick}>
      {component}
    </S.IconContainer>
  );
};

export default Icon;
