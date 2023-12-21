{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import {
    SkeletonProps
  } from './Skeleton.types';
  import Skeleton from './Skeleton';
  const meta: Meta < SkeletonProps > = {
    title: 'Skeleton',
    component: Skeleton,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < SkeletonProps > ;
  const StoryTemplate: Story = {
    render: (args) => <Skeleton {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      size: 'M',
      numberOfSkeletons: 2,
      width: undefined,
      height: undefined,
    },
  };
}