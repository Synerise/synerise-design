import styled, { css } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

type MatchingProps = ThemeProps & {
  matching: boolean;
  readOnly?: boolean;
  hovered?: boolean;
};

// UX 2026-07-22: matching/not-matching toggle text uses the semantic background
// solid/solidActive family (default = .solid / 600, hover = .solidActive / 700).
// ⚑ TOKEN CATEGORY MISMATCH — a `background-*` token driving TEXT colour; flagged by UX
// for later review. NB: `--ds-color-background-danger-solidactive` currently resolves to
// red-600 (not red-700), so the not-matching hover no longer darkens — upstream value to review.
// Dashed-underline gaps use `transparent` (UX 2026-07-22 dark-mode fix — show the surface behind).
const getColor = ({ matching, readOnly, hovered = false }: MatchingProps) => {
  if (readOnly) {
    return 'var(--ds-color-text-base-default)';
  }
  if (matching) {
    return hovered
      ? 'var(--ds-color-background-success-solidactive)'
      : 'var(--ds-color-background-success-solid)';
  }
  return hovered
    ? 'var(--ds-color-background-danger-solidactive)'
    : 'var(--ds-color-background-danger-solid)';
};

export const MatchingWrapper = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  color: var(--ds-color-text-base-default);
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
    const { readOnly } = props;
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
    transparent 0%
  );
  background-position: top;
  background-size: 4px 1px;
  background-repeat: repeat-x;
}`
    );
  }}

  ${(props) => {
    const hoveredColor = getColor({ ...props, hovered: true });
    const { readOnly } = props;
    return (
      !readOnly &&
      css`
 &:hover {
    color: ${hoveredColor};
    &:after {
      background-image: linear-gradient(
        to right,
        ${hoveredColor} 25%,
        transparent 0%
      );
    }
    `
    );
  }}
`;
