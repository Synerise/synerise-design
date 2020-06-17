import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

// eslint-disable-next-line import/prefer-default-export
export const Label = styled.label`
  ${macro.heading};
  height: 17px;
  display: block;
  align-items: center;
  cursor: pointer;
  max-width: 160px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  span {
    display: inline-block;
  }
  svg {
    fill: ${(props): string => props.theme.palette['grey-400']};
  }
`;
