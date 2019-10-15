import Pagination from '@synerise/ds-pagination';

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';

import Icon from '@synerise/ds-icon'
import AngleLeftM from '@synerise/ds-icon/dist/icons/angle-left-m.svg';
import AngleRighttM from '@synerise/ds-icon/dist/icons/angle-right-m.svg';

const stories = storiesOf('Components|Pagination', module);


function itemRender(current, type, originalElement) {
    if (type === 'prev') {
        return <Icon component={<AngleLeftM />}/>;
    }
    if (type === 'next') {
        return <Icon component={<AngleRighttM />}/>;
    }
    return originalElement;
}

stories
    .addDecorator(centered)
    .add('default', () => {
  return <Pagination onChange={action('onChange')} itemRender={itemRender} defaultCurrent={1} total={50} />;
});

export default stories;
