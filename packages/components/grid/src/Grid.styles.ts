import styled from 'styled-components';

export const GridContainer = styled.div<{ columns: number; gutter: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props): number => props.columns}, 1fr);
  grid-row-gap: ${(props): string => `${props.gutter}px`};
  grid-column-gap: ${(props): string => `${props.gutter}px`};
`;

export const GridItem = styled.div<{ columns?: number }>`
  grid-column: span ${(props): number => props.columns || 1};
`;
