import styled from 'styled-components';
import { RemoveIconWrapper } from './ItemRemoveIcon.styles';

export const ListItem = styled.div`
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
