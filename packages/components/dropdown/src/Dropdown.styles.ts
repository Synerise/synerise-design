import styled from 'styled-components';

import { Wrapper as ListItemWrapper } from '@synerise/ds-list-item/dist/components/Text/Text.styles';

export const Wrapper = styled.div`
  overflow: hidden;
  background: var(--ds-dropdown-bg);
  ${ListItemWrapper} {
    min-width: 0;
  }
`;
