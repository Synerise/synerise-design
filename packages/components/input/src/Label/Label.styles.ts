import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

// eslint-disable-next-line import/prefer-default-export
export const Label = styled.label`
  ${macro.heading};
  height: 17px;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  span {
    display: inline-block;
  }
  .ds-icon > svg {
    margin-top: -1px;
    fill: ${(props): string => props.theme.palette['grey-400']};
  }
`;
