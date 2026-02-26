import React, { forwardRef } from 'react';

import { DEFAULT_PADDING, DEFAULT_RADIUS } from './Panel.const';
import * as S from './Panel.styles';
import type { PanelProps } from './Panel.types';

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ children, radius = DEFAULT_RADIUS, ...props }, ref) => {
    return (
      <S.PanelWrapper ref={ref} p={DEFAULT_PADDING} $radius={radius} {...props}>
        {children}
      </S.PanelWrapper>
    );
  },
);
export default Panel;
