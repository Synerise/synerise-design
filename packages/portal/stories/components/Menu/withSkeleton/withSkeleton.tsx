import { boolean, select } from '@storybook/addon-knobs';
import React from 'react';
import Skeleton from '@synerise/ds-skeleton';

const SkeletonSizes = {
  Small: 'S',
  Medium: 'M',
  Large: 'L',
};
const withSkeleton = () => {
  const size = select('Size', SkeletonSizes, 'M');
  const number = boolean('Show more skeletons', false);
  return (
    <div style={{ width: '150px' }}>
      <Skeleton size={size} number={number} />
    </div>
  );
};

export default withSkeleton;
