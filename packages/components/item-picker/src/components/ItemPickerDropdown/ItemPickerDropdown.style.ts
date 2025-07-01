import styled from 'styled-components';

import DSListItem from '@synerise/ds-list-item';
import Scrollbar, { type ScrollbarProps } from '@synerise/ds-scrollbar';

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
`;
export const ListItem = styled(DSListItem)`
  min-width: auto;
`;
export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 8px 0 8px 8px;
  background: ${({ theme }) => theme.palette.white};
`;
export const StyledScrollbar = styled(Scrollbar)<ScrollbarProps>`
  && {
    .scrollbar-container {
      padding-right: 8px;
    }
  }
`;

export const DropdownFooter = styled.div`
  background-color: ${(props) => props.theme.palette['grey-050']};
  height: 52px;
  display: flex;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.palette['grey-100']};
  cursor: default;
  margin: 0;
  padding: 0 8px;
`;

export const BottomActionWrapper = styled.div``;
