import * as React from 'react';
import * as S from './Icon.styles';
import * as Icons from '../icon-components';

type IconProps = {
  color?: string;
  name: string;
  title?: string;
  size?: string | number;
  type?: string;
  stroke?: boolean;
  onClick?: EventListener;
};

interface MapIconComponents<T> {
  [key: string]: T;
}

const mapIconComponents = (item): MapIconComponents<React.FC> => {
  return Object.entries(item).reduce((obj, i: [string, React.FC]) => {
    const reducedObject = obj;
    reducedObject[i[0].toUpperCase()] = React.createElement(i[1]);
    return reducedObject;
  }, {});
};

const iconMap = mapIconComponents(Icons);

const Icon: React.FC<IconProps> = props => {
  const { color, name, size, type, stroke, onClick } = props;
  const nameReplace = name.replace(/-/g, '').toUpperCase();
  return (
    <S.IconContainer color={color} title={name} name={name} size={size} type={type} stroke={stroke} onClick={onClick}>
      {iconMap[nameReplace]}
    </S.IconContainer>
  );
};

export default Icon;
