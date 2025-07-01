import React from 'react';

export type Dimensions = {
  width: number;
  height: number;
};

export type Breakpoint = {
  min: number;
  max: number;
  columns: number;
  name: string;
};

export type DimensionsWithBreakpoint = {
  dimensions: Dimensions;
  breakpoint?: Breakpoint;
};

const BREAKPOINTS = {
  xxl: {
    max: Infinity,
    min: 1601,
    columns: 24,
  },
  xl: {
    max: 1600,
    min: 1281,
    columns: 16,
  },
  lg: {
    max: 1280,
    min: 961,
    columns: 12,
  },
  md: {
    max: 960,
    min: 769,
    columns: 8,
  },
  sm: {
    max: 768,
    min: 321,
    columns: 8,
  },
  xs: {
    max: 320,
    min: 0,
    columns: 4,
  },
};

const useBreakpoint = (): DimensionsWithBreakpoint => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const updateBreakPoint = React.useMemo(() => {
    const { width } = dimensions;
    const breakpointKey = Object.keys(BREAKPOINTS).filter((key) => {
      return BREAKPOINTS[key].min <= width && BREAKPOINTS[key].max >= width;
    })[0];

    return {
      breakpoint: {
        ...BREAKPOINTS[breakpointKey],
        name: breakpointKey,
      },
      dimensions,
    };
  }, [dimensions]);

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

  return updateBreakPoint;
};

export default useBreakpoint;
