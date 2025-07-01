import styled from 'styled-components';

import { Title } from '@synerise/ds-typography';

export const MappingWrapper = styled.div<{ isCompact: boolean }>`
  display: flex;
  flex-direction: column;
  ${(props) => !props.isCompact && `gap: 16px`};
`;
export const MappingRow = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;
export const MappingRowLeft = styled.div`
  flex: 1 1 50%;
`;
export const MappingRowRight = styled.div`
  flex: 1 1 50%;
`;
export const MappingRowCenter = styled.div`
  flex: 0 0 32px;
  display: flex;
  justify-content: center;
`;
export const RowSelectionWrapper = styled.div`
  flex: 0 0 32px;
`;

export const ColumnTitle = styled(Title)``;

export const BatchSelectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border-bottom: solid 1px ${(props) => props.theme.palette['grey-300']};
  height: 64px;
`;
export const BatchActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;
export const BatchCounter = styled.div`
  white-space: nowrap;
`;

export const BatchSelectionInner = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 24px;
`;
export const BatchToggleButton = styled.div``;
