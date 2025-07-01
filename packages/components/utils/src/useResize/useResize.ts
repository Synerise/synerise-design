import React from 'react';

type Dimensions = {
  width: number;
  height: number;
};

const useResize = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentRef?: React.RefObject<any>,
  visible = true,
): Dimensions => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const getDimensions = (): Dimensions => ({
      width: componentRef?.current?.offsetWidth || 0,
      height: componentRef?.current?.offsetHeight || 0,
    });

    const handleResize = (): void => {
      setDimensions(getDimensions());
    };

    if (componentRef?.current) {
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
