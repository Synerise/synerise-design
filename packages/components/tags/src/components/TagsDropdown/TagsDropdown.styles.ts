import styled from 'styled-components';

import Scrollbar, { type ScrollbarProps } from '@synerise/ds-scrollbar';

export const Overlay = styled.div`
  width: 216px;
  background-color: ${(props) => props.theme.palette.white};
`;

export const DropdownContainer = styled(Scrollbar)<ScrollbarProps>`
  display: flex;
  flex-direction: column;
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
`;
