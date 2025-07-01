import styled, { css } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

type MatchingProps = ThemeProps & {
  matching: boolean;
  readOnly?: boolean;
  hovered?: boolean;
};

const getColor = ({
  theme,
  matching,
  readOnly,
  hovered = false,
}: MatchingProps) => {
  if (readOnly) {
    return theme.palette[`grey-800`];
  }
  const hue = hovered ? '700' : '600';
  return theme.palette[matching ? `green-${hue}` : `red-${hue}`];
};

export const MatchingWrapper = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  color: ${(props) => props.theme.palette['grey-800']};
  text-align: left;
  user-select: none;
  &:first-letter {
    text-transform: uppercase;
  }
`;

export const Toggle = styled.span<{ matching: boolean; readOnly?: boolean }>`
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  color: ${getColor};

  transition: color 0.1s ease-in-out;
  position: relative;
  display: inline-flex;

  ${(props) => {
    const color = getColor(props);
    const { readOnly, theme } = props;
    return (
      !readOnly &&
      `
&:after {
  position: absolute;
  bottom: -2px;
  width: 100%;
  content: '';
  height: 1px;
  left: 1px;
  background-image: linear-gradient(
    to right,
    ${color} 25%,
    ${theme.palette.white} 0%
  );
  background-position: top;
  background-size: 4px 1px;
  background-repeat: repeat-x;
}`
    );
  }}

  ${(props) => {
    const hoveredColor = getColor({ ...props, hovered: true });
    const { readOnly, theme } = props;
    return (
      !readOnly &&
      css`
 &:hover {
    color: ${hoveredColor};
    &:after {
      background-image: linear-gradient(
        to right,
        ${hoveredColor} 25%,
        ${theme.palette.white} 0%
      );
    }
    `
    );
  }}
`;
