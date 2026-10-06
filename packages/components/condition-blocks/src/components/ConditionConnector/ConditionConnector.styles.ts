import styled from 'styled-components';

import { CONDITION_ROWS_GAP } from '../../constants';

/**
 * The tree-line connector cell (ported from ds-condition's `ConditionConnections`).
 *
 * The horizontal stub is drawn with `::before`; the vertical line with `::after`. Crucially the
 * cell *stretches to its row's full height* (`align-self: stretch`, no fixed height) so the
 * vertical line only ever has to fill its own cell and then bridge the fixed inter-row gap
 * (`CONDITION_ROWS_GAP`) to reach the next connector. This makes the line length independent of
 * the row's content — multi-line or custom error messages no longer break the connection.
 */
export const Connector = styled.span<{
  $first?: boolean;
  $last?: boolean;
  $readOnly?: boolean;
}>`
  display: flex;
  width: 32px;
  min-width: 32px;
  min-height: 32px;
  margin: 0;
  position: relative;
  /* Stretch to the row's cross size so the line spans whatever the row contains. */
  align-self: stretch;

  &:before {
    position: absolute;
    content: '';
    width: ${({ $first }) => ($first ? '100%' : '16px')};
    height: 1px;
    top: 16px;
    left: ${({ $first }) => ($first ? '0' : '16px')};
    background-color: ${({ theme }) => theme.palette['grey-300']};
  }

  &:after {
    display: ${({ $first, $last, $readOnly }) =>
      ($first && $last) || ($last && $readOnly) ? 'none' : 'flex'};
    position: absolute;
    content: '';
    width: 1px;
    left: 50%;
    background-color: ${({ theme }) => theme.palette['grey-300']};
    /* Start at this row's stub (first) or at the cell top (continuing from the row above). */
    top: ${({ $first }) => ($first ? '16px' : '0')};
    /* Last row: stop at this row's stub. Otherwise fill the cell and bridge the gap below. */
    bottom: ${({ $last }) =>
      $last ? 'calc(100% - 16px)' : `-${CONDITION_ROWS_GAP}px`};
  }
`;
