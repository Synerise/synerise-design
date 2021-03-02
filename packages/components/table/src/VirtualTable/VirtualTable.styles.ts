import styled from 'styled-components';

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const ColWrapper = styled.div<{ width?: number }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: ${(props): string => (props.width ? `${props.width}px` : 'auto')};
  max-width: ${(props): string => (props.width ? `${props.width}px` : 'auto')};
  padding: 0 24px;

  &.virtual-table-cell.ant-table-selection-column {
    padding: 0 8px 0 24px;
  }

  &.virtual-table-cell.ds-table-star-column {
    padding: 0 8px 0 24px;

    & > button {
      display: flex;
    }
  }

  &.virtual-table-cell.ant-table-selection-column + .virtual-table-cell.ds-table-star-column {
    padding-left: 0;
  }
`;
