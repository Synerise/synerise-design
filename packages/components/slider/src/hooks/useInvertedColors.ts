import { type ColorMap } from '../Slider.types';

export const useInvertedColors = ({
  inverted,
  colorMap,
}: {
  inverted: boolean;
  colorMap: ColorMap;
}) => {
  const GREY_200 = 'grey-200';
  const lineColor = inverted ? colorMap[0] : GREY_200;
  const tracksColorMap = inverted ? { 0: GREY_200 } : colorMap;
  return {
    lineColor,
    tracksColorMap,
  };
};
