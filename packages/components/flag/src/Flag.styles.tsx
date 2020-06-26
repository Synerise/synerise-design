import styled, { css, SimpleInterpolation } from 'styled-components';
import * as React from 'react';

export const defaultSize = 24;

type Props = {
  size?: string | number;
  onClick?: React.MouseEventHandler;
};

export const FlagContainer = styled.div<Props>`
  ${(props): SimpleInterpolation => css`
    vertical-align: middle;
    display: inline-block;
    width: ${props.size || defaultSize}px;
    height: ${props.size || defaultSize}px;
  `}
`;
