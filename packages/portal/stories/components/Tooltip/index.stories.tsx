import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import Tooltip from '@synerise/ds-tooltip';


const props = () => ({
    title: text('Tooltip text', 'example text'),
    placement: select('Placement', ['top', 'left', 'right', 'bottom',
        'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'], 'top'),
    trigger: select('Trigger', ['hover', 'focus', 'click', 'contextMenu'], 'hover'),
});


storiesOf('Components|Tooltip', module)
    .add('default', () => {
        return (
            <Tooltip {...props()}>
                <span>Tooltip will show on mouse enter.</span>
            </Tooltip>
        )
    })

    .add('force visibility', () => {
        return (
            <Tooltip {...props()} visible={boolean('visible', true)}>
                <span>Tooltip will show on mouse enter.</span>
            </Tooltip>
        )
    });