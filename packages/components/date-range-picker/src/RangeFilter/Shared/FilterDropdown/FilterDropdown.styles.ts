import styled from 'styled-components';

import ListItem, { type StyledListItem } from '@synerise/ds-list-item';

export const DropdownMenu = styled.div`
  padding: 8px;
`;
export const DropdownMenuItem: StyledListItem = styled(ListItem)`
  max-height: 32px;
  min-width: 200px;
`;

export const RemoveIconWrapper = styled.div``;
