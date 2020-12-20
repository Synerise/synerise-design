import styled from 'styled-components';
import Menu from '@synerise/ds-menu';
import { RemoveIconWrapper } from './ItemRemoveIcon.styles';

export const ListItem = styled(Menu.Item)`
  & {
    ${RemoveIconWrapper} {
      display: none;
    }
  }
  &:hover {
    ${RemoveIconWrapper} {
      display: flex;
    }
  }
`;
export const SuffixelWrapper = styled.div`
  display: flex;
  align-items: center;
`;
