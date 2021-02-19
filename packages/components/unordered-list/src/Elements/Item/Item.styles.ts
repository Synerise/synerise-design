import styled from 'styled-components';

export const ItemWrapper = styled.li<{ listStyle?: string }>`
  margin: 10px 0 10px 0;
  list-style: none;
  list-style-type: ${(props): string => (props.listStyle ? props.listStyle : 'none')};
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const IndexFormatterWrapper = styled.li<{ listStyle?: string }>`
  list-style: none;
  list-style-type: ${(props): string => (props.listStyle ? props.listStyle : 'none')};
`;
