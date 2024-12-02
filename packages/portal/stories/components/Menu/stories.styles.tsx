import styled from 'styled-components';
import Menu from '@synerise/ds-menu';
import InlineEdit from '@synerise/ds-inline-edit';
import { InlineEditProps } from '@synerise/ds-inline-edit/dist/InlineEdit.types';


export const ItemWithoutHover = styled(Menu.Item)`
  &&&:hover {
    .ds-menu-content-wrapper {
      color: ${props => props.theme.palette['grey-700']};
      .ds-menu-prefix > .ds-icon > svg {
        fill: ${props => props.theme.palette['grey-700']} !important;
      }
    }
  }
`;
export const HoverableIconWrapper = styled.div`
  &&&:hover {
    .ds-icon > svg {
      fill: ${props => props.theme.palette['blue-600']} !important;
    }
  }
`;
export const StyledMenuItem = styled(Menu.Item)<{ selected: boolean }>`
  &&&:hover {
    .icon-suffix {
      svg {
        fill: ${props => props.theme.palette['blue-600']} !important;
      }
    }
  }
`;
export const StyledInlineEditMenu = styled(InlineEdit)<InlineEditProps>`
  && .autosize-input > input {
    max-width: 100px;
    overflow: hidden;
    font-size: 13px;
    line-height: 1.39;
    min-height: 18px;
    padding: 0;
    font-variant-numeric: tabular-nums;
  }
`;

export const MenuWrapper = styled.div`
  .ant-menu {
    .ds-menu-item {
      .ant-menu-item-selected,
      .-item-selected {
        .ds-menu-prefix > .ds-icon {
          svg {
            fill: ${props => props.theme.palette['blue-600']};
          }
        }
      }
    }
  }
`;
