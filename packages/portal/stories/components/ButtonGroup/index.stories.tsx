import * as React from 'react';
import { text, select, boolean } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import Icon, { AngleDownS, DragHandleM, PauseM, PlayM, ShowM, StopM } from '@synerise/ds-icon';

const buttonSizes = {
  large: 'large',
  default: 'default',
};

const positionOfButtons = {
  left: 'left',
  center: 'center',
  right: 'right',
};

const stories = {
  groupButtons: () => {
    // ButtonGroup props
    const size = select('Button size', buttonSizes, 'default');
    const fullWidth = boolean('Full width', false);
    const buttonsPosition = select('Horizontal position of buttons', positionOfButtons, positionOfButtons.center);

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
      <div
        style={{
          background: '#f2f5f6',
          padding: '16px',
          display: 'flex',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ButtonGroup
          size={size}
          fullWidth={fullWidth}
          buttonsPosition={buttonsPosition}
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
          <Button mode="label-icon" {...buttonProps}>
            Button
            <Icon component={<DragHandleM />} color="#ffffff" />
          </Button>
          <Button {...buttonProps} loading>
            {buttonProps.content}
          </Button>
          <Button {...buttonProps} disabled>
            {buttonProps.content}
          </Button>
        </ButtonGroup>
      </div>
    );
  },
  optionButtons: () => {
    const size = select('Button size', buttonSizes, 'default');
    const fullWidth = boolean('Fixed', false);
    const buttonsPosition = select('Horizontal position of buttons', positionOfButtons, positionOfButtons.center);
    const disabledFirst = boolean('DisabledFirst ', false);
    const disabledSecond = boolean('DisabledSecond ', false);
    const spinFirst = boolean('SpinFirst', false);
    const spinSecond = boolean('SpinSecond', false);
    const [selectedKey, setSelectedKey] = React.useState('');

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
      type: buttonTypes.Secondary,
    };
    return (
      <div
        style={{
          background: '#f2f5f6',
          padding: '16px',
          display: 'flex',
          width: '331px',
          margin: 'auto',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ButtonGroup size={size} fullWidth={fullWidth} buttonsPosition={buttonsPosition}>
          <Button
            mode="label"
            {...buttonProps}
            loading={spinFirst}
            type={selectedKey === '1' ? 'primary' : 'secondary'}
            onClick={() => setSelectedKey('1')}
            disabled={disabledFirst}
          >
            Button
          </Button>
          <Button
            mode="label"
            {...buttonProps}
            loading={spinSecond}
            type={selectedKey === '2' ? 'primary' : 'secondary'}
            onClick={() => setSelectedKey('2')}
            disabled={disabledSecond}
          >
            Button
          </Button>
        </ButtonGroup>
      </div>
    );
  },
  contentOptionButtons: () => {
    const size = select('Button size', buttonSizes, 'default');
    const fullWidth = boolean('Full width', false);
    const buttonsPosition = select('Horizontal position of buttons', positionOfButtons, positionOfButtons.center);
    const disabled = boolean('Disabled ', false);

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
      type: buttonTypes.Secondary,
    };
    return (
      <div
        style={{
          background: '#f2f5f6',
          padding: '16px',
          display: 'flex',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ButtonGroup size={size} fullWidth={fullWidth} buttonsPosition={buttonsPosition}>
          <Button mode="single-icon" {...buttonProps} disabled={disabled}>
            <Icon component={<ShowM />} color="#ffffff" />
          </Button>
          <Button mode="label" {...buttonProps} disabled={disabled}>
            Button
          </Button>
          <Button mode="two-icons" {...buttonProps} disabled={disabled}>
            <Icon component={<PlayM />} color="#ffffff" />
            Button
            <Icon component={<AngleDownS />} color="#ffffff" />
          </Button>
          <Button mode="label-icon" {...buttonProps} disabled={disabled}>
            Button
            <Icon component={<PauseM />} color="#ffffff" />
          </Button>
          <Button mode="icon-label" {...buttonProps} disabled={disabled}>
            <Icon component={<StopM />} color="#ffffff" />
            Button
          </Button>
        </ButtonGroup>
      </div>
    );
  },
};

export default {
  name: 'Components/Button/ButtonGroup',
  stories,
  Component: ButtonGroup,
};
