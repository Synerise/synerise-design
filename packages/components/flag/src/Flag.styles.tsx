import styled, { css, SimpleInterpolation } from 'styled-components';
import * as React from 'react';
import { FLAG_SIZE_RATIO } from './Flag';

type Props = {
  size: number;
  onClick?: React.MouseEventHandler;
};

// eslint-disable-next-line import/prefer-default-export
export const FlagContainer = styled.div<Props>`
  ${(props): SimpleInterpolation => css`
    vertical-align: middle;
    display: flex;
    width: ${props.size}px;
    height: ${FLAG_SIZE_RATIO * props.size}px;
  `}
`;
