import styled from 'styled-components';

import EmptyStatesBase from '@synerise/ds-empty-states';
import ListItemBase from '@synerise/ds-list-item';

export const ScrollableMenuWrapper = styled.div`
  padding: 8px 0 8px 8px;
`;
export const MenuWrapper = styled.div`
  padding: 8px;
`;
export const EmptyStates = styled(EmptyStatesBase)`
  margin: 48px 0;
`;

export const DropdownMenuListItem = styled(ListItemBase)`
  min-width: 0;
`;

export const DropdownMenuList = styled.div`
  padding-right: 8px;
`;
