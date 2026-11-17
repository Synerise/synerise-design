import styled from 'styled-components';

import { commonCellStyles, commonPinnedStyles } from '../../../Table.styles';

const justifyMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
} as const;

/**
 * How far a child may paint above and below the wrapper. `--ds-shadows-shadow-1`, which the avatar
 * icon tile uses, reaches 16px down (4px offset + 12px blur).
 */
const SHADOW_BLEED = 16;

export const CellWrapper = styled.div<{
  $align?: 'left' | 'center' | 'right';
}>`
  overflow: hidden;
  /*
   * The wrapper hugs its content, so a child's shadow would be clipped right at its edge. The
   * padding grows the clip box; the equal negative margin cancels it, so the row keeps its height.
   * Vertical only — horizontal padding would let long content bleed into the next column.
   */
  padding: ${SHADOW_BLEED}px 0;
  margin: -${SHADOW_BLEED}px 0;
`;

export const Td = styled.td<{
  $height?: number;
  $width?: number;
  $align?: 'left' | 'center' | 'right';
  isSorted?: boolean;
  headerIndex?: number;
  isPinned?: 'left' | 'right' | false;
  rightOffset?: number;
  leftOffset?: number;
}>`
  ${commonCellStyles}
  ${commonPinnedStyles}
  text-align: ${(props) => props.$align ?? 'left'};

  &&&& {
    ${(props) =>
      props.isSorted &&
      `background-color: var(--ds-color-background-brand-subtle)`};
  }
  ${(props) =>
    props.headerIndex !== undefined
      ? `width: var(--col-${props.headerIndex}-width)`
      : props.$width && `width: ${props.$width}px`};

  ${(props) =>
    props.$height
      ? `
    padding: 0 24px;
    height: ${props.$height}px`
      : `
    padding: 16px 24px;
  `};

  ${CellWrapper} {
    display: flex;
    align-items: center;
    justify-content: ${(props) =>
      props.$align ? justifyMap[props.$align] : 'flex-start'};
    width: 100%;

    & > * {
      min-width: 0;
    }
  }
`;
