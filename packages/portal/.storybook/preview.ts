import * as React from 'react';
import '@formatjs/intl-relativetimeformat/polyfill';
import { addDecorator, addParameters } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';
import './style/index.css';
import '@synerise/ds-core/dist/js/style';
import VIEWPORTS from './viewports';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import {withKnobs} from '@storybook/addon-knobs';
// addParameters({
//     docs: {
//         container: DocsContainer,
//         page: DocsPage
//     }
// });

export const parameters = {
  layout:'centered',
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'twitter',
        value: '#00aced',
      },
      {
        name: 'facebook',
        value: '#3b5998',
      },
    ],
  },
  // options: {
  //   storySort: {
  //     order: ['Introduction','Tokens','Components'],
  //     method: 'alphabetical',
  //   },
  // },
  // viewport: {
  //   viewports: VIEWPORTS,
  //   defaultViewport: 'responsive',
  // }
}

// const withDSProvider = (storyFn) => React.createElement(DSProvider, {
//   code: 'en_GB',
// } as object, storyFn());

// addDecorator(withDSProvider);

// export const decorators = [
//   (Story) => React.createElement(DSProvider, {
//     code: 'en_GB',
//   } as object, Story())
// ];
addDecorator(withKnobs);
addDecorator((Story) => React.createElement(DSProvider, {
  code: 'en_GB',
} as object, Story()));


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

