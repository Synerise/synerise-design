import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  background: ${(props) => props.theme.palette['grey-050']};
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  &:empty {
    display: none;
  }
`;
