import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, number, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import markdown from '@/button/README.md';
import Button from '@synerise/ds-button';
const config = {
    notes: { markdown },
};

const ButtonGroup = Button.Group;

const sizes = {
    Default: 'default',
    Small: 'small',
    Large: 'large',
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

const props = {
    regular: () => {
        return {
            disabled: boolean('Disables', false),
            block: boolean('Fit button width', false),
            loading: boolean('Loading status', false),
            htmlType: text('Type button', 'button'),
            href: text('Redirect to link', ''),
            size: select('Button size (size)', sizes, 'default'),
            type: select('Set type', type, 'primary'),
            icon: text('Set icon', 'poweroff'),

            onClick: action('onClick CLICK')
        }
    },
    group: () => {
        return {
            disabled: boolean('Disables', false),
            loading: boolean('Loading status', false),
            size: select('Button size (size)', sizes, 'default'),
            icon: text('Set icon', 'user'),

            onClick: action('onClick CLICK')
        }
    }
};


storiesOf('Components|Button', module)
  .addDecorator(centered)
  .add('with text', () =>  {
      const regularProps = props.regular();
      return (<Button icon="poweroff" {...regularProps}>Hello Button</Button>)
  }, config)
  .add('only icon', () =>  {
      const regularProps = props.regular();
      return (<Button {...regularProps} />)
  }, config)
  .add('group buttons', () =>  {
      const regularProps = props.group();
      return (
          <ButtonGroup>
              <Button type={'warning'} {...regularProps}>Lorem ipsum dolor sit amet</Button>
              <Button type={'default'} {...regularProps}>Lorem</Button>
          </ButtonGroup>
      )
  }, config);
;