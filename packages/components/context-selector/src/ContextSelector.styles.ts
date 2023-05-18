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
  width: 100%;

  .ds-context-selector-list {
    height: auto !important;
    max-height: 300px;
  }
`;

export const SearchResult = styled.span`
  font-weight: 400;
  color: ${(props): string => props.theme.palette['grey-500']};
`;

export const SearchResultHighlight = styled.span`
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-700']};
`;

export const Title = styled.div`
  font-size: 10px;
  line-height: 1.6;
  font-weight: 500;
  text-transform: uppercase;
  color: ${(props): string => props.theme.palette['grey-500']};
  padding: 8px 12px;
`;

export const ItemWrapper = styled.span`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ErrorWrapper = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
  margin-top: 8px;
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
`;
