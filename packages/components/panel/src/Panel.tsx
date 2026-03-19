import React, { forwardRef } from 'react';

import { FormFieldLabel } from '@synerise/ds-form-field';

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
      className,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <S.PanelContainer ref={ref} className={className} style={style}>
        {label && (
          <FormFieldLabel
            label={label}
            tooltip={tooltip}
            tooltipConfig={tooltipConfig}
          />
        )}
        <S.PanelWrapper p={DEFAULT_PADDING} $radius={radius} {...props}>
          {children}
        </S.PanelWrapper>
      </S.PanelContainer>
    );
  },
);

export default Panel;
