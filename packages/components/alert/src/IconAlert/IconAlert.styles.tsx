import styled from 'styled-components';
import { IconAlertType } from './IconAlert.types';

const COLORS: Record<IconAlertType, string> = {
  success: 'green-600',
  warning: 'yellow-600',
  alert: 'red-600',
  info: 'grey-600',
};
const COLORSHOVER: Record<IconAlertType, string> = {
  success: 'green-700',
  warning: 'yellow-700',
  alert: 'red-700',
  info: 'grey-700',
};

export const Message = styled.span`
  display: flex;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  color: inherit;
  margin-left: 4px;
  margin-top: 2px;
`;

export const IconAlertWrapper = styled.span<{ type: IconAlertType }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  &:hover {
    cursor: pointer;
    svg {
      color: ${(props): string => props.theme.palette[COLORSHOVER[props.type]]};
      fill: ${(props): string => props.theme.palette[COLORSHOVER[props.type]]};
    }
  }
  &:active{
    svg {
    color: ${(props): string => props.theme.palette[COLORS[props.type]]};
    fill: ${(props): string => props.theme.palette[COLORS[props.type]]};
  }
  }
  svg {
    color: ${(props): string => props.theme.palette[COLORS[props.type]]};
    fill: ${(props): string => props.theme.palette[COLORS[props.type]]};
  }
  ${Message} {
    color: ${(props): string => props.theme.palette[COLORS[props.type]]};
  }
`;
export const EmphasisWrapper = styled.span`
  display: flex;
  padding-bottom: 1px;
  font-size: 13px;
  line-height: 1.39;
  font-weight: 500;
  color: inherit;
`;
export const LinkWrapper = styled.span`
  display: flex;
  font-size: 13px;
  line-height: 1.5;
  font-weight: 400;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
`;
