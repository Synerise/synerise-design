import styled from 'styled-components';
import Menu from '@synerise/ds-menu';
import Scrollbar from '@synerise/ds-scrollbar';
import { ScrollbarProps } from '@synerise/ds-scrollbar/dist/Scrollbar.types';

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
`;

export const DSMenu = styled(Menu)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 8px 0 8px 8px;
`;
export const StyledScrollbar = styled(Scrollbar)<ScrollbarProps>`
  && {
    .scrollbar-container {
      padding-right: 8px;
    }
  }
`;

export const DropdownFooter = styled.div`
  background-color: ${(props): string => props.theme.palette['grey-050']};
  height: 52px;
  display: flex;
  align-items: center;
  border-top: 1px solid ${(props): string => props.theme.palette['grey-100']};
  cursor: default;
  margin: 0;
  padding: 0 8px;
`;

export const BottomActionWrapper = styled.div``;
