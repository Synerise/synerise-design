import styled from 'styled-components';
import Drawer from '@synerise/ds-drawer';
import { SearchBarWrapper } from '@synerise/ds-search-bar/dist/SearchBar.styles';

// eslint-disable-next-line import/prefer-default-export
export const ColumnManager = styled(Drawer)`
  ${SearchBarWrapper} {
    min-height: 52px;
    height: 52px;
  }
`;
