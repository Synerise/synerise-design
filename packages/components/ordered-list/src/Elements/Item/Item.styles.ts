import styled from 'styled-components';

export const ItemWrapper = styled.li<{listStyle?: string}>`
  margin: 10px 0;
  list-style:none;
  list-style-type: ${(props): string => props.listStyle ? props.listStyle : 'none' };
`