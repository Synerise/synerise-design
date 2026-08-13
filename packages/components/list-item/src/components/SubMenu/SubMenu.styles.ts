import styled from 'styled-components';

export const SubMenuContainer = styled.div<{
  isOpen?: boolean;
}>`
  /*
   * Animate open/close by transitioning the grid track from 0fr to 1fr — the sub-menu settles at its
   * OWN height, so no arbitrary max-height constant is needed and nothing is clipped, however many
   * items (or nesting levels) it holds. Requires the items to stay mounted, which SubMenu does.
   */
  display: grid;
  grid-template-rows: ${(props) => (props.isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s ease;
  /* clips the collapsing track on the GRID CONTAINER (the list is its child) so nothing peeks at 0fr */
  overflow: hidden;
`;

export const SubMenuList = styled.div`
  /*
   * The grid item must be able to reach a true 0: min-height:0 overrides the automatic minimum size
   * that would otherwise hold the track open at the items' intrinsic height. Same on the inline axis,
   * so long unbreakable labels can't push the item past its track and spill out of the sub-menu.
   */
  min-height: 0;
  min-width: 0;
`;
