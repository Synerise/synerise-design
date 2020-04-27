import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const ActionCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & > * {
    margin-right: 24px;
    &:last-child {
      margin-right: 0;
    }
  }
`;
