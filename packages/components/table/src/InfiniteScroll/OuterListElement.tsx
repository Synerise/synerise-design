import React, {
  type HTMLAttributes,
  type MutableRefObject,
  type UIEvent,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';

import Scrollbar from '@synerise/ds-scrollbar';
import { type ScrollbarProps } from '@synerise/ds-scrollbar/dist/Scrollbar.types';

const OuterListElement = (
  containerRef: MutableRefObject<HTMLDivElement | null | undefined>,
  isSticky: boolean,
) =>
  forwardRef<HTMLDivElement, HTMLAttributes<Element>>(
    ({ onWheel, onScroll, children, style }, ref) => {
      const [header, setHeader] = useState<HTMLDivElement | null>(null);
      useEffect(() => {
        if (containerRef?.current) {
          const headerElement =
            containerRef.current.querySelector<HTMLDivElement>(
              '.ant-table-header',
            );
          headerElement && setHeader(headerElement);
        }
      }, []);

      const onScrollHandler: ScrollbarProps['onScroll'] = useCallback(
        (event: UIEvent) => {
          if (header) {
            header.scrollTo({ left: event.currentTarget.scrollLeft });
          }
          onScroll && onScroll(event);
        },
        [onScroll, header],
      );

      const onWheelHandler = (event: React.WheelEvent) => {
        if (header) {
          header.scrollTo({
            left: event.currentTarget?.parentElement?.scrollLeft,
          });
        }
        onWheel && onWheel(event);
      };

      if (isSticky) {
        // uses native browser scroll
        const { height, ...rest } = style || {};

        return (
          <div
            ref={ref}
            onWheel={onWheelHandler}
            data-testid="virtual-table-scrollable-window-sticky"
            style={{ ...rest, maxHeight: height }}
          >
            {children}
          </div>
        );
      }
      return (
        <Scrollbar
          ref={ref}
          onScroll={onScrollHandler}
          absolute
          maxHeight={style?.height}
        >
          {children}
        </Scrollbar>
      );
    },
  );

export default OuterListElement;
