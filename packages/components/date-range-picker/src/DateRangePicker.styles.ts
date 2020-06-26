import styled from 'styled-components';

export const Container = styled.div`
  width: 600px;
  background-color: white;
  user-select: none;
`;

export const Separator = styled.div`
  margin: 16px;
  border-top: 1px dotted ${props => props.theme.variable('@gray-color-lighter-6')};
`;

export const Addon = styled.div`
  margin: 16px;
`;
