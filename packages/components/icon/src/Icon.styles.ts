import type { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

import { theme } from '@synerise/ds-core';

export const defaultSize = 24;
// L/XL icons default to a DARKER colour (grey-800) than M icons, which inherit currentColor.
// TODO(tokens): grey-800 has no matching semantic icon token — the icon family tops out at
// --ds-color-icon-base-default (grey-600). Needs a dedicated strong/emphasis default icon token
// defined upstream; kept on theme.palette until one exists.
export const DEFAULT_COLOR_TOKEN = 'grey-800';

export const IconContainer = styled.div<{
  size?: string | number;
  color?: string;
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
        props.color
          ? css`
              color: ${props.color};
              ${props.stroke && `stroke: ${props.color};`}
            `
          : css`
              color: inherit;

              /* Large/xlarge default to a darker colour than the inherited M default —
                 see DEFAULT_COLOR_TOKEN: grey-800 has no semantic icon token yet, needs one. */
              &.ds-icon-set-large,
              &.ds-icon-set-xlarge {
                color: ${
                  props.theme?.palette?.[DEFAULT_COLOR_TOKEN] ||
                  theme.palette[DEFAULT_COLOR_TOKEN]
                };
              }
            `}
    
    width: ${(props) => props.size || defaultSize}px;
    height: ${(props) => props.size || defaultSize}px;
    ${(props) => props.onClick && 'cursor: pointer;'};
`;
