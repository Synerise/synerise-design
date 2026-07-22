import styled from 'styled-components';

import DSListItem, { type StyledListItem } from '@synerise/ds-list-item';
import Scrollbar, { type ScrollbarProps } from '@synerise/ds-scrollbar';

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
`;
export const ListItem: StyledListItem = styled(DSListItem)`
  min-width: auto;
`;
export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 8px 0 8px 8px;
  background: var(--ds-dropdown-bg);
`;
export const StyledScrollbar = styled(Scrollbar)<ScrollbarProps>`
  && {
    .scrollbar-container {
      padding-right: 8px;
    }
  }
`;

export const DropdownFooter = styled.div`
  /* ⚑ Shift: footer bg grey-050 → --ds-dropdown-footer-bg (grey-100, marginally darker). */
  background-color: var(--ds-dropdown-footer-bg);
  height: 52px;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--ds-dropdown-footer-border);
  cursor: default;
  margin: 0;
  padding: 0 8px;
`;

export const BottomActionWrapper = styled.div``;
