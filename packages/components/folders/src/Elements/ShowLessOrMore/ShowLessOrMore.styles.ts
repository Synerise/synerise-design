import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 16px 0 0px 0;
  .ds-button:not(:first-of-type) {
    margin-left: 8px;
  }
`;

export const ShowMoreLabel = styled.div`
  background: transparent;
  outline: 0;
  cursor: pointer;
  strong {
    font-weight: 500;
    margin: 0 3px;
  }
`;
