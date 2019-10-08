import styled from 'styled-components';

export const ManageableListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  .ant-list {
    width: 100%;
  }
`;

export const ShowMoreButton = styled.div`
  background: transparent;
  outline: 0;
  cursor: pointer;
  strong {
    font-weight: 500;
  }
`;
