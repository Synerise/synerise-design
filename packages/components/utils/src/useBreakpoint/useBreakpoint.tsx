import * as React from 'react';

export type Dimensions = {
  width: number;
  height: number;
};
//
// const BREAKPOINTS = {
//   xxl: {
//     max: false,
//     min: 1601,
//     columns: 24,
//   },
//   xl: {
//     max: 1600,
//     min: 1281,
//     columns: 16,
//   },
//   l: {
//     max: 1280,
//     min: 961,
//     columns: 12,
//   },
//   m: {
//     max: 960,
//     min: 769,
//     columns: 8,
//   },
//   s: {
//     max: 768,
//     min: 320,
//     columns: 8
//   },
//   xs: {
//     max: 320,
//     min: false,
//     columns: 3
//   }
// }

const useBreakpoint = (): Dimensions => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const getDimensions = (): Dimensions => ({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = (): void => {
      setDimensions(getDimensions());
    };

    setDimensions(getDimensions());

    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setDimensions]);

  return dimensions;
};

export default useBreakpoint;
