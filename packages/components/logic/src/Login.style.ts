import Menu from '@synerise/ds-menu';
import styled from 'styled-components';

export const MenuItem = styled(Menu.Item)`
  min-width: 80px;
`;

export const LogicMenu = styled(Menu)`
  &&& {
    width: auto;
  }
`;

export const Logic = styled.div`
  &&& {
    .ds-title {
      text-transform: uppercase;
    }
  }
`;
