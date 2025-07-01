import type React from 'react';
import styled, { type SimpleInterpolation, css } from 'styled-components';

import { FLAG_SIZE_RATIO } from './Flag';

type Props = {
  size: number;
  onClick?: React.MouseEventHandler;
};

export const FlagContainer = styled.div<Props>`
  ${(props): SimpleInterpolation => css`
    vertical-align: middle;
    display: flex;
    width: ${props.size}px;
    height: ${FLAG_SIZE_RATIO * props.size}px;
  `}
`;
