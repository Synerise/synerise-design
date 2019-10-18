import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, number, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import markdown from '@/button/README.md';
import { DSProvider } from '@synerise/ds-core';

import Icon from '@synerise/ds-icon';
import { AngleDownS, DragHandleM, ShowM } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';

const config = {
  notes: { markdown },
};

const type = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Ghost: 'ghost',
  Danger: 'danger',
  Success: 'success',
  Warning: 'warning',
};

const buttonStyle = {
  margin: 20,
};

const props = {
  regular: () => {
    return {
      disabled: boolean('Disables', false),
      block: boolean('Fit button width', false),
      htmlType: text('Type button', 'button'),
      href: text('Redirect to link', ''),
      type: select('Set type', type, 'primary'),

      onClick: action('onClick CLICK'),
    };
  },
};

storiesOf('Components|Button', module)
  .addDecorator(centered)
  .add(
    'with text',
    () => {
      const regularProps = props.regular();
      return (
        <DSProvider code="en_GB">
          <>
            <Button style={buttonStyle} {...regularProps} mode={'simple'}>
              Button
            </Button>
            <Button style={buttonStyle} {...regularProps} mode={'split'}>
              Button
              <Icon component={<AngleDownS />} color={'#ffffff'} />
            </Button>
            <Button style={buttonStyle} {...regularProps} mode={'two-icons'}>
              <Icon component={<DragHandleM />} color={'#ffffff'} />
              Button
              <Icon component={<AngleDownS />} color={'#ffffff'} />
            </Button>
            <Button style={buttonStyle} {...regularProps} mode={'label-icon'}>
              Button
              <Icon component={<AngleDownS />} color={'#ffffff'} />
            </Button>
            <Button style={buttonStyle} {...regularProps} mode={'icon-label'}>
              <Icon component={<AngleDownS />} color={'#ffffff'} />
              Button
            </Button>
            <Button style={buttonStyle} {...regularProps} mode={'single-icon'}>
              <Icon component={<ShowM />} color={'#ffffff'} />
            </Button>
          </>
        </DSProvider>
      );
    },
    config
  );
