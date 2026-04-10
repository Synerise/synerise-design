import styled from 'styled-components';

import { commonCellStyles, commonPinnedStyles } from '../../../Table.styles';

export const CellWrapper = styled.div`
  overflow: hidden;
`;

export const Td = styled.td<{
  $height?: number;
  $width?: number;
  isSorted?: boolean;
  headerIndex?: number;
  isPinned?: 'left' | 'right' | false;
  rightOffset?: number;
  leftOffset?: number;
}>`
  ${commonCellStyles}
  ${commonPinnedStyles}
  
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
    width: 100%;
  }
`;
