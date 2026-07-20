import React from 'react';
import { mockDateDecorator } from 'storybook-mock-date-decorator';
import { configure } from 'storybook/test';

import {
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { Preview } from '@storybook/react-vite';
import {
  DEFAULT_DATA_FORMAT_NOTATION,
  DSProvider,
  TOASTER_DEFAULTS,
  theme,
} from '@synerise/ds-core';
import {
  cssText as darkCssText,
  tokens as darkTokens,
} from '@synerise/ds-tokens/dark';
import {
  cssText as lightCssText,
  tokens as lightTokens,
} from '@synerise/ds-tokens/light';
import { TrayProvider } from '@synerise/ds-tray';

configure({ asyncUtilTimeout: 3000 });

const preview: Preview = {
  globalTypes: {
    dataFormat: {
      description: 'Data Format',
      defaultValue: DEFAULT_DATA_FORMAT_NOTATION,
      toolbar: {
        title: 'Data Format',
        icon: 'calendar',
        items: ['EU', 'US'],
      },
    },
    locale: {
      description: 'Language',
      defaultValue: 'en',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: ['pl', 'en', 'es', 'pt'],
      },
    },
    timeZone: {
      description: 'Timezone',
      toolbar: {
        title: 'Timezone',
        icon: 'time',
        items: [
          'Europe/Warsaw',
          'UTC',
          'America/New_York',
          'Asia/Tokyo',
          'Australia/Darwin',
          'US/Samoa',
        ],
      },
    },
    dsTheme: {
      description: 'Design token theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [
    mockDateDecorator,
    (Story, storyContext) => {
      const selectedTheme = storyContext.globals.dsTheme || 'light';
      const themeCss = selectedTheme === 'dark' ? darkCssText : lightCssText;
      const themeTokens = selectedTheme === 'dark' ? darkTokens : lightTokens;

      // Inject theme CSS vars into the preview iframe
      React.useEffect(() => {
        const doc = document;
        let styleEl = doc.getElementById(
          'ds-token-theme',
        ) as HTMLStyleElement | null;
        if (!styleEl) {
          styleEl = doc.createElement('style');
          styleEl.id = 'ds-token-theme';
          doc.head.appendChild(styleEl);
        }
        styleEl.textContent = `:root { ${themeCss} }`;
        doc.documentElement.setAttribute('data-ds-theme', selectedTheme);
      }, [selectedTheme, themeCss]);

      const DSProviderProps = {
        dataFormatConfig: {
          startWeekDayNotation: storyContext.globals.dataFormat,
          dateFormatNotation: storyContext.globals.dataFormat,
          timeFormatNotation: storyContext.globals.dataFormat,
          numberFormatNotation: storyContext.globals.dataFormat,
        },
        locale: storyContext.globals.locale,
        timeZone: storyContext.globals.timeZone,
        toasterProps: TOASTER_DEFAULTS,
        // Feed the toolbar-selected theme's resolved token map into the provider so
        // useTheme().tokens tracks the Theme toggle, matching the injected CSS above.
        theme: { ...theme, tokens: themeTokens },
      };
      return (
        <DSProvider {...DSProviderProps}>
          <TrayProvider>{Story()}</TrayProvider>
        </DSProvider>
      );
    },
  ],

  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },

    backgrounds: {
      options: {
        dark: { name: 'Dark', value: theme.palette['grey-700'] },
        grey: { name: 'Grey', value: theme.palette['grey-300'] },
        yellow: { name: 'Yellow', value: theme.palette['yellow-100'] },
        light: { name: 'Light', value: '#ffffff' },
      },
    },
    initialGlobals: {
      backgrounds: { value: 'light' },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
      matchers: {
        date: /Date$/i,
      },
    },
    options: {
      storySort: (a, b) => globalThis.deeperSort(a, b),
    },
    docs: {
      source: { type: 'code' },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Stories />
        </>
      ),
    },
  },
};

export default preview;
