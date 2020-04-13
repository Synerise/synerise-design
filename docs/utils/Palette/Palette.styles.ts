import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const PaletteBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
  max-width: 100%;
  & > div {
    flex: 1;
  }
`;
