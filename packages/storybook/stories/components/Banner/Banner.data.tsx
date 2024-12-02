import React from 'react';

import Icon, {
  ArrowRightCircleM,
  RelationManyManyL,
  UserS,
  FunnelColor,
  ProductLastSeenColor,
  ProductBundleColor,
  ABtestColor,
} from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import { UserAvatar } from '@synerise/ds-avatar';
import { theme } from '@synerise/ds-core';

export const SLIDES = [
  {
    label: 'Layout example: leftSideContent: image, mainContent: text ',
    leftSideContent: {
      media: <Icon component={<ProductBundleColor />} size={128} />,
    },
    mainContent: {
      title: 'Main banner header',
      titleStatus: { name: 'Beta' },
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan ut leo et viverra. Nulla ut
            vulputate quam. Quisque nec nulla sed nulla consectetur maximus.`,
      buttons: (
        <>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
        </>
      ),
    },
  },
  {
    label: 'Layout example: leftSideContent: image, rightSideContent: text ',
    leftSideContent: {
      media: <Icon component={<FunnelColor />} size={128} />,
    },
    rightSideContent: {
      title: 'Main banner header',
      titlePrefix: <Icon size={48} component={<RelationManyManyL />} />,
      titleStatus: { color: theme.palette['fern-600'], name: 'Alpha' },
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan ut leo et viverra. Nulla ut
            vulputate quam. Quisque nec nulla sed nulla consectetur maximus.`,
      buttons: (
        <>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
        </>
      ),
    },
  },
  {
    label: 'Layout example: rightSideContent: image, mainContent: text ',
    rightSideContent: {
      media: <Icon component={<ABtestColor />} size={128} />,
    },
    mainContent: {
      title: 'Main banner header',
      titlePrefix: (
        <UserAvatar
          backgroundColor="grey-200"
          size="medium"
          iconComponent={<Icon component={<UserS />} color={theme.palette['grey-600']} />}
        />
      ),
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan ut leo et viverra. Nulla ut
            vulputate quam. Quisque nec nulla sed nulla consectetur maximus.`,
      buttons: (
        <>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
        </>
      ),
    },
  },
  {
    label: 'Layout example: leftSideContent: image, rightSideContent: image, mainContent: text ',
    leftSideContent: {
      media: <Icon component={<ProductBundleColor />} size={128} />,
    },
    rightSideContent: {
      media: <Icon component={<FunnelColor />} size={128} />,
    },
    mainContent: {
      title: 'Main banner header',
      titlePrefix: <Icon size={48} component={<RelationManyManyL />} />,
      titleStatus: { color: theme.palette['red-600'], name: 'Beta' },
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan ut leo et viverra. Nulla ut
            vulputate quam. Quisque nec nulla sed nulla consectetur maximus.`,
      buttons: (
        <>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
        </>
      ),
    },
  },
  {
    label: 'Layout example: mainContent: image',
    mainContent: {
      media: <Icon component={<ProductLastSeenColor />} size={128} />,
    },
  },
  {
    label: 'Layout example: mainContent: text',
    mainContent: {
      title: 'Main banner header',
      titlePrefix: <Icon size={48} component={<RelationManyManyL />} />,
      titleStatus: { name: 'Beta' },
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan ut leo et viverra. Nulla ut
            vulputate quam. Quisque nec nulla sed nulla consectetur maximus.`,
      buttons: (
        <>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
          <Button type="ghost-primary" mode="label-icon">
            Button <Icon component={<ArrowRightCircleM />} />
          </Button>
        </>
      ),
    },
  },
];
