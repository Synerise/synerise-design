import { ICON_GAP, ICON_OFFSET, ICON_WIDTH } from '../Autocomplete.const';

export const getIconsWidth = (iconCount: number) => {
  return iconCount > 0
    ? ICON_OFFSET + iconCount * ICON_WIDTH + (iconCount - 1) * ICON_GAP
    : 0;
};
