import styled, { css, SimpleInterpolation } from 'styled-components';
import * as React from 'react';

export const defaultSize = 24;

type Props = {
  size?: string | number;
  color?: string;
  stroke?: boolean;
  onClick?: React.MouseEventHandler;
};

export const IconContainer = styled.div<Props>`
  ${(props): SimpleInterpolation => css`
      vertical-align: middle;
      display: inline-block;
      width: ${props.size || defaultSize}px;
      height: ${props.size || defaultSize}px;
      color: inherit;
    svg {
        display: block;
        fill: ${props.color};
        color: ${props.color};
        width: ${props.size || defaultSize}px;
        height: ${props.size || defaultSize}px;
        ${props.onClick && 'cursor: pointer;'};
        ${props.stroke &&
          css`
            stroke: ${props.color};
          `};
      `};
`;
