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
  className?: string;
  style?: React.CSSProperties;
};

const Icon: React.FC<IconProps> = props => {
  const { color, name, size, type, stroke, onClick, component, className, style } = props;

  return (
    <S.IconContainer
      className={className}
      style={style}
      color={color}
      title={name}
      size={size}
      type={type}
      stroke={stroke}
      onClick={onClick}
    >
      {component}
    </S.IconContainer>
  );
};

export default Icon;
