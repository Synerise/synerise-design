import {
  type TagBadgeParameters,
  defaultConfig,
} from 'storybook-addon-tag-badges/manager-helpers';
import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

import { theme } from '@synerise/ds-core';

// @ts-ignore
import image from '../public/logo_syne.svg';

// Load code panel addon
import('../addon-code-panel/manager');

const storybookTheme = create({
  base: 'light',
  fontBase: "'Graphik LCG Web', sans-serif",
  barTextColor: theme.palette['grey-800'],
  barSelectedColor: theme.palette['blue-600'],
  barBg: theme.palette['grey-100'],
  appContentBg: theme.palette.white,
  colorPrimary: theme.palette['grey-050'],
  colorSecondary: theme.palette['blue-500'],
  brandTitle: 'Synerise Design System',
  brandUrl: 'https://synerise.com',
  brandImage: image,
});

addons.setConfig({
  theme: storybookTheme,
  tagBadges: [
    {
      tags: 'new',
      badge: {
        text: 'NEW',
        style: {
          backgroundColor: theme.palette['fern-600'],
          color: theme.palette['white'],
          borderRadius: '3px',
          padding: '3px 6px',
        },
        tooltip: 'New component!',
      },
      display: {
        sidebar: [
          { type: 'story', skipInherited: true },
          // { type: 'docs', skipInherited: true },
          { type: 'component', skipInherited: true },
          { type: 'group', skipInherited: true },
        ],
        toolbar: ['docs', 'story'],
        mdx: true,
      },
    },
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
});
