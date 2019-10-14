import styled, { css } from 'styled-components';

export const defaultSize = 24;

export const IconContainer = styled.div`
  ${(props): string => css`
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
