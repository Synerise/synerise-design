import styled, { type StyledComponent } from 'styled-components';

import Button, { type ButtonProps } from '@synerise/ds-button';

export const PopconfirmContainer = styled.div`
  box-shadow: ${(props) => props.theme.variables['box-shadow-2']};
  max-width: 288px;
  padding: 16px;
  position: relative;
  z-index: 1;
  border-radius: 3px;
  background-color: ${(props) => props.theme.palette.white};
`;

export const PopconfirmContent = styled.div<{
  buttonsAlign?: 'left' | 'right';
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ buttonsAlign }) =>
    buttonsAlign === 'left' ? 'flex-start' : 'flex-end'};
  justify-content: flex-start;
  margin: 0px;

  .ant-carousel {
    position: relative;
    width: 100%;
    margin-top: 24px;
    .slick-track {
      width: 100%;
    }
    .slick-dots-bottom {
      position: relative;
      bottom: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 24px 0 0;
      margin: 0;
      li {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: 0 8px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          box-sizing: content-box;
          background-color: ${(props) => props.theme.palette['grey-600']};
          border: 2px solid ${(props) => props.theme.palette.white};
          height: 4px;
          width: 4px;
          border-radius: 50%;
          opacity: 1;
        }
      }
      li.slick-active {
        button {
          border: 2px solid ${(props) => props.theme.palette['green-600']};
          background-color: ${(props) => `${props.theme.palette.white}`};
        }
      }
    }
  }
`;

export const PopconfirmTitle = styled.div`
  font-size: 14px;
  line-height: 1.43;
  color: ${(props) => props.theme.palette['grey-800']};
  font-weight: 500;
  padding-top: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const PopconfirmButton: StyledComponent<
  React.ForwardRefExoticComponent<
    ButtonProps &
      Omit<React.HTMLAttributes<HTMLDivElement>, keyof ButtonProps> &
      React.RefAttributes<HTMLButtonElement>
  >,
  object,
  object,
  never
> = styled(Button)`
  && {
    height: 32px;
  }
`;
export const PopconfirmButtonWrapper = styled.div`
  display: flex;
  padding-top: 16px;
  align-items: center;
  justify-content: flex-start;
  ${PopconfirmButton}:not(:first-of-type) {
    margin-left: 8px;
  }
`;
export const ButtonWrapper = styled.div`
  margin-left: 8px;
`;

export const PopconfirmDescription = styled.div<{ titlePadding?: boolean }>`
  font-size: 13px;
  line-height: 1.38;
  font-weight: 400;
  margin-top: ${(props) => (props.titlePadding ? '6px' : 'none')};
  color: ${(props) => props.theme.palette['grey-800']};
`;

export const PopconfirmIcon = styled.div`
  margin-right: 8px;
`;
export const PopconfirmCloseIcon = styled.div<{ titlePadding?: boolean }>`
  margin-left: ${(props) => (props.titlePadding ? '8px' : '6px')};
  color: ${(props) => props.theme.palette['grey-600']};
  cursor: pointer;
  border-radius: 3px;
`;
export const PopconfirmWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const PopconfirmArrow = styled.svg`
  position: absolute;
  transform: translate(-50%, 0);
`;

export const PopconfirmArrowWrapper = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  z-index: 2;
  color: ${(props) => props.theme.palette['white']};

  &.ds-popover-arrow-bottom,
  &.ds-popover-arrow-bottom-end,
  &.ds-popover-arrow-bottom-start {
    top: 0;
    transform: rotate(180deg);
  }
  &.ds-popover-arrow-top,
  &.ds-popover-arrow-top-end,
  &.ds-popover-arrow-top-start {
    bottom: 0;
  }
  &.ds-popover-arrow-left,
  &.ds-popover-arrow-left-end,
  &.ds-popover-arrow-left-start {
    right: 0;
    transform: rotate(-90deg);
  }
  &.ds-popover-arrow-right,
  &.ds-popover-arrow-right-end,
  &.ds-popover-arrow-right-start {
    left: 0;
    transform: rotate(90deg);
  }
`;

export const PopconfirmContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const PopconfirmHeaderWrapper = styled.div<{ titlePadding?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const PopconfirmTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const PopconfirmImage = styled.img`
  display: flex;
  width: 100%;
  height: auto;
  border-radius: 8px;
  & > * {
    max-width: 100%;
  }
`;
export const LinkWrapper = styled.span`
  font-size: 13px;
  line-height: 1.5;
  font-weight: 400;
  color: ${(props) => props.theme.palette['grey-700']};
  text-decoration: underline;
  cursor: pointer;
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
