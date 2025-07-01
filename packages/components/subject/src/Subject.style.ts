import styled from 'styled-components';

import Button from '@synerise/ds-button';

export const ShowPreviewButton = styled(Button)``;

export const Subject = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  ${ShowPreviewButton} {
    margin-left: 8px;
  }
`;
