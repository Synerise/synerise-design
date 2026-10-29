import type { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

export const defaultSize = 24;

export const IconContainer = styled.div<{
  size?: string | number;
  $color?: string;
  stroke?: boolean;
  onClick?: MouseEventHandler;
}>`
    vertical-align: middle;
    display: inline-block;
    width: ${(props) => props.size || defaultSize}px;
    height: ${(props) => props.size || defaultSize}px;
    color: inherit;

    svg {
      display: block;
      ${(props) =>
        props.$color
          ? css`
              color: ${props.$color};
              ${props.stroke && `stroke: ${props.$color};`}
            `
          : css`
              color: inherit;

              /* Large/xlarge default to a darker colour than the inherited M default. */
              &.ds-icon-set-large,
              &.ds-icon-set-xlarge {
                color: var(--ds-color-icon-base-strong);
              }
            `}
    
    width: ${(props) => props.size || defaultSize}px;
    height: ${(props) => props.size || defaultSize}px;
    ${(props) => props.onClick && 'cursor: pointer;'};
`;
