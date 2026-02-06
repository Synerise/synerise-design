import debounce from 'lodash.debounce';
import React, {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import Tooltip, { type TooltipProps } from '@synerise/ds-tooltip';

import { EllipsisText } from './CommonElements';

export type EllipsisProps = {
  tooltip?: ReactNode;
  tooltipProps?: TooltipProps;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export const Ellipsis = ({
  tooltip,
  children,
  className,
  tooltipProps,
  style,
}: EllipsisProps) => {
  const textComponentRef = useRef<HTMLDivElement | null>(null);
  const [truncated, setTruncated] = useState(false);

  const debouncedResize = useRef(
    debounce(
      () => {
        if (textComponentRef && textComponentRef.current) {
          setTruncated(
            textComponentRef.current.offsetWidth <
              textComponentRef.current.scrollWidth,
          );
        }
      },
      100,
      { leading: true, trailing: true },
    ),
  ).current;

  const resizeObserver = useRef(new ResizeObserver(debouncedResize)).current;

  useEffect(() => {
    if (textComponentRef.current) {
      resizeObserver.observe(textComponentRef.current);
      resizeObserver.observe(document.body);
    }
    return () => {
      resizeObserver.disconnect();
      debouncedResize.cancel();
    };
  }, [resizeObserver, debouncedResize]);

  return (
    <Tooltip
      title={truncated ? tooltip : undefined}
      {...(truncated ? tooltipProps : {})}
    >
      <EllipsisText style={style} className={className} ref={textComponentRef}>
        {children}
      </EllipsisText>
    </Tooltip>
  );
};
