import styled from 'styled-components';
import Menu from '@synerise/ds-menu';
import { RemoveIconWrapper } from './ItemRemoveIcon.styles';

export const ListItem = styled(Menu.Item)`
  &:hover {
    ${RemoveIconWrapper} {
      opacity: 1;
    }
  }
`;
export const SuffixelWrapper = styled.div`
  display: flex;
  align-items: center;
`;
