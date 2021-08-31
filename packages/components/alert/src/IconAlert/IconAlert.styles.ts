import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { IconAlertType } from './IconAlert.types';

const COLORS: Record<IconAlertType, string> = {
  success: 'green-600',
  warning: 'yellow-600',
  alert: 'red-600',
  info: 'grey-600',
};
const COLORSTEXT: Record<IconAlertType, string> = {
  success: 'green-700',
  warning: 'yellow-700',
  alert: 'red-700',
  info: 'grey-700',
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
  margin-top: 1px;
`;

export const IconAlertWrapper = styled.span<{ type: IconAlertType; hoverButton?: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  &:hover {
    cursor: ${(props): string => (props.hoverButton ? 'pointer' : 'auto')};
    svg {
      color: ${(props): string =>
        props.hoverButton ? props.theme.palette[COLORSHOVER[props.type]] : props.theme.palette[COLORS[props.type]]};
      fill: ${(props): string =>
        props.hoverButton ? props.theme.palette[COLORSHOVER[props.type]] : props.theme.palette[COLORS[props.type]]};
    }
  }
  &:active {
    svg {
      color: ${(props): string => props.theme.palette[COLORS[props.type]]};
      fill: ${(props): string => props.theme.palette[COLORS[props.type]]};
    }
  }
  svg {
    color: ${(props): string => props.theme.palette[COLORS[props.type]]};
    fill: ${(props): string => props.theme.palette[COLORS[props.type]]};
  }
  ${(props): FlattenSimpleInterpolation | false =>
    !!props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.4;
    `};
  ${Message} {
    color: ${(props): string => props.theme.palette[COLORSTEXT[props.type]]};
  }
`;
export const EmphasisWrapper = styled.span`
  display: flex;
  padding-bottom: 1px;
  font-size: 13px;
  line-height: 1.39;
  padding-left: 3px;
  font-weight: 500;
  color: inherit;
`;
export const LinkWrapper = styled.span`
  display: flex;
  font-size: 13px;
  line-height: 1.39;
  font-weight: 400;
  margin-left: 3px;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
`;
