import styled, { css, SimpleInterpolation } from 'styled-components';
import TooltipExtendedProps from './Tooltip.types';

export const TooltipDescription = styled.div<TooltipExtendedProps>`
  line-height: 1.45;
  letter-spacing: 0.1px;
`;

export const TooltipTitle = styled.div<TooltipExtendedProps>`
  margin-bottom: ${(props): string => (props.type === 'icon' || props.type === 'tutorial' ? '8px' : '0px')};
  font-size: ${(props): string => props.theme.variables['font-size-lg']};
`;

export const TooltipComponent = styled.div<TooltipExtendedProps>`
  color: ${(props): string => props.theme.palette['grey-200']};
  text-align: left;
  padding: 16px;
  ${(props): SimpleInterpolation =>
    props.type === 'icon' &&
    css`
      padding-top: 8px;
    `}
  ${(props): SimpleInterpolation =>
    props.type === 'default' &&
    css`
      padding: 3px 8px;
    `}
`;

export const TooltipTutorial = styled.div<TooltipExtendedProps>`
  background-color: ${(props): string => props.theme.palette['grey-900']};
  display: flex;
`;
