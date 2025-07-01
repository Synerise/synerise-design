import styled, { css } from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

import type { TooltipTypes } from './Tooltip.types';

export const TooltipDescription = styled.div<{ tooltipType: TooltipTypes }>`
  font-size: 13px;
  line-height: 1.38;
  font-weight: normal;
  text-align: inherit;
  overflow-wrap: break-word;
  min-width: 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.tooltipType === 'largeScrollable' &&
    css`
      margin-top: 6px;
      margin-right: -16px;
    `};
`;

export const TooltipTitle = styled.div<{ tooltipType: TooltipTypes }>`
  font-size: 13px;
  line-height: 1.38;
  font-weight: ${(props) => (props.tooltipType === 'default' ? 400 : 500)};
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  text-align: inherit;
  ${IconContainer} {
    align-self: flex-start;
  }
`;

export const TooltipTitleWrapper = styled.div`
  min-width: 0;
  width: max-content;
  overflow-wrap: break-word;
`;

export const TooltipHint = styled.div`
  margin-left: 8px;
  margin-right: -4px;
  display: flex;
  gap: 4px;
`;
export const TooltipKey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background: ${(props) => props.theme.palette['grey-700']};
  border-bottom: 1px solid ${(props) => props.theme.palette['grey-500']};
  box-shadow: 0px 1px 8px rgba(35, 41, 54, 0.5);
  border-radius: 3px;
`;

export const TooltipButton = styled.div`
  width: 100%;
  padding: 8px;
  background-color: rgba(56, 67, 80, 0.9);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const TooltipContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
`;
export const TooltipStatus = styled.div`
  padding-bottom: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const TooltipImage = styled.div<{ extraMargin: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  ${(props) => props.extraMargin && 'margin-bottom: 4px;'}

  img,
  video {
    max-width: 100%;
  }
`;

export const TooltipComponent = styled.div<{ tooltipType: TooltipTypes }>`
  background-color: rgba(56, 67, 80, 0.9);
  min-height: 24px;
  width: 100%;
  border-radius: 3px;
  color: ${(props) => props.theme.palette['grey-200']};
  overflow: hidden;
  text-align: left;

  ${TooltipContent} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: ${(props) =>
      props.tooltipType === 'default' ? '3px 8px' : '12px'};
  }
`;
