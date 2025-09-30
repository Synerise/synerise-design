import { type SVGAttributes } from 'react';

import { type DividerType } from '../Divider.types';

export const SVG_PROPS: Record<
  DividerType,
  {
    svgAttributes: SVGAttributes<SVGElement>;
    lineAttributes: SVGAttributes<SVGLineElement>;
  }
> = {
  horizontal: {
    svgAttributes: {
      viewBox: '0 0 1 1',
      width: '100%',
    },
    lineAttributes: {
      x1: '0',
      y1: '0',
      x2: '1',
      y2: '0',
    },
  },
  vertical: {
    svgAttributes: {
      viewBox: '0 0 1 1',
      height: '100%',
    },
    lineAttributes: {
      x1: '0',
      y1: '0',
      x2: '0',
      y2: '1',
    },
  },
};
