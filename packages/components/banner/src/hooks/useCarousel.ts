import { type CarouselRef } from 'antd/lib/carousel';
import { useRef } from 'react';

export const useCarousel = () => {
  const bannerRef = useRef<CarouselRef>(null);
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
