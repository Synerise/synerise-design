import React, { ReactNode } from 'react';
import type { Preview } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';
import { DEFAULT_DATA_FORMAT_NOTATION } from '@synerise/ds-data-format';
import '@synerise/ds-core/dist/js/style';


const preview: Preview = {
  globalTypes: {
    dataFormat: {
      description: 'Data Format',
      defaultValue: DEFAULT_DATA_FORMAT_NOTATION,
      toolbar: {
        title: 'Data Format',
        icon: 'circlehollow',
        items: ['EU', 'US'],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Language',
      defaultValue: 'en',
      toolbar: {
        title: 'Language',
        icon: 'circlehollow',
        items: ['pl', 'en', 'es', 'pt'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [  
    (Story, storyContext) => {
      
      const optionalUserDefinedDataFormatConfig = {
        startWeekDayNotation: storyContext.globals.dataFormat,
        dateFormatNotation: storyContext.globals.dataFormat,
        timeFormatNotation: storyContext.globals.dataFormat,
        numberFormatNotation: storyContext.globals.dataFormat
      }
      
      const DSProviderProps = {
        code: 'en_GB',
        ...optionalUserDefinedDataFormatConfig,
        locale: storyContext.globals.locale,
      };
      
      return (
        <DSProvider {...DSProviderProps}>
          { Story() }
        </DSProvider>
      );
    }
  ],
  parameters: {
    
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
