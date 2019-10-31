import * as React from 'react';
import PageHeader from '@synerise/ds-page-header';
import { action } from '@storybook/addon-actions';

const stories = {
  default: {
    title: 'Main page header',
    onGoBack: action('goBack'),
  },
};

export default {
  name: 'Components|PageHeader',
  withoutCenter: true,
  stories,
  Component: PageHeader,
};
