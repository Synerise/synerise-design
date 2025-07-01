import styled from 'styled-components';

import DropdownSkeleton from '@synerise/ds-skeleton';

export const TabsWrapper = styled.div`
  width: 100%;
  padding: 0 0 8px 0;
`;
export const ContentPlaceholder = styled.div`
  height: 100px;
`;

export const ItemsList = styled.div<{ contentHeight?: number }>`
  width: 100%;
  background: ${(props) => props.theme.palette.white};
  .ds-context-selector-list {
    height: auto !important;
    max-height: 300px;
  }
  ${(props) =>
    props.contentHeight !== undefined && `height: ${props.contentHeight}px;`}
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
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ShowMoreItem = styled.div`
  font-weight: 500;
`;

export const ErrorWrapper = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
  margin-top: 8px;
`;

export const Skeleton = styled(DropdownSkeleton)<{ contentHeight?: number }>`
  ${(props) =>
    props.contentHeight !== undefined && `height: ${props.contentHeight}px;`}
`;
