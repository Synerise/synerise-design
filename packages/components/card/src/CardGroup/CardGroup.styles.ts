import styled from 'styled-components';

export const Container = styled.div<{ items: number }>`
  display: grid;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  grid-template-columns: ${(props) =>
    [...new Array(props.items)].map(() => '1fr').join(' ')};
  width: 100%;
`;
