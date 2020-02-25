import * as React from 'react';
import { text, select, boolean } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import Icon from '@synerise/ds-icon';
import { AngleDownS, DragHandleM, ShowM } from '@synerise/ds-icon/dist/icons';

const buttonSizes = {
  large: 'large',
  default: 'default',
};

const stories = {
  default: () => {

    // ButtonGroup props
    const withTitle = boolean('With title', true);
    const title = text('Title', 'Some title');
    const withDescription = boolean('With description', true);
    const description = text('Description', 'Some description');
    const size = select('Button size', buttonSizes, 'default');
    const fullWidth = boolean('Full width', false);

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
      content: text('Button text', 'Button'),
      type: buttonTypes.Secondary,
    };

    return (
      <div style={{ background: '#f2f5f6', padding: '16px', display: 'flex', width: '100%', position: 'absolute', top: 0, left: 0, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <ButtonGroup
          size={size}
          title={withTitle && title}
          description={withDescription && description}
          fullWidth={fullWidth}
        >
          <Button mode="single-icon" {...buttonProps}>
            <Icon component={<DragHandleM />} color="#ffffff" />
          </Button>
          <Button mode="icon-label" {...buttonProps}>
            <Icon component={<DragHandleM />} color="#ffffff" />
            Button
          </Button>
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
