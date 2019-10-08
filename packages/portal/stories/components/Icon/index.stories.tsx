import Icon from '@synerise/ds-icon';

import * as React from 'react';

import {storiesOf} from '@storybook/react';
import {boolean, number, text} from '@storybook/addon-knobs';

import AngleLeftM from '@synerise/ds-icon/dist/icons/angle-left-m.svg'

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
    return (
        arr.reduce((obj, item) => {
            obj[item] = item;

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
    // name: select('Select icon name', type, 'angle-up-m'),
    color: text('Set color', 'red'),
    size: number('Size', 40),
    stroke: boolean('Set stroke', false),
});


const IconComponent = icoArr.map(i => {
    return (
        <div key={i} style={listyStyles}>
            <Icon name={i} size={30}/>
            <br/><br/>
            <p>{i}</p>
        </div>
    )
});

stories.add('single icon', () => {
    return (
        <>
            <Icon {...props()} name={'angle-up-m'}/>
            <Icon {...props()} component={<AngleLeftM />} />
        </>
    );
}).add('list icon', () => {
    return (
        <div style={{display: 'flex'}}>
            {IconComponent}
        </div>
    );
});

export default stories;
