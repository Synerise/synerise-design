import * as React from 'react';
import Cascader from '@synerise/ds-cascader';
import * as mock from './mock.json';
import {  number } from '@storybook/addon-knobs';
import { limitCategories } from './utils';

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '10vh' }}>
    <div style={{ width: '300px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);

const stories = {
  default: () => {
    const root = mock.default;
    const categoryLimit = number('Set home categories count:',5,{min:5, max: 10})
    return (
      <Cascader
        rootCategory={limitCategories(root,categoryLimit)}
        searchInputPlaceholder={'Search'}
        categorySuffix={'select'}
        onCategorySelect={(item, selected) => {
          console.log('Category clicked:', item, 'Selected:', selected);
        }}
        selectedCategoriesIds={[]}
        dropdownMaxHeight={302}

      />
    );
  },
};

export default {
  name: 'Cascader|Cascader',
  config: {},
  stories,
  decorator,
};
