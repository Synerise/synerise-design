import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import Tooltip, { TooltipProps } from '@synerise/ds-tooltip';
import { EllipsisText } from './CommonElements';

export type EllipsisProps = {
  tooltip?: ReactNode;
  tooltipProps?: TooltipProps;
  children?: ReactNode;
  className?: string;
};

export const Ellipsis = ({ tooltip, children, className, tooltipProps }: EllipsisProps) => {
  const textComponentRef = useRef<HTMLDivElement | null>(null);
  const [truncated, setTruncated] = useState(false);

  const debouncedResize = useRef(
    debounce(
      () => {
        if (textComponentRef && textComponentRef.current) {
          setTruncated(textComponentRef.current.offsetWidth < textComponentRef.current.scrollWidth);
        }
      },
      100,
      { leading: true, trailing: true }
    )
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
    <Tooltip title={truncated ? tooltip : undefined} {...(truncated ? tooltipProps : {})}>
      <EllipsisText className={className} ref={textComponentRef}>
        {children}
      </EllipsisText>
    </Tooltip>
  );
};
