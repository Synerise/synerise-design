import styled from 'styled-components';
import Menu from '@synerise/ds-menu';

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
