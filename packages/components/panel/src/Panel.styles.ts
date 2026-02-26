import styled from 'styled-components';

import { Box } from '@synerise/ds-flex-box';

export const PanelWrapper = styled(Box)<{
  $radius: number;
  greyBackground?: boolean;
}>`
  background-color: ${(props) => props.theme.palette.white};
  ${(props) =>
    props.greyBackground
      ? `
         box-shadow: 0 4px 12px 0 rgba(35, 41, 54, 0.04);`
      : `
         border: solid 1px ${props.theme.palette['grey-200']};`}

  border-radius: ${(props) => props.$radius}px;
`;
