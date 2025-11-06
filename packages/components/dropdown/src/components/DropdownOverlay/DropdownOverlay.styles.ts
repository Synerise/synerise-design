import styled from 'styled-components';

import { Wrapper as ListItemWrapper } from '@synerise/ds-list-item/dist/components/Text/Text.styles';

export const OverlayWrapper = styled.div<{
  $width?: number;
  widthProperty: string;
}>`
  background: ${(props) => props.theme.palette.white};
  box-shadow: ${(props) => props.theme.variables['box-shadow-2']};
  border-radius: 3px;
  ${(props) => props.$width && `${props.widthProperty}: ${props.$width}px`};
  overflow: hidden;

  ${ListItemWrapper} {
    min-width: 0;
  }
`;
