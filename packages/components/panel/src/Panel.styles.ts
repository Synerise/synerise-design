import styled from 'styled-components';

import { Box } from '@synerise/ds-flex-box';

export const PanelWrapper = styled(Box)<{
  $radius: number;
  greyBackground?: boolean;
}>`
  background-color: var(--ds-color-background-base-default);
  ${(props) =>
    props.greyBackground
      ? `
         box-shadow: var(--ds-shadows-shadow-1);`
      : `
         border: solid 1px var(--ds-color-border-base-default);`}

  border-radius: ${(props) => props.$radius}px;
`;
export const PanelContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;
