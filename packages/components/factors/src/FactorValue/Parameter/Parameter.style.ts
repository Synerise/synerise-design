import styled from 'styled-components';
import Menu from '@synerise/ds-menu';

export const TabsWrapper = styled.div`
  width: 100%;
  padding: 0 0 8px 0;
`;
export const ContentPlaceholder = styled.div`
  height: 100px;
`;

export const ItemsList = styled(Menu)`
  padding: 8px;
  width: 100%;
`;

export const SearchResult = styled.span`
  font-weight: 400;
  color: ${(props): string => props.theme.palette['grey-500']};
`;

export const SearchResultHighlight = styled.span`
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-700']};
`;
