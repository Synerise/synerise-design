import styled, {
  type FlattenSimpleInterpolation,
  css,
  keyframes,
} from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import { macro } from '@synerise/ds-typography';

import { type Status } from './Badge.types';

// Colour props are transient ($-prefixed) so they are not forwarded to the DOM element.
type ColorProps = { $status?: Status; $customColor?: string };
type PositionProps = { $standalone?: boolean };

const STATUS_COLOR_TOKEN: Record<Exclude<Status, undefined>, string> = {
  active: 'green-600',
  inactive: 'grey-400',
  blocked: 'red-600',
  processing: 'blue-600',
  warning: 'yellow-600',
};

const resolveCustomColor = (
  theme: ThemeProps['theme'],
  customColor: string,
): string => {
  const paletteColor =
    customColor.indexOf('-') >= 0
      ? theme.palette[customColor]
      : theme.palette[`${customColor}-600`];
  // Fall back to the raw value so any CSS colour (e.g. a hex outside the palette) works.
  return paletteColor ?? customColor;
};

// Background: custom colour → status colour → red default. Consumers that want a
// different look (e.g. a neutral count chip) override it with an inline `style`.
const resolveColor = (props: ColorProps & ThemeProps): string => {
  const { theme, $customColor, $status } = props;
  if ($customColor) {
    return resolveCustomColor(theme, $customColor);
  }
  if ($status) {
    return theme.palette[STATUS_COLOR_TOKEN[$status]];
  }
  return theme.palette['red-600'];
};

// Indicator positioning: overlaid (top-right) when wrapping children, inline when standalone.
const indicatorPosition = (standalone?: boolean): FlattenSimpleInterpolation =>
  standalone
    ? css`
        position: relative;
        top: auto;
        right: auto;
        display: inline-block;
        vertical-align: middle;
        transform: none;
      `
    : css`
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0%;
      `;

export const afterElementAnimation = keyframes`
  0% {
    transform: translate3d(-5px, -5px, 0) scale(0.3);
    opacity: 0.9;
  }
  100% {
    transform: translate3d(-5px, -5px, 0) scale(1.5);
    opacity: 0;
  }
`;

export const beforeElementAnimation = keyframes`
  0% {
    transform: translate3d(-2px, -2px, 0) scale(0.5);
    opacity: 0.9;
  }
  100% {
    transform: translate3d(-2px, -2px, 0) scale(1.5);
    opacity: 0;
  }
`;

export const Wrapper = styled.span`
  position: relative;
  display: inline-block;
  line-height: 1;
`;

export const CountSup = styled.sup<
  ColorProps & PositionProps & { $outlined?: boolean }
>`
  z-index: auto;
  ${(props): FlattenSimpleInterpolation =>
    indicatorPosition(props.$standalone)};
  min-width: 16px;
  height: 16px;
  padding: 0 3px;
  white-space: nowrap;
  text-align: center;
  border-radius: 8px;
  background-color: ${(props): string => resolveColor(props)};
  color: ${(props): string => props.theme.palette.white};
  box-shadow: ${(props): string =>
    props.$outlined ? `0 0 0 1px ${props.theme.palette.white}` : 'none'};
`;

export const ScrollNumberOnly = styled.span`
  display: inline-block;
  height: 16px;
`;

export const Current = styled.span`
  ${macro.h200};
  height: 16px;
  line-height: 16px;
  font-weight: 400;
  color: inherit;
`;

export const CustomCountSup = styled.sup<PositionProps>`
  z-index: auto;
  ${(props): FlattenSimpleInterpolation =>
    indicatorPosition(props.$standalone)};
`;

export const DotSup = styled.sup<
  ColorProps & PositionProps & { $flag?: boolean; $pulsing?: boolean }
>`
  z-index: auto;
  ${(props): FlattenSimpleInterpolation =>
    indicatorPosition(props.$standalone)};
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props): string => resolveColor(props)};

  ${(props): FlattenSimpleInterpolation | false =>
    (!!props.$flag || !!props.$status) &&
    css`
      box-sizing: border-box;
      width: 10px;
      height: 10px;
      overflow: visible;
      border: 2px solid ${props.theme.palette.white};
      box-shadow: none;

      &::before {
        display: ${props.$flag ? 'flex' : 'none'};
        content: ${props.$flag ? "''" : 'none'};
        transform: translate3d(-2px, -2px, 0);
        transform-origin: center;
        ${props.$pulsing &&
        css`
          position: absolute;
          top: 0;
          left: 0;
          width: 10px;
          height: 10px;
          background-color: inherit;
          border-radius: 50%;
          animation: ${beforeElementAnimation} 2s infinite;
        `}
      }

      &::after {
        display: ${props.$flag ? 'flex' : 'none'};
        content: ${props.$flag ? "''" : 'none'};
        transform: translate3d(-5px, -5px, 0);
        transform-origin: center;
        ${props.$pulsing &&
        css`
          position: absolute;
          top: 0;
          left: 0;
          width: 16px;
          height: 16px;
          background-color: inherit;
          border-radius: 50%;
          animation: ${afterElementAnimation} 2s infinite;
        `}
      }
    `}
`;
