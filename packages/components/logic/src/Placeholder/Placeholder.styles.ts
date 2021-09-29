import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const PlaceholderContainer = styled.div`
  width: 100%;
  height: 152px;
  margin: auto;
  border-radius: 3px;
  background-color: ${(props): string => props.theme.palette.white};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
