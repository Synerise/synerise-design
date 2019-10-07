import Icon from '@synerise/ds-icon';

import * as React from 'react';

import {storiesOf} from '@storybook/react';
import {boolean, number, text} from '@storybook/addon-knobs';

import AngleDown from '@synerise/ds-icon/dist/icons/angle-down-m.svg'

const stories = storiesOf('Components|Icon', module);


const props = () => ({
    // name: select('Select icon name', type, 'angle-up-m'),
    color: text('Set color', 'red'),
    size: number('Size', 40),
    stroke: boolean('Set stroke', false),
});


stories.add('single icon', () => {
    return (
        <>
            <Icon {...props()} component={<AngleDown />}/>
        </>
    );
});

export default stories;
