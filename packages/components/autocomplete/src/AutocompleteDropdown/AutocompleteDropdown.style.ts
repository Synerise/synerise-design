import styled from 'styled-components';

import DSListItem, {
  ListWrapper as DSListWrapper,
  type StyledListItem,
} from '@synerise/ds-list-item';

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-width: 200px;
`;

/* ds-list-item's ListWrapper supplies the ListContextProvider the items need
   (plus the 8px padding / white background). We drop its RIGHT padding so the
   absolute scrollbar overlays the inner list's 8px gutter instead of adding
   extra space — mirroring ds-dropdown's DropdownMenuList integration. */
export const ScrollList = styled(DSListWrapper)`
  && {
    padding-right: 0;
  }
`;

export const Inner = styled.div`
  padding-right: 8px;
`;

export const NotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  color: ${({ theme }) => theme.palette['grey-600']};
  font-weight: normal;
`;

export const ListItem: StyledListItem = styled(DSListItem)`
  min-width: auto;
  font-weight: normal;

  strong {
    font-weight: 500;
  }
`;
