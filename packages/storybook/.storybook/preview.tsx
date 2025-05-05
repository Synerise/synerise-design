import React from 'react';
import { Preview } from '@storybook/react';
import { configure } from '@storybook/test';

import { DSProvider, theme } from '@synerise/ds-core';
import { DEFAULT_DATA_FORMAT_NOTATION } from '@synerise/ds-data-format';
import { Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import { mockDateDecorator } from 'storybook-mock-date-decorator';
import { TOASTER_DEFAULTS } from '@synerise/ds-toaster';

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
        items: ['Europe/Warsaw', 'UTC', 'America/New_York', 'Asia/Tokyo', 'Australia/Darwin', 'US/Samoa'],
      },
    },
  },
  decorators: [
    mockDateDecorator,
    (Story, storyContext) => {
      const DSProviderProps = {
        dataFormatConfig: {
          startWeekDayNotation: storyContext.globals.dataFormat,
          dateFormatNotation: storyContext.globals.dataFormat,
          timeFormatNotation: storyContext.globals.dataFormat,
          numberFormatNotation: storyContext.globals.dataFormat,
        },
        locale: storyContext.globals.locale,
        timeZone: storyContext.globals.timeZone,
        toasterProps: TOASTER_DEFAULTS
      };
      return <DSProvider {...DSProviderProps}>{Story()}</DSProvider>;
    },
  ],

  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#ffffff',
        },
        {
          name: 'grey',
          value: theme.palette['grey-300'],
        },
        {
          name: 'dark',
          value: theme.palette['grey-700'],
        },
      ],
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
