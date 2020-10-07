import styled from 'styled-components';
import { range } from 'lodash';

export const TimeWindowContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 7px;
  grid-template-columns: min-content auto;
  grid-auto-rows: 1fr;
`;

export const Labels = styled.div`
  display: grid;
  grid-gap: 7px;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  white-space: nowrap;
  align-items: center;
  font-size: 11px;
`;

export const Days = styled.div<{ columns: number }>`
  display: grid;
  grid-gap: 7px;
  grid-template-columns: ${(props: { columns?: number }) =>
    range(props.columns || 1)
      .map(() => '1fr')
      .join(' ')};
  grid-auto-rows: 1fr;
  white-space: nowrap;
  align-items: center;
  button {
    position: relative;
    text-overflow: ellipsis;
    padding: 0 4px;
  }
`;

export const HeaderWrapper = styled.div`
  margin-bottom: 12px;
`
