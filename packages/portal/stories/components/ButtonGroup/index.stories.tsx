import * as React from 'react';
import { text, select, boolean } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import Icon from '@synerise/ds-icon';
import { AngleDownS, DragHandleM } from '@synerise/ds-icon/dist/icons';

const stories = {
  default: () => {
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

    const buttonSizes = {
      large: 'large',
      default: 'default',
    };

    const buttonProps = {
      disabled: boolean('Disable buttons', false),
      loading: boolean('Button loading status', false),
      content: text('Button text', 'Button'),
      type: select('Button type', buttonTypes, 'primary'),
    };

    return (
      <div style={{ background: '#f2f5f6', padding: '16px', display: 'flex' }}>
        <ButtonGroup
          size={select('Button size', buttonSizes, 'default')}
          title={withTitle && 'Some title'}
          description={withDescription && 'Some description'}
        >
          <Button mode="two-icons" {...buttonProps}>
            <Icon component={<DragHandleM />} color="#ffffff" />
            Button
            <Icon component={<AngleDownS />} color="#ffffff" />
          </Button>
          <Button mode='label-icon' {...buttonProps}>
            Button
            <Icon component={<DragHandleM />} color="#ffffff" />
          </Button>
          <Button {...buttonProps} loading>{buttonProps.content}</Button>
          <Button {...buttonProps} disabled>{buttonProps.content}</Button>
        </ButtonGroup>
      </div>
    );
  },
};

export default {
  name: 'Components|ButtonGroup',
  stories,
  Component: ButtonGroup,
};
