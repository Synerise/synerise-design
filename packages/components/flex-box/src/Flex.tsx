import React, { forwardRef } from 'react';

import { StyledFlex } from './Flex.styles';
import { type FlexProps } from './Flex.types';

export const Flex = forwardRef<HTMLElement, FlexProps>(
  ({ gap, ...rest }, ref) => (
    <StyledFlex ref={ref as React.Ref<HTMLDivElement>} $gap={gap} {...rest} />
  ),
);

Flex.displayName = 'Flex';
