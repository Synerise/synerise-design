import styled from 'styled-components';
import Menu from '@synerise/ds-menu';

export const SearchResult = styled.span`
  font-weight: 400;
  color: ${(props): string => props.theme.palette['grey-500']};
`;

export const SearchResultHighlight = styled.span`
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-700']};
`;

export const ItemsList = styled(Menu)`
  padding: 8px;
  width: 100%;
`;
