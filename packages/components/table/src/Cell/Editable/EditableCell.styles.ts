import styled from 'styled-components';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

// eslint-disable-next-line import/prefer-default-export
export const EditableCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    ${IconContainer} {
      opacity: 1;
      visibility: visible;
    }
  }
  ${IconContainer} {
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
  }
`;
