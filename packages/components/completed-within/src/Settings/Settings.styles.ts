import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Settings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  background-color: ${(props): string => props.theme.palette.white};
`;
