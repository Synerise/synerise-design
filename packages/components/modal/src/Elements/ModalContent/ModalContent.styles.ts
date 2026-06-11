import styled, { css } from 'styled-components';

import ScrollbarBase from '@synerise/ds-scrollbar';

export const ModalScrollWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
`;
export const ModalWrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Scrollbar = styled(ScrollbarBase)`
  display: flex;
  flex-direction: column;
  min-height: 0;
  .scrollbar-container {
    min-height: 0;
  }
  .ps__rail-y,
  .ps__rail-x {
    z-index: 99;
  }
  /*
    The perfect-scrollbar content box (ds-scrollbar's ScrollbarContent) has no
    width of its own, so it shrink-wraps to the content's intrinsic width and
    can end up a few px wider than the scroll container — producing a spurious
    horizontal scroll that suppressScrollX (which acts on .ps) does not remove.
    Pin it to the container width and clip the residual overflow so the body
    only scrolls vertically.
  */
  .ds-modal-body-scrollbar {
    width: 100%;
    overflow-x: clip;
  }
`;

export const ModalBody = styled.div<{
  greyBackground?: boolean;
  bodyFullWidth?: boolean;
}>`
  ${(props) => !props.bodyFullWidth && `padding: 24px;`}
  ${(props) =>
    props.greyBackground && `background: ${props.theme.palette['grey-050']};`}

  ${(props) =>
    !props.bodyFullWidth &&
    css`
      ${Scrollbar} {
        .scrollbar-container {
          padding-right: 24px;
        }
      }
    `}
`;
export const ModalContainer = styled.div<{
  $width?: string | number;
  isFullscreen?: boolean;
  centered?: boolean;
  maxHeight?: number;
}>`
  background: ${(props) => props.theme.palette['white']};
  width: ${(props) => props.$width};
  position: absolute;
  box-shadow: ${(props) => props.theme.variables['box-shadow-2']};
  border-radius: 3px;

  ${(props) =>
    props.isFullscreen
      ? css`
          && {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0;
            max-width: none;
            padding: 0;

            display: flex;
            flex-direction: column;
            height: 100%;

            ${ModalBody} {
              flex: 1 1 100%;
              overflow: scroll;
            }
          }
        `
      : css`
          left: 50%;
          ${props.centered
            ? css`
                top: 50%;
                transform: translate(-50%, -50%);
              `
            : css`
                top: 100px;
                transform: translateX(-50%);
              `}

          ${props.maxHeight &&
          css`
            display: flex;
            flex-direction: column;
            height: ${props.maxHeight}vh;

            ${ModalBody} {
              flex: 1 1 100%;
              overflow: scroll;
              padding-right: 0;
            }
          `}
        `}
`;

export const ModalRoot = styled.div<{ zIndex?: number; $hidden?: boolean }>`
  position: absolute;
  z-index: ${(props) => props.zIndex ?? props.theme.variables['zindex-modal']};
  ${(props) => props.$hidden && 'display: none;'}
`;
export const ModalMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.palette['grey-800']};
  opacity: 0.2;
`;
