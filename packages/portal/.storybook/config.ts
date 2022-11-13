import * as React from 'react';
import "../../../config/wdyr/wdyr"
import '@formatjs/intl-relativetimeformat/polyfill';
import { configure, addDecorator, addParameters, storiesOf, DecoratorFn } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { DSProvider } from '@synerise/ds-core';
import type { DSProviderProps } from "@synerise/ds-core";
import './style/index.css';
import '@synerise/ds-core/dist/js/style';
import VIEWPORTS from './viewports';
const req = require.context('../stories', true, /\.stories.tsx$/);

const withDSProvider = (storyFn) => {
  /**
   * allows overwriting the default language in storybook with localeStorage entry
   * window.localeStorage.setItem('lang', 'en')
   */
  const optionalUserDefinedLocale = localStorage.getItem('lang')
  const props = {
    code: 'en_GB',
    ...optionalUserDefinedLocale ? { locale: optionalUserDefinedLocale } : {},
  } as DSProviderProps
  return React.createElement(DSProvider, props, storyFn());
}

interface storyConfig {
  Component: React.FunctionComponent | React.ComponentClass,
  name: string,
  stories: {
    [key: string]: object | Function,
  },
  decorator?: DecoratorFn,
  config?: object,
  parameters?: object,
  withoutCenter?: boolean,
}

function loadStories() {
  req.keys().forEach(filename => {
    const {
      Component,
      name,
      stories,
      decorator,
      config = {},
      parameters,
      withoutCenter = false,
    }: storyConfig = req(filename).default;

    if (typeof Component !== undefined && typeof name === 'string' && typeof stories === 'object') {
      const componentStories = storiesOf(name, module);

      if (decorator) {
        componentStories.addDecorator(decorator);
      }

      if (!withoutCenter) {
        componentStories.addDecorator(centered);
      }

      if (parameters) {
        componentStories.addParameters(parameters)
      }

      for (const storyName in stories) {
        if (storyName !== '__docgenInfo') {
          componentStories.add(storyName, () => {
            const key = `${filename}-${storyName}`;
            let storyContext = stories[storyName];

            if (typeof storyContext === 'function') {
              storyContext = storyContext();
            }

            if (React.isValidElement(storyContext)) {
              return React.cloneElement(storyContext, {
                key,
              });
            }

            return React.createElement(Component, {
              key,
              ...storyContext,
            });
          }, config);
        }
      }
    } else {
      console.error(`Missing story data for ${filename}!`);
    }
  });
}

addDecorator(withInfo);
addDecorator(withKnobs);
addDecorator(withDSProvider);

addParameters({
  options: {
    storySort: {
      order: ['Introduction','Tokens','Components'],
      method: 'alphabetical',
    },
  },
  viewport: {
    viewports: VIEWPORTS,
    defaultViewport: 'responsive',
  }
});

configure(loadStories, module);
