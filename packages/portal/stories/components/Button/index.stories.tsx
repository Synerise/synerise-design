import * as React from 'react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { AngleDownM, AngleDownS, CheckM, CheckS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import markdown from '@/button/README.md';
import { CreatorStatus } from '@synerise/ds-button/dist/Creator/Creator.types';
import { withState } from '@dump247/storybook-state';
import ButtonGroup from '@synerise/ds-button-group';

const typeOptions = {
  Primary: 'primary',
  Secondary: 'secondary',
  TertiaryDark: 'tertiary',
  TertiaryWhite: 'tertiary-white',
  GhostPrimary: 'ghost-primary',
  GhostSecondaryDark: 'ghost',
  GhostSecondaryWhite: 'ghost-white',
  CustomColor: 'custom-color',
  CustomColorGhost: 'custom-color-ghost',
};

const splitTypeOptions = {
  Primary: 'primary',
  Secondary: 'secondary',
  TertiaryDark: 'tertiary',
  TertiaryWhite: 'tertiary-white',
  CustomColor: 'custom-color',
  CustomColorGhost: 'custom-color-ghost',
};

const customColorOptions = {
  blue: 'blue',
  grey: 'grey',
  red: 'red',
  green: 'green',
  yellow: 'yellow',
  pink: 'pink',
  mars: 'mars',
  orange: 'orange',
  fern: 'fern',
  cyan: 'cyan',
  purple: 'purple',
  violet: 'violet',
};

const buttonSizes = {
  default: 'default',
  large: 'large',
};

const iconSizes = {
  Small: 'S',
  Medium: 'M',
};

const CREATOR_TYPE = {
  default: CreatorStatus.Default,
  upload: CreatorStatus.Upload,
  validated: CreatorStatus.Error,
};

const getDefaultProps = (isSplit = false) => ({
  label: text('Label', 'Button'),
  type: select('Set type', !isSplit ? typeOptions : splitTypeOptions, 'primary'),
  color: select('Set custom color', customColorOptions, customColorOptions.red),
  size: select('Set size', buttonSizes, 'default'),
  leftIconSize: select('Set size of left icon', iconSizes, 'S'),
  rightIconSize: select('Set size of right icon', iconSizes, 'S'),
  disabled: boolean('Disabled', false),
  loading: boolean('Loading', false),
  block: boolean('Block', false),
  onClick: action('onClick CLICK'),
});
const getExpanderProps = (isSplit = false) => ({
  size: select('Set size', iconSizes, 'S'),
  disabled: boolean('Disabled', false),
});
const getCreatorKnobs = (isSplit = false) => ({
  disabled: boolean('Disabled', false),
  status: select('Set creator mode', CREATOR_TYPE, CREATOR_TYPE.default),
});
const getBackgroundStyles = type => {
  const darkBg = ['tertiary-white', 'ghost-white'].includes(type);
  return {
    background: `${darkBg ? '#384350' : '#fff'}`,
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  };
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
        <Button {...props} mode="simple">
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
        margin: 0,
      },
    } as object;
    return (
      <ButtonGroup style={getBackgroundStyles(props.type)}>
        <Button
          mode="label"
          {...props}
          type='primary'
        >
          {props.label}
        </Button>
        <Button
          mode="single-icon"
          {...props}
          type='primary'
        >
          <Icon component={ <AngleDownS />} />
        </Button>
      </ButtonGroup>
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
        <Button {...props} mode="two-icons">
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
        <Button {...props} mode="icon-label">
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
        <Button {...props} mode="label-icon">
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
        <Button {...props} mode="single-icon">
          <Icon component={defaultProps.leftIconSize === 'M' ? <AngleDownM /> : <AngleDownS />} />
        </Button>
      </div>
    );
  },
  withCustomLabel: () => {
    const defaultProps = getDefaultProps();
    const props = {
      ...defaultProps,
      style: {
        margin: 4,
      },
    } as object;
    return (
      <div style={getBackgroundStyles(props.type)}>
        <Button {...props} mode="icon-label">
          <Icon component={<CheckM />} />
          <span style={{ fontWeight: 400 }}>
            <span style={{ display: 'inline' }}>Show</span>{' '}
            <strong style={{ display: 'inline', fontWeight: 500 }}>10</strong>{' '}
            <span style={{ display: 'inline' }}>more</span>
          </span>
        </Button>
      </div>
    );
  },
  expander: withState({
    expanded: false,
  })(({ store }) => {
    const handleClick = () => {
      store.set({ expanded: !store.state.expanded });
    };
    const expanderProps = getExpanderProps();
    const props = {
      ...expanderProps,
      style: {
        margin: 4,
      },
    } as object;
    return (
      <div style={getBackgroundStyles(props.type)}>
        <Button.Expander {...expanderProps} onClick={handleClick} expanded={store.state.expanded} />
      </div>
    );
  }),
  creator: () => {
    const creatorProps = getCreatorKnobs();
    const props = {
      ...creatorProps,
      style: {
        margin: 4,
      },
    } as object;
    return (
      <Button.Creator
        {...props}
        onClick={() => {
          console.log('Button clicked!');
        }}
      ></Button.Creator>
    );
  },
  creatorWithLabel: () => {
    const creatorProps = getCreatorKnobs();
    const props = {
      ...creatorProps,
      style: {
        margin: 4,
      },
    } as object;
    return (
      <div>
        <Button.Creator {...props} label={'Add position'} onClick={action('Creator Click')}></Button.Creator>
      </div>
    );
  },
};

export default {
  name: 'Button/Button',
  config: {
    notes: {
      markdown,
    },
  },
  stories,
  Component: Button,
};
