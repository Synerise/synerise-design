import styled from 'styled-components';
import Button from '@synerise/ds-button';

export const OffsetButton = styled(Button)`
  &&& {
    position: absolute;
    right: -16px;
    bottom: -16px;
    z-index: 2;
  }
`;

export default { OffsetButton };
