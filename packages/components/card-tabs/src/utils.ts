import { orderedBase, orderedHover } from '@synerise/ds-tokens/names';
import { resolveCustomColor } from '@synerise/ds-utils';

export const getColor = (
  isActive: boolean,
  activeColor: string | undefined,
  defaultColor: string | undefined,
): string | undefined => {
  if (isActive) {
    return activeColor;
  }
  return defaultColor;
};

// Auto-assigned tabs take their colour from the `ordered` token queue by slot index; a tab with
// an explicit `color` prop resolves through the custom-colour tokens (`customColorOr`). `orderedBaseOr`
// returns the slot's base token (else the fallback); `orderedHoverOr` returns the slot's explicit hover token — the
// hover is now a real token (base − 100 baked in) rather than a name-derived shade, so we read it
// instead of computing it with getLighterColor.
export const orderedBaseOr = (
  fallback: string | undefined,
  orderIndex?: number,
): string | undefined =>
  orderIndex !== undefined ? orderedBase[orderIndex] : fallback;
export const orderedHoverOr = (
  fallback: string | undefined,
  orderIndex?: number,
): string | undefined =>
  orderIndex !== undefined ? orderedHover[orderIndex] : fallback;

// Resolve an explicit `color` prop — a bare hue (`'grey'`) or `$hue-$shade` (`'blue-600'`) — to the
// reversible `--ds-color-custom-*` token via the shared ds-utils helper, so explicit-colour
// tabs follow the light/dark theme like auto-assigned ones. A bare hue defaults to shade 600;
// `shadeShift` picks a lighter shade for hover (−100). Anything that is not a custom colour yields
// `undefined`, so the declaration is dropped (what an unknown palette key did before).
export const customColorOr = (
  color: string | undefined,
  shadeShift = 0,
): string | undefined => resolveCustomColor(color, undefined, { shadeShift });
