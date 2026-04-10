import React, {
  type ReactNode,
  type UIEvent,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react';

import { useMergeRefs } from '@floating-ui/react';
import Scrollbar from '@synerise/ds-scrollbar';
import { type WithHTMLAttributes, useResizeObserver } from '@synerise/ds-utils';

import * as S from './TableHorizontalScroll.styles';

type TableHorizontalScrollProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    children?: ReactNode;
    stickyLeft?: number;
    stickyRight?: number;
  }
>;
export const TableHorizontalScroll = forwardRef<
  HTMLDivElement,
  TableHorizontalScrollProps
>(({ children, stickyLeft = 0, stickyRight = 0, ...rest }, ref) => {
  const [isMaxLeft, setIsMaxLeft] = useState(true);
  const [isMaxRight, setIsMaxRight] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const mergedRef = useMergeRefs([wrapperRef, ref]);

  const calculateOffsets = useCallback((element: Element) => {
    if (element.scrollWidth === element.clientWidth) {
      setIsMaxLeft(true);
      setIsMaxRight(true);
      return;
    }
    setIsMaxLeft(element.scrollLeft === 0);
    setIsMaxRight(
      element.scrollLeft + element.clientWidth >= element.scrollWidth,
    );
  }, []);
  const handleScroll = useCallback(
    (event: UIEvent) => {
      calculateOffsets(event.currentTarget);
    },
    [calculateOffsets],
  );

  useResizeObserver(
    wrapperRef,
    () => wrapperRef.current && calculateOffsets(wrapperRef.current),
  );

  return (
    <>
      <S.HorizontalScrollContainer
        showLeftShadow={!isMaxLeft}
        showRightShadow={!isMaxRight}
        {...rest}
      >
        <S.LeftShadow offset={stickyLeft} />
        <S.HorizontalScrollWrapper ref={mergedRef} onScroll={handleScroll}>
          {children}
        </S.HorizontalScrollWrapper>
        <S.RightShadow offset={stickyRight} />
      </S.HorizontalScrollContainer>

      <S.ScrollbarWrapper>
        <Scrollbar></Scrollbar>
      </S.ScrollbarWrapper>
    </>
  );
});
