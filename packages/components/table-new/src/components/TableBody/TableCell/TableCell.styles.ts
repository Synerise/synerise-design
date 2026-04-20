import styled from 'styled-components';

import { commonCellStyles, commonPinnedStyles } from '../../../Table.styles';

const justifyMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
} as const;

export const CellWrapper = styled.div<{
  $align?: 'left' | 'center' | 'right';
}>`
  overflow: hidden;
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
      props.isSorted && `background-color: ${props.theme.palette['blue-050']}`};
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
  }
`;
