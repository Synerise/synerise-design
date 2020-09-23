import * as React from 'react';

type Dimensions = {
  width: number;
  height: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useResize = (componentRef: React.RefObject<any>, visible = true): Dimensions => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const getDimensions = (): Dimensions => ({
      width: componentRef.current.offsetWidth,
      height: componentRef.current.offsetHeight,
    });

    const handleResize = (): void => {
      setDimensions(getDimensions());
    };

    if (componentRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, [componentRef, setDimensions, visible]);

  return dimensions;
};

export default useResize;
