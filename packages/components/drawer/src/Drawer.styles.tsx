import styled, { css } from 'styled-components';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

type PlacementProps = { $placement: DrawerPlacement; $open: boolean };

const hiddenTransform = (placement: DrawerPlacement): string => {
  switch (placement) {
    case 'left':
      return 'translateX(-100%)';
    case 'top':
      return 'translateY(-100%)';
    case 'bottom':
      return 'translateY(100%)';
    case 'right':
    default:
      return 'translateX(100%)';
  }
};

const placementAnchor = (placement: DrawerPlacement) => {
  switch (placement) {
    case 'left':
      return css`
        top: 0;
        left: 0;
        height: 100%;
      `;
    case 'top':
      return css`
        top: 0;
        left: 0;
        right: 0;
      `;
    case 'bottom':
      return css`
        bottom: 0;
        left: 0;
        right: 0;
      `;
    case 'right':
    default:
      return css`
        top: 0;
        right: 0;
        height: 100%;
      `;
  }
};

/**
 * Outer container — carries the `ant-drawer` / `ds-drawer` class hooks and the
 * consumer `className` (several consumers do `styled(Drawer)` with
 * `&.ant-drawer { z-index: 9999 }` or `&& { position: absolute }`). Fixed +
 * full-viewport when portaled; consumers switch it to `position: absolute` for
 * the inline (`getContainer={false}`, `mask={false}`) mode.
 */
export const DrawerRoot = styled.div<{ $inline?: boolean; $zIndex?: number }>`
  position: ${(props) => (props.$inline ? 'absolute' : 'fixed')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${(props) => props.$zIndex ?? props.theme.variables['zindex-modal']};
  pointer-events: none;
`;

export const DrawerMask = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* grey-800 at 0.2 alpha (matches ds-modal's mask). Palette values are hex, so
     the 0.2 alpha is applied via an 8-digit hex suffix (33 = 0.2); the element
     opacity below drives the open/close fade. */
  background-color: ${({ theme }): string => `${theme.palette['grey-800']}33`};
  opacity: ${(props) => (props.$open ? 1 : 0)};
  transition: opacity 0.3s ease;
  pointer-events: ${(props) => (props.$open ? 'auto' : 'none')};
`;

export const DrawerContentWrapper = styled.div<
  PlacementProps & { $width?: number | string; $height?: number | string }
>`
  position: absolute;
  ${(props) => placementAnchor(props.$placement)}
  ${(props) =>
    (props.$placement === 'left' || props.$placement === 'right') &&
    css`
      width: ${typeof props.$width === 'number'
        ? `${props.$width}px`
        : props.$width};
    `}
  ${(props) =>
    (props.$placement === 'top' || props.$placement === 'bottom') &&
    css`
      height: ${typeof props.$height === 'number'
        ? `${props.$height}px`
        : props.$height};
    `}
  transform: ${(props) =>
    props.$open ? 'none' : hiddenTransform(props.$placement)};
  transition: transform 0.3s ease;
  pointer-events: auto;
`;

/**
 * White panel body — reproduces the styling the antd migration kept on
 * `.ant-drawer-body` (white background, drop shadow, flex column, no padding).
 */
export const DrawerBodyBox = styled.div`
  height: 100%;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }): string => theme.palette.white};
  box-shadow: ${({ theme }): string => theme.variables['box-shadow-2']};
`;

export const DrawerHeader = styled.div`
  padding: 24px 24px 0;
  border-bottom: 1px solid ${({ theme }): string => theme.palette['grey-100']};
`;

export const DrawerHeaderWithoutPadding = styled.div`
  padding: 0;
  border-bottom: 0;
`;

export const DrawerContent = styled.div`
  padding: 24px;
`;

export const DrawerBody = styled.div`
  background-color: white;
  overflow-y: auto;
`;
export const DrawerHeaderBack = styled.div`
  margin-right: 24px;
`;
export const DrawerHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
`;
