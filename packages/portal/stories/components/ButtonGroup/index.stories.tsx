import * as React from 'react';

import { DSProvider } from '@synerise/ds-core';
import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import centered from '@storybook/addon-centered/react';

import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';

storiesOf('Components|ButtonGroup', module)
  .addDecorator(centered)
  .add('default', () => {
    // ButtonGroup props
    const withTitle = boolean('With title', true);
    const withDescription = boolean('With description', true);
    
    // Button props
    const buttonTypes = {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
      Ghost: 'ghost',
      Danger: 'danger',
      Success: 'success',
      Warning: 'warning',
    };

    const buttonProps = {
      disabled: boolean('Disable buttons', false),
      loading: boolean('Button loading status', false),
      content: text('Button text', 'Button'),
      type: select('Button type', buttonTypes, 'primary'),
      icon: text('Button icon', 'poweroff'),
    };
    
    return (
      <DSProvider code="en_GB">
        <div style={{ background: '#f2f5f6', padding: '16px', display: 'flex' }}>
          <ButtonGroup
            title={withTitle && 'Some title'}
            description={withDescription && 'Some description'}
          >
            <Button {...buttonProps}>{buttonProps.content}</Button>
            <Button {...buttonProps}>{buttonProps.content}</Button>
            <Button {...buttonProps}>{buttonProps.content}</Button>
          </ButtonGroup>
        </div>
      </DSProvider>
    );
  })
;