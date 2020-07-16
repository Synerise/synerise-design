import * as React from 'react';
import { text, select, boolean } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import Icon from '@synerise/ds-icon';
import { AngleDownS, DragHandleM, PauseM, PlayM, ShowM, StopM } from '@synerise/ds-icon/dist/icons';

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
  buttonGroup: () => {

    // ButtonGroup props
    const withTitle = boolean('With title', true);
    const title = text('Title', 'Some title');
    const withDescription = boolean('With description', true);
    const description = text('Description', 'Some description');
    const size = select('Button size', buttonSizes, 'default');
    const fullWidth = boolean('Full width', false);
    const buttonsPosition = select('Horizontal position of buttons', positionOfButtons, positionOfButtons.left );

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
  optionButtons:() => {
    const size = select('Button size', buttonSizes, 'default');
    const fullWidth = boolean('Fixed', false);
    const buttonsPosition = select('Horizontal position of buttons', positionOfButtons, positionOfButtons.center);
    const disabledFirst = boolean('DisabledFirst ', false);
    const disabledSecond = boolean('DisabledSecond ', false);
    const spinFirst = boolean ("SpinFirst",false);
    const spinSecond = boolean ("SpinSecond",false);
    const [selectedKey,setSelectedKey] = React.useState('')

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
      <div style={{
        background: '#f2f5f6',
        padding: '16px',
        display: 'flex',
        width: '331px',
        position: 'absolute',
        top: 0,
        left: 237,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ButtonGroup
          size={size}
          fullWidth={fullWidth}
          buttonsPosition={buttonsPosition}
        >
          <Button mode="label"  {...buttonProps} loading={spinFirst} type={selectedKey=== '1'?"primary" : "secondary"} onClick={()=>setSelectedKey('1')}  disabled={disabledFirst}>
            Button
          </Button>
          <Button mode="label"  {...buttonProps} loading={spinSecond} type={selectedKey=== '2'?"primary" : "secondary"} onClick={()=>setSelectedKey('2')} disabled={disabledSecond}>
            Button
          </Button>
        </ButtonGroup>
      </div>
    );
  },
  contentOptionButtons:() => {
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
      <div style={{
        background: '#f2f5f6',
        padding: '16px',
        display: 'flex',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ButtonGroup
          size={size}
          fullWidth={fullWidth}
          buttonsPosition={buttonsPosition}
        >
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
  name: 'Button|ButtonGroup',
  stories,
  Component: ButtonGroup,
};
