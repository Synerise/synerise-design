import styled, { css, SimpleInterpolation } from 'styled-components';
import TooltipExtendedProps from './Tooltip.types';

export const TooltipDescription = styled.div<TooltipExtendedProps>`
  font-size: 13px;
  line-height: 1.38;
  font-weight: normal;
  text-align: inherit;
`;

export const TooltipTitle = styled.div<TooltipExtendedProps>`
  margin-bottom: ${(props): string => (props.type === 'icon' || props.type === 'tutorial' ? '8px' : '0px')};
  font-size: 13px;
  line-height: 1.38;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: inherit;
`;

export const TooltipComponent = styled.div<TooltipExtendedProps>`
  background-color: ${(props): string => `${props.theme.palette['grey-800']}E5`};
  color: ${(props): string => props.theme.palette['grey-200']};
  padding: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  ${(props): SimpleInterpolation =>
    (props.type === 'icon' || props.type === 'tutorial') &&
    css`
      padding-top: 8px;
    `}
  ${(props): SimpleInterpolation =>
    props.type === 'default' &&
    css`
      padding: 3px 8px;
    `}
  ${(props): SimpleInterpolation =>
    props.type === 'avatar' &&
    css`
      text-align: center;
      align-items: center;
    `}
`;

export const TooltipTutorial = styled.div<TooltipExtendedProps>`
  background-color: ${(props): string => props.theme.palette['grey-900']};
  display: flex;
`;
