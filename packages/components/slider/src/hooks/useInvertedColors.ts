import { type ColorMap } from '../Slider.types';

export const useInvertedColors = ({
  inverted,
  colorMap,
}: {
  inverted: boolean;
  colorMap: ColorMap;
}) => {
  // Rail / inverted-fill default — the neutral track colour (was the `grey-200` palette key).
  const DEFAULT_RAIL_COLOR = 'var(--ds-slider-track-bg-default)';
  const lineColor = inverted ? colorMap[0] : DEFAULT_RAIL_COLOR;
  const tracksColorMap = inverted ? { 0: DEFAULT_RAIL_COLOR } : colorMap;
  return {
    lineColor,
    tracksColorMap,
  };
};
