import { create } from '@storybook/theming';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

export default create({
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
  brandImage: 'https://strapi.synerise.com/uploads/0525bd360f03436f947a2d0fe501ad68.svg',
});
