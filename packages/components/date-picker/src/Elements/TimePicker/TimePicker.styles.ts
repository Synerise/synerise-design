import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  > * {
    grid-row: 1;
  }
  && {
    & > div > div {
      height: calc(100% - 18px);
    }
  }
  padding: 16px 24px 0 24px;
`;
