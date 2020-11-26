import styled from 'styled-components';
import { Description } from '@synerise/ds-typography';

// eslint-disable-next-line import/prefer-default-export
export const ActionAreaWrapper = styled.div`
  max-width: 100%;
  width: 588px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 24px;
  border-radius: 3px;
  border: 1px dashed ${(props): string => props.theme.palette['grey-300']};
  .ds-title {
    margin-bottom: 8px;
  }
  ${Description} {
    margin-bottom: 16px;
  }
`;
