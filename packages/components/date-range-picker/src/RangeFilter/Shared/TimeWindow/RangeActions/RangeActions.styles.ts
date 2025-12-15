import styled from 'styled-components';

import ListItem, { type StyledListItem } from '@synerise/ds-list-item';

export const ActionsMenu = styled.div`
  padding: 8px;
`;

export const ActionItem: StyledListItem = styled(ListItem)`
  max-height: 32px;
`;
