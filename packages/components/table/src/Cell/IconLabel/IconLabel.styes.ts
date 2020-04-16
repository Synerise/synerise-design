import styled from 'styled-components';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

// eslint-disable-next-line import/prefer-default-export
export const IconLabelCell = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  ${IconContainer} {
    margin-right: 8px;
  }
`;
