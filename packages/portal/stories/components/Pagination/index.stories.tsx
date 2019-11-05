import * as React from 'react';
import { action } from '@storybook/addon-actions';
import Pagination from '@synerise/ds-pagination';

import Icon from '@synerise/ds-icon';
import AngleLeftM from '@synerise/ds-icon/dist/icons/AngleLeftM';
import AngleRightM from '@synerise/ds-icon/dist/icons/AngleRightM';

const itemRender = (current, type, originalElement) => {
  if (type === 'prev') {
    return <Icon component={<AngleLeftM />} />;
  }
  if (type === 'next') {
    return <Icon component={<AngleRightM />} />;
  }
  return originalElement;
};

const stories = {
  default: {
    onChange: action('onChange'),
    itemRender,
    defaultCurrent: 1,
    total: 50,
  },
};

export default {
  name: 'Components|Pagination',
  stories,
  Component: Pagination,
};
