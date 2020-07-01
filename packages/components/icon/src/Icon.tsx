import * as React from 'react';
import * as S from './Icon.styles';

export type IconProps = {
  color?: string;
  name?: string;
  title?: string;
  size?: string | number;
  stroke?: boolean;
  onClick?: React.MouseEventHandler;
  component?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

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
