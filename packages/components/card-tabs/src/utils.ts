import {
  customColors,
  orderedBase,
  orderedHover,
} from '@synerise/ds-tokens/names';

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

// Resolve an explicit `color` prop — a bare hue (`'grey'`) or `$hue-$shade` (`'blue-600'`) — to the
// reversible `--ds-color-background-custom-*` token, so explicit-colour tabs follow the light/dark
// theme like auto-assigned ones. A bare hue defaults to shade 600; `shadeShift` picks a lighter shade
// for hover (−100, matching getLighterColor). Out-of-set strings fall back to `fallback` (the caller
// still has `theme.palette` access for that).
export const customColorOr = (
  color: string,
  fallback: string,
  shadeShift = 0,
): string => {
  const dash = color.lastIndexOf('-');
  const hue = dash === -1 ? color : color.slice(0, dash);
  const shade = dash === -1 ? 600 : Number(color.slice(dash + 1));
  const shades = customColors[hue];
  return (
    shades?.[String(shade + shadeShift)] ?? shades?.[String(shade)] ?? fallback
  );
};

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
