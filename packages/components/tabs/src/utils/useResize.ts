import * as React from 'react';

type Dimensions = {
  width: number;
  height: number;
};

const useResize = (componentRef: React.RefObject<any>): Dimensions => {
  const getDimensions = (): Dimensions => ({
    width: componentRef.current.offsetWidth,
    height: componentRef.current.offsetHeight,
  });

  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
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
  }, [componentRef]);

  return dimensions;
};

export default useResize;
