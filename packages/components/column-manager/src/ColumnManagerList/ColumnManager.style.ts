import styled from 'styled-components';
import { FixedSizeList } from 'react-window';

export const ColumnManagerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export const ListHeadline = styled.span`
  display: flex;
  width: 100%;
  font-size: 14px;
  line-height: 1.42;
  font-weight: 500;
  padding: 24px 24px 12px;
  border-bottom: 1px solid ${props => props.theme.palette['grey-200']};
  color: ${props => props.theme.palette['grey-800']};
`;

export const List = styled(FixedSizeList)<{ maxHeight?: number; isDragging?: boolean }>`
  overflow-x: unset;
  overflow-y: unset;
  height: auto !important;
  background: ${props => props.theme.palette['blue-050']};
  box-shadow: 2px 0 0 0 ${props => props.theme.palette['blue-600']} inset;
  ${props => props.maxHeight !== undefined && `max-height: ${props.maxHeight}px;`}
  ${props => props.isDragging && `user-select: none;`}
`;
