import styled from 'styled-components';

import Drawer from '@synerise/ds-drawer';
import SearchBarBase, { type StyledSearchBar } from '@synerise/ds-search-bar';

export const ColumnManager = styled(Drawer)``;

export const SearchBar: StyledSearchBar = styled(SearchBarBase)`
  min-height: 52px;
  height: 52px;
`;

export const ColumnManagerListWrapper = styled.div`
  flex: 1 1 auto;
  min-height: 0;
`;
