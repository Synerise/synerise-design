import styled from 'styled-components';
import { RemoveIconWrapper } from './ItemRemoveIcon.styles';

// eslint-disable-next-line import/prefer-default-export
export const ListItem = styled.div`
  &:hover {
    ${RemoveIconWrapper} {
      opacity: 1;
    }
  }
`;
