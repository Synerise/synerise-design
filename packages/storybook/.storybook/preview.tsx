import React from 'react';
import type { Preview } from '@storybook/react';

import { DSProvider, theme } from '@synerise/ds-core';
import { DEFAULT_DATA_FORMAT_NOTATION } from '@synerise/ds-data-format';


const preview: Preview = {
  globalTypes: {
    dataFormat: {
      description: 'Data Format',
      defaultValue: DEFAULT_DATA_FORMAT_NOTATION,
      toolbar: {
        title: 'Data Format',
        icon: 'circlehollow',
        items: ['EU', 'US'],
        
      },
    },
    locale: {
      description: 'Language',
      defaultValue: 'en',
      toolbar: {
        title: 'Language',
        icon: 'circlehollow',
        items: ['pl', 'en', 'es', 'pt'],
        
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
  argTypes: {
    // className: {
    //   control: false,
    //   table: {
    //     type: {
    //       summary: 'string',
    //     }
    //   }
    // }
  },
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
      ],
    },
    controls: {
      sort: 'alpha',
      expanded: true,
      // presetColors: [{ color: '#ff4785', title: 'Coral' }, 'rgba(0, 159, 183, 1)', '#fe4a49'], // get all ds-core swatches
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
