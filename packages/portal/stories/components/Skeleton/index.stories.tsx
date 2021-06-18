import { select } from '@storybook/addon-knobs';
import SkeletonAvatar from '@synerise/ds-skeleton/dist/SkeletonAvatar/SkeletonAvatar';
import * as React from 'react';
import Skeleton from '@synerise/ds-skeleton';


const SkeletonAvatarSizes = {
  Small: 'S',
  Medium: 'M',
  Large: 'L',
  ExtraLarge: 'XL'
};
const stories = {
  default: () => {
    const size = select('Size', SkeletonAvatarSizes, 'M');
    return (
      <SkeletonAvatar size={size}/>
    )
  },
};

export default {
  name: 'Components/Skeleton',
  stories,
  Component: Skeleton
};