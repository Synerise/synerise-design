import React, { forwardRef } from 'react';

import { DEFAULT_PADDING, DEFAULT_RADIUS } from './Panel.const';
import * as S from './Panel.styles';
import type { PanelProps } from './Panel.types';

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      children,
      radius = DEFAULT_RADIUS,
      label,
      tooltip,
      tooltipConfig,
      id,
      color,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={className} style={style}>
        {label && (
          <S.Label
            id={id}
            label={label}
            tooltip={tooltip}
            tooltipConfig={tooltipConfig}
          />
        )}
        <S.PanelWrapper p={DEFAULT_PADDING} $radius={radius} {...props}>
          {children}
        </S.PanelWrapper>
      </div>
    );
  },
);

export default Panel;
