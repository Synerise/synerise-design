import React from 'react';

import { type DividerProps } from '../Divider.types';
import { SVG_PROPS } from './Line.const';
import * as S from './Line.styles';

export const Line = ({
  marginBottom,
  marginTop,
  type = 'horizontal',
  dashed,
  className,
  ...htmlAttributes
}: DividerProps) => {
  const svgProps = SVG_PROPS[type];
  return (
    <S.Line
      className={`ds-divider-line ds-divider-${type} ds-divider-${dashed ? 'dashed' : 'solid'} ${className}`}
      role="separator"
      marginTop={marginTop}
      marginBottom={marginBottom}
      type={type}
      dashed={dashed}
      {...htmlAttributes}
    >
      <svg {...svgProps.svgAttributes} preserveAspectRatio="none">
        <line
          {...svgProps.lineAttributes}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          stroke="currentColor"
          stroke-dasharray={`${dashed ? '1 2' : ''}`}
        />
      </svg>
    </S.Line>
  );
};
