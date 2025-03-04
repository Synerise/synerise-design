import styled, { css } from 'styled-components';
import { IconContainer } from '@synerise/ds-icon';
import TooltipExtendedProps, { tooltipTypes } from './Tooltip.types';

export const TooltipDescription = styled.div<{ tooltipType: tooltipTypes }>`
  font-size: 13px;
  line-height: 1.38;
  font-weight: normal;
  text-align: inherit;
  overflow-wrap: break-word;
  min-width: 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  ${props =>
    props.tooltipType === 'largeScrollable' &&
    css`
      margin-top: 6px;
      margin-right: -16px;
    `};
`;

export const TooltipTitle = styled.div<{ tooltipType: tooltipTypes }>`
  margin-bottom: ${({ tooltipType }) => (tooltipType === 'tutorial' ? '8px' : '0px')};
  font-size: 13px;
  line-height: 1.38;
  font-weight: ${props => (props.tooltipType === 'default' ? 400 : 500)};
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
  ${props => props.extraMargin && 'margin-bottom: 4px;'}

  img,
  video {
    max-width: 100%;
  }
`;

export const TooltipComponent = styled.div<{ tooltipType: tooltipTypes }>`
  background-color: rgba(56, 67, 80, 0.9);
  min-height: 24px;
  width: 100%;
  border-radius: 3px;
  color: ${props => props.theme.palette['grey-200']};
  overflow: hidden;
  text-align: left;

  ${TooltipContent} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    ${props => {
      const defaultPadding = css`
        padding: 12px;
      `;
      switch (props.tooltipType) {
        case 'icon':
        case 'largeSimple':
        case 'largeScrollable':
        case 'avatar':
        case 'button':
        case 'header-label':
          return defaultPadding;
        // unused type (?) TBC
        case 'tutorial':
          return css`
            padding: 0;
          `;
        // unused type (?) TBC
        case 'status':
          return css`
            padding: 6px 25px 10px 21px;
            text-align: center;
            align-items: center;
          `;
        case 'default':
          return css`
            padding: 3px 8px;
          `;
        default:
      }
      return defaultPadding;
    }}
  }

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
