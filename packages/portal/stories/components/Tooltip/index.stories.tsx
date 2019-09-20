import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, text, number } from '@storybook/addon-knobs';
import Tooltip from '@synerise/ds-tooltip';


const props = () => ({
    title: text('Tooltip text', 'example text'),
    placement: text('Placement', 'top'),
    trigger: text('Trigger', 'hover'),
});


storiesOf('Components|Tooltip', module)
    .add('default', () => {
        return (
            <Tooltip {...props()}>
                <span data-testid="inner-element">Tooltip will show on mouse enter.</span>
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