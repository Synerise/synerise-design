import styled from 'styled-components';

import Drawer from '@synerise/ds-drawer';
import SearchBarBase from '@synerise/ds-search-bar';

export const ColumnManager = styled(Drawer)``;

export const SearchBar = styled(SearchBarBase)`
  min-height: 52px;
  height: 52px;
`;

export const ColumnManagerListWrapper = styled.div`
  flex: 1 1 auto;
  min-height: 0;
`;
