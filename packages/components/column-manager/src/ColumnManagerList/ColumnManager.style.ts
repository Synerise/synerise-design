import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

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
  border-bottom: 1px solid var(--ds-color-border-base-default);
  color: var(--ds-color-text-base-default);
`;

export const List = styled(FixedSizeList)<{
  maxHeight?: number;
  isDragging?: boolean;
}>`
  overflow-x: unset;
  overflow-y: unset;
  height: auto !important;
  background: var(--ds-color-background-brand-subtle);
  box-shadow: 2px 0 0 0 var(--ds-color-border-brand-default) inset;
  ${(props) =>
    props.maxHeight !== undefined && `max-height: ${props.maxHeight}px;`}
  ${(props) => props.isDragging && `user-select: none;`}
`;
