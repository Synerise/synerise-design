import styled, { type FlattenInterpolation, css } from 'styled-components';

export const GridContainer = styled.div<{ columns: number; gutter: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props): number => props.columns}, 1fr);
  grid-row-gap: ${(props): string => `${props.gutter}px`};
  grid-column-gap: ${(props): string => `${props.gutter}px`};
`;

export const GridItem = styled.div<{
  columns?: number;
  contentWrapper: boolean;
  maxColumns: number;
}>`
  grid-column: span ${(props): number => props.columns || 1};
  display: ${(props): string => (props.columns === 0 ? 'none' : 'inherit')};
  ${(props): FlattenInterpolation<unknown> | false =>
    props.contentWrapper &&
    Boolean(props.maxColumns) &&
    Boolean(props.columns) &&
    css`
      grid-column-start: ${props.maxColumns && props.columns
        ? (props.maxColumns - props.columns) / 2 + 1
        : 'span'};
      grid-column-end: ${props.maxColumns && props.columns
        ? (props.maxColumns - props.columns) / 2 + 1 + props.columns
        : 1};
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: stretch;
      & > * {
        width: 100%;
        margin-bottom: 24px;
      }
    `}
`;
