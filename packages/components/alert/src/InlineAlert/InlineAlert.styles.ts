import styled from 'styled-components';
import { InlineAlertType } from './InlineAlert.types';

const COLORS = {
  success: 'green-600',
  warning: 'yellow-600',
  alert: 'red-600',
};

export const Message = styled.span`
  display: inline;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  color: inherit;
  margin-left: 4px;
`;

export const InlineAlertWrapper = styled.span<{ type: InlineAlertType }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  svg {
    color: ${(props): string => props.theme.palette[COLORS[props.type]]};
    fill: ${(props): string => props.theme.palette[COLORS[props.type]]};
  }
  ${Message} {
    color: ${(props): string => props.theme.palette[COLORS[props.type]]};
  }
`;
