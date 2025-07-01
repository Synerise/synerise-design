import styled from 'styled-components';

import Button from '@synerise/ds-button';

export const ToggleButton = styled(Button)<{ isVisible: boolean }>`
  ${({ isVisible }): string => (isVisible ? 'opacity: 1 !important;' : '')};
`;

export default { ToggleButton };
