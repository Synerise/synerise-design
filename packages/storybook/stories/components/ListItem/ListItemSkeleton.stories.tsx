import React from 'react';
import Skeleton from '@synerise/ds-skeleton';
import { SkeletonProps } from '@synerise/ds-skeleton';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { controlFromOptionsArray, fixedWrapper200, NUMBER_CONTROL } from '../../utils';

export default {
    component: Skeleton,
    title: 'Components/ListItem',
    tags: ['autodocs'],
    decorators: [fixedWrapper200],
    render: (args) => <Skeleton {...args} />,
    parameters: {
        controls: {
            include: ['size', 'numberOfSkeletons']
        }
    },
    argTypes: {
        size: {
            ...controlFromOptionsArray('select',['S', 'M', 'L'])
        },
        numberOfSkeletons: NUMBER_CONTROL
    },
    args: {
        size: 'M',
        numberOfSkeletons: 2
    }
} as Meta<SkeletonProps>;

export const WithSkeleton: StoryObj<SkeletonProps> = {};