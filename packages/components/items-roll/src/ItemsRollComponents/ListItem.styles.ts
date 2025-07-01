import styled from 'styled-components';

import DSListItem from '@synerise/ds-list-item';

import { RemoveIconWrapper } from './ItemRemoveIcon.styles';

export const ListItem = styled(DSListItem)`
  & {
    ${RemoveIconWrapper} {
      opacity: 0;
      display: none;
    }
  }
  &:hover {
    ${RemoveIconWrapper} {
      opacity: 1;
      display: flex;
    }
  }
`;
export const SuffixelWrapper = styled.div`
  display: flex;
  align-items: center;
`;
