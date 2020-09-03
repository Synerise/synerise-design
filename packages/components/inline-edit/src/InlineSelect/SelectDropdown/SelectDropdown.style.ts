import styled from 'styled-components';
import Menu from '@synerise/ds-menu';
import Scrollbar from '@synerise/ds-scrollbar';
import { ScrollbarProps } from '@synerise/ds-scrollbar/dist/Scrollbar';

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-width: 200px;
`;

export const DSMenu = styled(Menu)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 8px ;
`;
export const StyledScrollbar = styled(Scrollbar)<ScrollbarProps>`
  && {
    .scrollbar-container {
      padding-right: 8px;
    }
  }
`;
