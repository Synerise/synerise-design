import * as React from 'react';
import * as S from './Icon.styles';

type IconProps = {
  color?: string;
  name: string;
  title?: string;
  size?: string | number;
  type?: string;
  stroke?: boolean;
  onClick?: EventListener;
};

const camelCase = (string): string => {
  const iconName = string.replace(/(?:(^.)|([-\s]+.))/g, (match: string) => {
    return match.charAt(match.length - 1).toUpperCase();
  });

  return iconName;
};

const importSVG = (props): React.FC => {
  // eslint-disable-next-line
  return require(`../icon-components/${props}`).default;
};

const Icon: React.FC<IconProps> = props => {
  const { color, name, size, type, stroke, onClick } = props;
  const nameReplace = camelCase(name);
  const IconComponent = importSVG(nameReplace);

  return (
    <S.IconContainer color={color} title={name} name={name} size={size} type={type} stroke={stroke} onClick={onClick}>
      <IconComponent />
    </S.IconContainer>
  );
};

export default Icon;
