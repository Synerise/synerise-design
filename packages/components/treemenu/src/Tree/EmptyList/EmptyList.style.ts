import styled from 'styled-components';
import { Description } from '@synerise/ds-typography';

// eslint-disable-next-line import/prefer-default-export
export const EmptyList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 52px;

  ${Description} {
    margin-top: 12px;
  }
`;
