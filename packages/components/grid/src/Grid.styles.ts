import styled from 'styled-components';

export const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-row-gap: 24px;
  grid-column-gap: 24px;
`;

export const GridItem = styled.div<{ columns: number }>`
  grid-column: span ${(props): number => props.columns};
`;
