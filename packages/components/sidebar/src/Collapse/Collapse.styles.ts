import styled, { css } from 'styled-components';

import { type CollapseExpandIconPosition } from './Collapse.types';

/*
 * DS-native accordion visual, expressed entirely with styled-components. The `ant-collapse*` /
 * `ds-sidebar-*` class names stay on the elements ONLY as hooks (ui-tests / interim external CSS) —
 * they are never used as styling selectors. State (active / icon position / drag overlay) is driven
 * by transient `$`-props the Collapse/CollapsePanel pass in.
 */

export const headerStyle = css`
  padding: 18px 24px;
  color: ${(props) => props.theme.palette['grey-700']};
  font-weight: 500;
  font-size: 14px;
  background: white;
  position: relative;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.palette['grey-800']};
  }
`;

export const expandIconStyle = css`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
`;

export const CollapseRoot = styled.div`
  background-color: ${(props) => props.theme.palette['blue-050']};
  border: none;
`;

export const PanelItem = styled.div<{
  $isActive?: boolean;
  $isDragOverlay?: boolean;
}>`
  position: relative;
  /* top border stays in BOTH states (collapsed and open) — the open state previously dropped it */
  border-top: solid 1px ${(props) => props.theme.palette['grey-200']};
  border-bottom: none;

  ${(props) =>
    props.$isDragOverlay &&
    css`
      box-shadow: ${props.theme.variables['box-shadow-2']};
      z-index: 10;
    `}
`;

export const PanelHeader = styled.div`
  ${headerStyle}
  display: flex;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
  transition: 0.2s ease-in-out;
`;

export const PanelExpandIcon = styled.span<{
  $iconPosition?: CollapseExpandIconPosition;
}>`
  display: block;

  ${(props) => props.$iconPosition === 'end' && expandIconStyle}
`;

export const PanelContent = styled.div<{ $isActive?: boolean }>`
  background-color: white;
  border-radius: 0;
  border: none;
  /*
   * Animate open/close by transitioning the grid track from 0fr to 1fr — gives a smooth
   * auto-height collapse (the antd motion the migration lost) with no JS height measurement.
   * Requires the content to stay mounted (rendered unconditionally) so both directions animate.
   */
  display: grid;
  grid-template-rows: ${(props) => (props.$isActive ? '1fr' : '0fr')};
  transition: grid-template-rows 0.24s ease;
  /* clips the collapsing track on the GRID CONTAINER (the box is its child) so nothing peeks at 0fr */
  overflow: hidden;
`;

export const PanelContentBox = styled.div`
  /*
   * The grid item must carry NO padding/border of its own. min-height:0 zeroes only the CONTENT
   * height; with content-box sizing any padding here is added on top, so the 0fr track would settle
   * at the padding height (32px) and that strip would show through. Keep padding on PanelContentInner
   * (a child), so the item can reach a true 0 and the panel fully collapses.
   */
  min-height: 0;
  /*
   * Same reason on the inline axis: a grid item defaults to min-width:auto, so wide content
   * (long unbreakable strings, nowrap children) makes the item exceed its track and spill past
   * the panel. min-width:0 lets it respect the track width — content then wraps / is clipped.
   */
  min-width: 0;
`;

export const PanelContentInner = styled.div`
  padding: 16px 24px;
`;
