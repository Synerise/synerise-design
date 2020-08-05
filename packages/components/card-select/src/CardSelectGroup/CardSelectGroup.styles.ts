import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div<{width: string; columns: number}>`
  width:${(props): string => props.width === 'large'? '588px':'338px'};
  height:100%;
  justify-content: justify;
  background-color: white;
  padding: 24px ;
  display: grid;
  grid-template-columns: ${(props): string => new Array(props.columns).fill('1fr').join(' ')};
  column-gap: 24px;
  row-gap: 24px;
  
  .ds-card-select {
    width: 100% ;
    display: flex;
    flex: 1;
    max-width: 100%;
    min-width: 0;
  }
`;

