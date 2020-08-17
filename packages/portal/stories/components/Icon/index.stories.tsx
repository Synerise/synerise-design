import * as React from 'react';
import { text, number, boolean, select } from '@storybook/addon-knobs';
import Icon from '@synerise/ds-icon';

const req = require.context('@synerise/ds-icon/dist/icons', false, /index.js/);
const iconsRaw = req(req.keys()[0]);
const iconsNames = Object.keys(iconsRaw);

const additionalIconsReq = require.context('@synerise/ds-icon/dist/icons/additional', false, /index.js/);
const lIconsReq = require.context('@synerise/ds-icon/dist/icons/L', false, /index.js/);
const xlIconsReq = require.context('@synerise/ds-icon/dist/icons/XL', false, /index.js/);
const additionalIconsRaw = additionalIconsReq(additionalIconsReq.keys()[0]);
const lIconsRaw = lIconsReq(lIconsReq.keys()[0]);
const xlIconsRaw = xlIconsReq(xlIconsReq.keys()[0]);

const listyStyles: React.CSSProperties = {
  margin: 10,
  padding: 10,
  minWidth: 145,
  textAlign: 'center',
  border: 1,
  borderStyle: 'solid',
  borderColor: '#e0e0e0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap'
};

const getProps = () => ({
  component: select('Select icon name', iconsNames, iconsNames[0]),
  color: text('Set color', 'red'),
  size: number('Size', 40),
  stroke: boolean('Set stroke', false),
});

const IconComponent = ({color}) => {
  return Object.entries(iconsRaw).map(([key, value]) => {
    const IconModule = value as React.ComponentType;
    return (
      <div style={listyStyles} key={key}>
        <Icon component={<IconModule />} color={color} />
        <br />
        <br />
        <p>{key}</p>
      </div>
    );
  });
}

const AdditionalIconComponent = (icons) => {
  return Object.entries(icons).map(([key, value]) => {
    const size = key.substr(-2) === 'Xl' ? 96 : 48;
    const IconModule = value as React.ComponentType;
    return (
      <div style={listyStyles} key={key}>
        <Icon component={<IconModule />} size={size} />
        <br />
        <br />
        <p>{key}</p>
      </div>
    );
  });
}

const stories = {
  singleIcon: () => {
    const props = getProps();
    const IconComp = iconsRaw[props.component];

    return {
      ...props,
      component: <IconComp />,
    };
  },
  listIcon: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>{IconComponent({
      color: text('Set custom color', '')
    })}</div>
  ),
  additionalIcons: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>{AdditionalIconComponent(additionalIconsRaw)}</div>
  ),
  additionalL: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>{AdditionalIconComponent(lIconsRaw)}</div>
  ),
  additionalXL: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>{AdditionalIconComponent(xlIconsRaw)}</div>
  ),
};

export default {
name: 'Components/Icon',
  stories,
  Component: Icon,
};
