import styled from 'styled-components';

import { resolveCustomColor } from '@synerise/ds-utils';

const INDENT_SIZE = 42;

const LEVEL_COLORS = [
  'yellow',
  'green',
  'cyan',
  'violet',
  'orange',
  'purple',
  'blue',
  'grey',
];

const getColorHue = (active: boolean, level: number): string => {
  if (level === LEVEL_COLORS.indexOf('cyan') && active) {
    return '500';
  }
  return active ? '600' : '200';
};

// Reversible per-level bar colour: the ad-hoc LEVEL_COLORS hue + shade is mapped through the shared
// `resolveCustomColor` helper to the `--ds-color-background-custom-<hue>-<shade>` token, so nesting-depth
// colours flip with the theme; `palette` is a last-resort fallback for any hue/shade it can't resolve.
const levelBarColor = (
  level: number,
  active: boolean,
  palette: Record<string, string>,
): string => {
  const key =
    level >= 0
      ? `${LEVEL_COLORS[level % LEVEL_COLORS.length]}-${getColorHue(active, level)}`
      : 'grey-600';
  return resolveCustomColor(key, palette[key]);
};

export const IndentsContainer = styled.div<{ $depth: number }>`
  position: absolute;
  top: 0;
  left: 36px;
  height: 100%;
  width: ${({ $depth }) => $depth * INDENT_SIZE}px;
  display: flex;
`;

export const IndentBar = styled.span<{ $level: number; $active: boolean }>`
  width: ${INDENT_SIZE}px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 2px;
    background-color: ${({ $level, $active, theme }) =>
      levelBarColor($level, $active, theme.palette)};
  }
`;

export const ExpanderWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 24px;
  margin-right: 8px;
  flex-shrink: 0;
`;

export const TreeCellWrapper = styled.div<{ $indentWidth: number }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: ${({ $indentWidth }) => $indentWidth}px;
`;

export const TreeTableRoot = styled.div`
  td {
    position: relative;
    font-weight: 500;
  }
`;

export { INDENT_SIZE, LEVEL_COLORS };
