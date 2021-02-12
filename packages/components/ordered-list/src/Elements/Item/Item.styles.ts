import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const ItemWrapper = styled.li<{ listStyle?: string }>`
  margin: 10px 0 10px 10px;
  list-style: none;
  list-style-type: ${(props): string => (props.listStyle ? props.listStyle : 'none')};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const IndexFormatterWrapper = styled.li<{ listStyle?: string }>`
  list-style: none;
  list-style-type: ${(props): string => (props.listStyle ? props.listStyle : 'none')};
`;
