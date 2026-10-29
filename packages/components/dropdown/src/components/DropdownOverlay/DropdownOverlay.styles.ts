import styled from 'styled-components';

import { Wrapper as ListItemWrapper } from '@synerise/ds-list-item/dist/components/Text/Text.styles';

export const OverlayWrapper = styled.div<{
  $width?: number;
  widthProperty: string;
}>`
  background: var(--ds-dropdown-bg);
  box-shadow: var(--ds-dropdown-shadow);
  border-radius: 3px;
  ${(props) => props.$width && `${props.widthProperty}: ${props.$width}px`};
  overflow: hidden;

  ${ListItemWrapper} {
    min-width: 0;
  }
`;
