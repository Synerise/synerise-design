import styled from 'styled-components';

export const CopyIcon = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.palette['grey-600']};
  &:hover {
    color: ${(props) => props.theme.palette['blue-600']};
  }
`;
