import styled from 'styled-components';

import DSListItem from '@synerise/ds-list-item';
import Scrollbar from '@synerise/ds-scrollbar';
import { type ScrollbarProps } from '@synerise/ds-scrollbar/dist/Scrollbar.types';

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

export const ListItem = styled(DSListItem)`
  min-width: auto;
`;
