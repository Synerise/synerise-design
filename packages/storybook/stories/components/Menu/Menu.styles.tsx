import styled from 'styled-components';

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
