import React from 'react'
import { DSProvider } from '@synerise/ds-core'

import '@formatjs/intl-relativetimeformat/polyfill';

// import 'antd/lib/index.css';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.less';

import './style/index.css';
import '@synerise/ds-core/dist/js/style';
import VIEWPORTS from './viewports';

export const parameters = {
  layout: 'centered',
  viewport: {
    viewports: VIEWPORTS,
    // defaultViewport: 'xxl',
  },
  options: { // from config.ts
    storySort: {
      order: ['Introduction','Tokens','Components'],
      method: 'alphabetical',
    },
  },
};

const withDSProvider = (storyFn) => {
  /**
   * allows overwriting the default language in storybook with localeStorage entry
   * window.localeStorage.setItem('lang', 'en')
   */
  const optionalUserDefinedLocale = localStorage.getItem('lang')
  const props = {
    code: 'en_GB',
    ...optionalUserDefinedLocale ? { locale: optionalUserDefinedLocale } : {},
  } // as DSProviderProps
  return React.createElement(DSProvider, props, storyFn());
}

function changeObjectToStory(fn, context) {
  let storyContext = fn;
  const key = context.id;
  if (typeof storyContext === 'function') {
    storyContext = fn();
  }

  if (React.isValidElement(storyContext)) {
    return React.cloneElement(storyContext, {
      key,
    });
  }

  return React.createElement(context.component, {
    key,
    ...storyContext,
  });
}

export const decorators = [
  changeObjectToStory,
  withDSProvider,
  function applyDecorator(story, { parameters: { decorator } = {} }) {
    if (decorator) {
      // QUIZ: del+1 React.createElement(decorator, {}, story)
      return React.createElement(decorator, {}, story())
    }
    return story();
  },
  // function uncenterLayout(story, { parameters: {  withoutCenter } = {}, ...ctx }) {
  function uncenterLayout(story, ctx) {
    const { parameters: {  withoutCenter } } = ctx;
    if (withoutCenter) {
      ctx.parameters.layout = '';
    }
    return story();
  },
  // (Story) => (
  //   <ThemeProvider theme="default">
  //     <Story />
  //   </ThemeProvider>
  // ),
];
