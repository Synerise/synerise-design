import React, { forwardRef } from 'react';

import * as S from './Icon.styles';
import { type IconProps } from './Icon.types';
import { useIconComponent } from './useIconComponent';

const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ name, iconName, component, className, ...rest }, ref) => {
    const IconComponent = useIconComponent(iconName);

    const renderedIcon = IconComponent ? <IconComponent /> : component;

    return (
      <S.IconContainer
        className={`ds-icon ${className || ''}`}
        title={name || iconName}
        ref={ref}
        {...rest}
      >
        {renderedIcon}
      </S.IconContainer>
    );
  },
);

export default Icon;
