import styled from 'styled-components';
import Menu from '@synerise/ds-menu';
import InlineEdit from '@synerise/ds-inline-edit';
import { InlineEditProps } from '@synerise/ds-inline-edit/dist/InlineEdit.types';


export const HoverableIconWrapper = styled.div`
  &&&:hover {
    .ds-icon > svg {
      fill: ${props => props.theme.palette['blue-600']} !important;
    }
  }
`;

export const MenuWrapper = styled.div`
  .ant-menu {
    .ds-menu-item {
      .ant-menu-item-selected {
        .ds-menu-prefix > .ds-icon {
          svg {
            fill: ${props => props.theme.palette['blue-600']};
          }
        }
      }
    }
  }
`;
