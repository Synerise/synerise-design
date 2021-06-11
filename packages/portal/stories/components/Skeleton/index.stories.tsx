import * as React from 'react';

import Skeleton from '@synerise/ds-skeleton';
import { boolean, select } from '@storybook/addon-knobs';
import SkeletonAvatar from '@synerise/ds-skeleton/dist/SkeletonAvatar/SkeletonAvatar';

const SkeletonSizes = {
  Small: 'S',
  Medium: 'M',
  Large: 'L'
};
const SkeletonAvatarSizes = {
  Small: 'S',
  Medium: 'M',
  Large: 'L',
  ExtraLarge: 'XL'
};


const stories = {
  default: () => {
    const size = select('Size', SkeletonSizes,'M');
    const number = boolean('More elements', false)
    return (
      <div style={{width: '150px'}}>
        <Skeleton size={size} number={number} />
      </div>
    )
  },
  AvatarSkeleton: () => {
    const size = select('Size', SkeletonAvatarSizes,'M');
    return (
      <SkeletonAvatar size={size}  />
    )
  },
};

export default {
name: 'Components/Skeleton',
  config: {},
  stories,
  Component: Skeleton,
}
