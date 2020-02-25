import * as React from 'react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { AngleDownM, AngleDownS, CheckM, CheckS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import markdown from '@/button/README.md';

const typeOptions = {
  Primary: 'primary',
  Secondary: 'secondary',
  TertiaryDark: 'tertiary',
  TertiaryWhite: 'tertiary-white',
  GhostPrimary: 'ghost-primary',
  GhostSecondaryDark: 'ghost',
  GhostSecondaryWhite: 'ghost-white',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
};

const splitTypeOptions = {
  Primary: 'primary',
  Secondary: 'secondary',
  TertiaryDark: 'tertiary',
  TertiaryWhite: 'tertiary-white',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
};

const buttonSizes = {
  default: 'default',
  large: 'large',
};

const iconSizes = {
  Small: 'S',
  Medium: 'M',
};

const getDefaultProps = (isSplit = false) => ({
  label: text('Label', 'Button'),
  type: select('Set type', !isSplit ? typeOptions : splitTypeOptions, 'primary'),
  size: select('Set size', buttonSizes, 'default'),
  leftIconSize: select('Set size of left icon', iconSizes, 'S'),
  rightIconSize: select('Set size of right icon', iconSizes, 'S'),
  disabled: boolean('Disabled', false),
  loading: boolean('Loading', false),
  block: boolean('Block', false),
  onClick: action('onClick CLICK'),
});

const getBackgroundStyles = (type) => {
  const darkBg = ['tertiary-white', 'ghost-white'].includes(type);
  return {background:`${darkBg ? '#384350' : '#fff'}`, display: 'flex', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}
};

const stories = {
  simple: () => {
    const defaultProps = getDefaultProps();
    const props = {
      ...defaultProps,
      style: {
        margin: 4,
      },
    } as object;
    return (
      <div style={getBackgroundStyles(props.type)}>
        <Button {...props} mode='simple'>
          {props.label}
        </Button>
      </div>
    );
  },
  split: () => {
    const defaultProps = getDefaultProps();
    const props = {
      ...getDefaultProps(true),
      style: {
        margin: 4,
      },
    } as object;
    return (
      <div style={getBackgroundStyles(props.type)}>
        <Button {...props} mode='split'>
          {props.label}
          <Icon component={defaultProps.rightIconSize === 'M' ? <AngleDownM /> : <AngleDownS />} />
        </Button>
      </div>
    );
  },
  twoIcons: () => {
    const defaultProps = getDefaultProps();
    const props = {
      ...defaultProps,
      style: {
        margin: 4,
      },
    } as object;
    return (
      <div style={getBackgroundStyles(props.type)}>
        <Button {...props} mode='two-icons'>
          <Icon component={defaultProps.leftIconSize === 'M' ? <CheckM /> : <CheckS />} />
          {props.label}
          <Icon component={defaultProps.rightIconSize === 'M' ? <AngleDownM /> : <AngleDownS />} />
        </Button>
      </div>
    );
  },
  iconLeft: () => {
    const defaultProps = getDefaultProps();
    const props = {
      ...defaultProps,
      style: {
        margin: 4,
      },
    } as object;
    return (
      <div style={getBackgroundStyles(props.type)}>
        <Button {...props} mode='icon-label'>
          <Icon component={defaultProps.leftIconSize === 'M' ? <CheckM /> : <CheckS />} />
          {props.label}
        </Button>
      </div>
    );
  },
  iconRight: () => {
    const defaultProps = getDefaultProps();
    const props = {
      ...defaultProps,
      style: {
        margin: 4,
      },
    } as object;
    return (
      <div style={getBackgroundStyles(props.type)}>
        <Button {...props} mode='label-icon'>
          {props.label}
          <Icon component={defaultProps.rightIconSize === 'M' ? <AngleDownM /> : <AngleDownS />} />
        </Button>
      </div>
    );
  },
  iconSolo: () => {
    const defaultProps = getDefaultProps();
    const props = {
      ...defaultProps,
      style: {
        margin: 4,
      },
    } as object;
    return (
      <div style={getBackgroundStyles(props.type)}>
        <Button {...props} mode='single-icon'>
          <Icon component={defaultProps.leftIconSize === 'M' ? <AngleDownM /> : <AngleDownS />} />
        </Button>
      </div>
    );
  },
};

export default {
  name: 'Components|Button',
  config: {
    notes: {
      markdown,
    },
  },
  stories,
  Component: Button,
};
