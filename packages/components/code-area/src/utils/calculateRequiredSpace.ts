const HEADER_HEIGHT = 64;
const BAR_HEIGHT = 49;
const MARGINS = 40;
export const calculateRequiredSpace = (
  isBottomBarShowing: boolean,
  contentBelowHeight: number,
) => {
  return (
    HEADER_HEIGHT +
    (isBottomBarShowing ? BAR_HEIGHT : 0) +
    contentBelowHeight +
    MARGINS
  );
};
