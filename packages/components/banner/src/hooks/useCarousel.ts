import { useRef } from 'react';
import Carousel from 'antd/lib/carousel';

export const useCarousel = () => {
  const bannerRef = useRef<Carousel>(null);
  const handleDotClick = (index: number) => {
    bannerRef.current && bannerRef.current.goTo(index);
  };
  const handleNextClick = () => {
    bannerRef.current && bannerRef.current.next();
  };
  const handlePrevClick = () => {
    bannerRef.current && bannerRef.current.prev();
  };
  return {
    bannerRef,
    handleDotClick,
    handleNextClick,
    handlePrevClick,
  };
};
