import type { HTMLAttributes } from 'react';

import type { DataAttributes } from '@synerise/ds-utils';

import type { EllipsisProps } from './Ellipsis';

export type Props = HTMLAttributes<HTMLHeadingElement> &
  DataAttributes & {
    level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    withoutMargin?: boolean;
    ellipsis?: EllipsisProps;
  };
