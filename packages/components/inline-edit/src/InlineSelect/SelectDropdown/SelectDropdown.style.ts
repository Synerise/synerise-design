import styled from 'styled-components';

import DSListItem, { type StyledListItem } from '@synerise/ds-list-item';
import Scrollbar, { type ScrollbarProps } from '@synerise/ds-scrollbar';

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-width: 200px;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 8px;
  background: ${({ theme }) => theme.palette.white};
`;
export const StyledScrollbar = styled(Scrollbar)<ScrollbarProps>`
  && {
    .scrollbar-container {
      padding-right: 8px;
    }
  }
`;

export const ListItem: StyledListItem = styled(DSListItem)`
  min-width: auto;
`;
