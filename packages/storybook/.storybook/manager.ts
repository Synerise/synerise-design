import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';
import {
  defaultConfig,
  type TagBadgeParameters,
} from 'storybook-addon-tag-badges/manager-helpers';

import { theme } from '../../../packages/components/core/src/js/DSProvider/ThemeProvider/theme';
// @ts-ignore
import image from '../public/logo_syne.svg';

// Load code panel addon
import('../addon-code-panel/manager');

// The manager UI renders outside DSProvider, so it takes resolved light values rather than var().
const storybookTheme = create({
  base: 'light',
  fontBase: "'Graphik LCG Web', sans-serif",
  barTextColor: theme.tokens['--ds-color-text-base-default'],
  barSelectedColor: theme.tokens['--ds-color-text-brand-default'],
  barBg: theme.tokens['--ds-color-background-base-muted'],
  appContentBg: theme.tokens['--ds-color-background-base-default'],
  colorPrimary: theme.tokens['--ds-color-background-base-subtle'],
  colorSecondary: theme.tokens['--ds-color-background-brand-solidhover'],
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
          backgroundColor: theme.tokens['--ds-color-custom-fern-600'],
          color: theme.tokens['--ds-color-text-base-onsolid'],
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
    ...defaultConfig.filter((config) => config.tags !== 'new'),
  ] satisfies TagBadgeParameters,
});
