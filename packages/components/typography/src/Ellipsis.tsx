import React, { ReactNode, useRef, useEffect, useState } from 'react';
import Tooltip from '@synerise/ds-tooltip';

import { EllipsisText } from './CommonElements';

export type EllipsisProps = {
  tooltip?: ReactNode;
  children?: ReactNode;
};

export const Ellipsis = ({ tooltip, children }: EllipsisProps) => {
  const textComponentRef = useRef<HTMLDivElement | null>(null);
  const [truncated, setTruncated] = useState(false);
  useEffect(() => {
    if (textComponentRef?.current) {
      setTruncated(textComponentRef?.current.offsetWidth < textComponentRef?.current.scrollWidth);
    }
  }, [children]);
  return (
    <Tooltip title={truncated ? tooltip : undefined}>
      <EllipsisText ref={textComponentRef}>{children}</EllipsisText>
    </Tooltip>
  );
};
