import { orderedBase, orderedHover } from '@synerise/ds-tokens/names';

export const getColor = (
  isActive: boolean,
  activeColor: string,
  defaultColor: string,
): string => {
  if (isActive) {
    return activeColor;
  }
  return defaultColor;
};

// Auto-assigned tabs take their colour from the `ordered` token queue by slot index; a tab with
// an explicit `color` prop keeps the legacy palette fallback. `orderedBaseOr` returns the slot's
// base token (else the fallback); `orderedHoverOr` returns the slot's explicit hover token — the
// hover is now a real token (base − 100 baked in) rather than a name-derived shade, so we read it
// instead of computing it with getLighterColor.
export const orderedBaseOr = (fallback: string, orderIndex?: number): string =>
  orderIndex !== undefined ? orderedBase[orderIndex] : fallback;
export const orderedHoverOr = (
  fallback: string,
  orderIndex?: number,
): string => (orderIndex !== undefined ? orderedHover[orderIndex] : fallback);

export const getLighterColor = (color: string): string => {
  if (color) {
    const levelRegex = /(\d){3}$/g;
    const matches = color.match(levelRegex);
    if (matches?.length) {
      const level: number = parseInt(matches[0], 10);
      return color.replace(levelRegex, (level - 100).toString());
    }
  }
  return color;
};
