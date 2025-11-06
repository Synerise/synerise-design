import React, { forwardRef } from 'react';

import * as S from './Icon.styles';
import { type IconProps } from './Icon.types';

const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ name, component, className, ...rest }, ref) => {
    return (
      <S.IconContainer
        className={`ds-icon ${className || ''}`}
        title={name}
        ref={ref}
        {...rest}
      >
        {component}
      </S.IconContainer>
    );
  },
);

export default Icon;
