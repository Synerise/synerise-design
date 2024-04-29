import styled from 'styled-components';
import { macro, Text } from '@synerise/ds-typography';

export const Label = styled.label`
  ${macro.heading};
  height: 17px;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IconWrapper = styled.span`
  display: inline-block;
  .ds-icon > svg {
    margin-top: -1px;
    fill: ${(props): string => props.theme.palette['grey-400']};
  }
`;

export const LabelText = styled(Text)``;
