import React from 'react';

import * as S from './Icon.styles';
import { type IconProps } from './Icon.types';

const Icon = ({ name, component, className, ...rest }: IconProps) => {
  return (
    <S.IconContainer
      className={`ds-icon ${className || ''}`}
      title={name}
      {...rest}
    >
      {component}
    </S.IconContainer>
  );
};

export default Icon;
