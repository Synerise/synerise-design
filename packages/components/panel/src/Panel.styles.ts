import styled from 'styled-components';

import { Box } from '@synerise/ds-flex-box';

export const PanelWrapper = styled(Box)<{ radius: number }>`
  border: solid 1px ${(props) => props.theme.palette['grey-200']};
  border-radius: ${(props) => props.radius}px;
`;
