import * as React from 'react';
import '@formatjs/intl-relativetimeformat/polyfill';
import { configure, addDecorator, addParameters, storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { DSProvider } from '@synerise/ds-core';
import syneriseTheme from './theme';
import './style/index.css';
const req = require.context('../stories', true, /\.stories.tsx$/);

const withDSProvider = (storyFn) => React.createElement(DSProvider, {
  code: 'en_GB',
}, storyFn());

function loadStories() {
  req.keys().forEach(filename => {
    const {
      Component,
      name,
      stories,
      decorator,
      config = {},
      withoutCenter = false,
    } = req(filename).default;

    if (typeof Component !== undefined && typeof name === 'string' && typeof stories === 'object') {
      const componentStories = storiesOf(name, module);

      if (decorator) {
        componentStories.addDecorator(decorator);
      }

      if (!withoutCenter) {
        componentStories.addDecorator(centered);
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
    theme: syneriseTheme,
  },
});

configure(loadStories, module);
