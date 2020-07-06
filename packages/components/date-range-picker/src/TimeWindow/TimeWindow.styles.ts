import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import range from 'lodash/range';

const commonGridStyle = (props: { columns?: number }): FlattenSimpleInterpolation => css`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: ${range(props.columns || 1)
    .map(() => '1fr')
    .join(' ')};
  grid-auto-rows: 1fr;
  white-space: nowrap;
  align-items: center;
`;

export const TimeWindowContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: min-content auto;
  grid-auto-rows: 1fr;
`;

export const Labels = styled.div``;

export const Days = styled.div<{ columns: number }>`
  ${(props): FlattenSimpleInterpolation => commonGridStyle(props)};
  button {
    position: relative;
    text-overflow: ellipsis;
    padding: 0 4px;
  }
`;
//  ${media.only.small`grid-template-columns: 1fr;`};
