import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import Tooltip from '@synerise/ds-tooltip';

const wrapperStyles = {
  padding: '60px',
};

const props = () => ({
  title: text('Tooltip text', 'More than just example text'),
  placement: select(
    'Placement',
    [
      'top',
      'left',
      'right',
      'bottom',
      'topLeft',
      'topRight',
      'bottomLeft',
      'bottomRight',
      'leftTop',
      'leftBottom',
      'rightTop',
      'rightBottom',
    ],
    'top'
  ),
  trigger: select('Trigger', ['hover', 'focus', 'click', 'contextMenu'], 'hover'),
});

storiesOf('Components|Tooltip', module)
  .add('default', () => {
    return (
      <div style={wrapperStyles}>
        <Tooltip
          autoAdjustOverflow={boolean('autoAdjustOverflow', true)}
          arrowPointAtCenter={boolean('arrowPointAtCenter', false)}
          {...props()}
        >
          <span>Tooltip will show on mouse enter.</span>
        </Tooltip>
      </div>
    );
  })

  .add('force visibility', () => {
    return (
      <div style={wrapperStyles}>
        <Tooltip
          {...props()}
          autoAdjustOverflow={boolean('autoAdjustOverflow', true)}
          arrowPointAtCenter={boolean('arrowPointAtCenter', false)}
          visible={boolean('visible', true)}
        >
          <span>Tooltip will show on mouse enter.</span>
        </Tooltip>
      </div>
    );
  });
