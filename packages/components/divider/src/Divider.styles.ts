import styled from 'styled-components';

import { Title } from '@synerise/ds-typography';

export const Label = styled(Title)`
  text-transform: uppercase;
  color: ${({ theme }): string => theme.palette['grey-500']};
  height: 16px;
  margin: 12px;
  line-height: 1.6;
  letter-spacing: 0.1px;
`;
