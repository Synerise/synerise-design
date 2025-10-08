import styled from 'styled-components';

import Dropdown from '@synerise/ds-dropdown';
import Scrollbar, { type ScrollbarProps } from '@synerise/ds-scrollbar';

export const Overlay = styled.div`
  width: 216px;
  background-color: ${(props) => props.theme.palette.white};
`;

export const DropdownContainer = styled(Scrollbar)<ScrollbarProps>`
  display: flex;
  flex-direction: column;
  padding: 8px 0 0 8px;
`;

export const DropdownTagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 320px;
  > * {
    width: fit-content;
    max-width: fit-content;
    display: block;
    width: inherit;
    cursor: pointer;
    flex-shrink: 0;
  }

  &:after {
    content: '\\00a0';
    flex: 0 0 8px;
    overflow: hidden;
    visibility: hidden;
    width: 10px;
  }
`;

export const BottomAction = styled(Dropdown.BottomAction)`
  margin-top: 0;
  padding: 0 8px;
  cursor: auto;
`;
