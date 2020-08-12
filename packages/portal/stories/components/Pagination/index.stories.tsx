import * as React from 'react';
import { action } from '@storybook/addon-actions';
import Pagination from '@synerise/ds-pagination';

const stories = {
  default: {
    onChange: action('onChange'),
    defaultCurrent: 1,
    total: 5000,
  },
};

export default {
name: 'Components/Pagination',
  stories,
  Component: Pagination,
};
