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

  .ds-checkbox {
    padding: 0;
  }
`;
