import styled, { css, SimpleInterpolation } from 'styled-components';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';
import TooltipExtendedProps, { tooltipTypes } from './Tooltip.types';

export const TooltipDescription = styled.div<TooltipExtendedProps>`
  font-size: 13px;
  line-height: 1.38;
  font-weight: normal;
  text-align: inherit;
`;

const titlesWithPadding = ['icon', 'tutorial', 'button'];

export const TooltipTitle = styled.div<Omit<TooltipExtendedProps, 'type'> & { tooltipType: tooltipTypes }>`
  margin-bottom: ${({ tooltipType }): string => (titlesWithPadding.includes(String(tooltipType)) ? '8px' : '0px')};
  font-size: 13px;
  line-height: 1.38;
  font-weight: ${(props): number => (props.tooltipType === 'default' ? 400 : 500)};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: inherit;
  ${IconContainer} {
    align-self: flex-start;
  }
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
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const TooltipComponent = styled.div<Omit<TooltipExtendedProps, 'type'> & { tooltipType: tooltipTypes }>`
  background-color: rgba(56, 67, 80, 0.9);
  min-height: 24px;
  color: ${(props): string => props.theme.palette['grey-200']};
  padding: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 3px;
  overflow: hidden;
  ${(props): SimpleInterpolation =>
    props.tooltipType === 'icon' &&
    css`
      padding-top: 8px;
    `}
  ${(props): SimpleInterpolation =>
    (props.tooltipType === 'tutorial' || props.tooltipType === 'button') &&
    css`
      padding: 0;
    `}
  ${(props): SimpleInterpolation =>
    props.tooltipType === 'default' &&
    css`
      padding: 3px 8px;
    `}
  ${(props): SimpleInterpolation =>
    props.tooltipType === 'avatar' &&
    css`
      text-align: center;
      align-items: center;
    `}
  
  .ant-carousel {
    position: relative;
    width: 100%;
    .slick-track {
      width: 100%;
    }
    .slick-dots-bottom {
      position: relative;
      bottom: 0;
      height: 32px;
      padding: 0 18px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      margin: 0;
      background-color: rgba(56, 67, 80, 0.9);
      li {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: rgba(56, 67, 80, 0.9);
        margin: 0 8px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          box-sizing: content-box;
          background-color: ${(props): string => props.theme.palette['grey-600']};
          border: 2px solid rgba(56, 67, 80, 0.9);
          height: 4px;
          width: 4px;
          border-radius: 50%;
          opacity: 1;
        }
      }
      li.slick-active {
        button {
          border: 2px solid ${(props): string => props.theme.palette['green-600']};
          background-color: ${(props): string => `${props.theme.palette['grey-800']}E5`};
        }
      }
    }
  }
`;

export const TutorialItem = styled.div<TooltipExtendedProps>`
  padding: 16px;
  color: ${(props): string => props.theme.palette.white};
`;
