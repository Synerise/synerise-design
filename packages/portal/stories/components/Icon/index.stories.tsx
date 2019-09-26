import Icon from '@synerise/ds-icon';

import * as React from 'react';

import {storiesOf} from '@storybook/react';
import {boolean, number, select, text} from '@storybook/addon-knobs';

const stories = storiesOf('Components|Icon', module);

const icoArr = [
    'angle-down-m',
    'angle-right-m',
    'angle-up-m',
    'arrow-back-m',
    'arrow-down-m',
    'arrow-forward-m',
    'arrow-left-m',
    'arrow-right-m',
    'arrow-up-m',
    'file-m',
    'settings-m'
];

const icoArrMap = (arr) => {
    const arrayIcon = arr.map((i) => i.replace(/-/g, "_").toUpperCase());
    return (
        arrayIcon.reduce((obj, item) => {
            obj[item] = item.replace(/_/g, "-").toLowerCase();

            return obj
        }, {})
    )
};

const type = icoArrMap(icoArr);

const listyStyles: React.CSSProperties = {
    margin: 10,
    padding: 10,
    minWidth: 125,
    textAlign: 'center',
    border: 1,
    borderStyle: 'solid',
    borderColor: '#e0e0e0'
};


const props = () => ({
    name: select('Select icon name', type, 'angle-up-m'),
    color: text('Set color', 'red'),
    size: number('Size', 40),
    stroke: boolean('Set stroke', false),
});


const IconComponent = icoArr.map(i => {
    return (
        <div style={listyStyles}>
            <Icon name={i} size={30}/>
            <br/><br/>
            <p>{i}</p>
        </div>
    )
});



stories.add('single icon', () => {
    return (
        <Icon {...props()} />
    );
}).add('list icon', () => {
    return (
        <div style={{display: 'flex'}}>
            {IconComponent}
        </div>
    );
});

export default stories;
