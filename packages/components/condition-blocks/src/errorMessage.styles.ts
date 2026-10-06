import styled from 'styled-components';

import { ErrorText } from '@synerise/ds-typography';

/**
 * Shared error label for the block error slots. Reuses ds-typography's `ErrorText` (red-600) and
 * overrides its default `margin-bottom: 4px` — here the message sits *below* its slot, so it needs
 * a top margin instead.
 */
export const ErrorMessage = styled(ErrorText)`
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 12px;
  line-height: 1.34;
`;
