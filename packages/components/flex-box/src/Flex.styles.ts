import styled from 'styled-components';

import { Flex as RebassFlex } from '@rebass/grid';

const resolveGap = (
  gap: number | string | undefined,
  space?: number[],
): string | undefined => {
  if (gap === undefined) {
    return undefined;
  }
  if (typeof gap === 'string') {
    return gap;
  }
  const scaled = space?.[gap];
  return `${scaled ?? gap}px`;
};

export const StyledFlex = styled(RebassFlex)<{ $gap?: number | string }>`
  ${({ $gap, theme }) => {
    const value = resolveGap($gap, theme?.space);
    return value ? `gap: ${value};` : '';
  }}
`;
