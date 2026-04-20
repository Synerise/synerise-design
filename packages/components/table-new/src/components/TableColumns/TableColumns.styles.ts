import styled, { css } from 'styled-components';

import {
  commonCellStyles,
  commonPinnedStyles,
  commonRowStyles,
} from '../../Table.styles';
import { ToggleButton } from './TableColumnSorter/TableColumnSorter.styles';

export const Th = styled.th<{
  isSorted?: boolean;
  hasSorter?: boolean;
  headerIndex?: number;
  isPinned?: 'left' | 'right' | false;
  rightOffset?: number;
  leftOffset?: number;
  $align?: 'left' | 'center' | 'right';
}>`
  ${commonCellStyles};
  ${commonPinnedStyles};
  height: 64px;
  text-align: ${(props) => props.$align ?? 'left'};
  background-color: ${(props) => props.theme.palette['white']};
  border-bottom: solid 1px ${(props) => props.theme.palette['grey-300']};
  color: ${(props) => props.theme.palette['grey-700']};

  ${(props) =>
    props.headerIndex !== undefined &&
    `width: var(--col-${props.headerIndex}-width)`};

  ${(props) =>
    props.hasSorter &&
    css`
      ${ToggleButton} {
        opacity: 0;
      }
      &:hover {
        background-color: ${props.theme.palette['grey-050']};
        border-bottom: solid 1px ${props.theme.palette['grey-400']};
        box-shadow: inset 0 -1px 0 ${props.theme.palette['grey-400']};
        ${ToggleButton} {
          opacity: 1;
        }
      }
    `}
  & {
    ${(props) =>
      props.isSorted &&
      css`
        & {
          ${ToggleButton} {
            opacity: 1;
          }
          background-color: ${props.theme.palette['blue-050']};
          border-bottom: solid 1px ${props.theme.palette['blue-400']};
          box-shadow: inset 0 -1px 0 ${props.theme.palette['blue-400']};
        }
        &:hover {
          background-color: ${props.theme.palette['blue-100']};
          border-bottom: solid 1px ${props.theme.palette['blue-600']};
          box-shadow: inset 0 -1px 0 ${props.theme.palette['blue-600']};
        }
      `}
  }
`;

export const THead = styled.thead``;

export const Tr = styled.tr`
  ${commonRowStyles}
`;

const justifyMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
} as const;

export const HeaderWrapper = styled.div<{
  $align?: 'left' | 'center' | 'right';
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.$align ? justifyMap[props.$align] : 'space-between'};
  font-weight: 500;
`;

export const Label = styled.div<{ disableColumnNamesLineBreak?: boolean }>`
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 0;
  flex-grow: 1;
  white-space: ${(props): string =>
    props.disableColumnNamesLineBreak ? 'nowrap' : 'normal'};
`;

export const TableSkeletonCell = styled.div<{
  $height?: number;
  $width?: string;
}>`
  display: flex;
  height: ${(props) => (props.$height ? `${props.$height}px` : 'auto')};
  width: ${(props) => `${props.$width}` || '50%'};
  align-items: center;
  justify-content: flex-start;
`;
