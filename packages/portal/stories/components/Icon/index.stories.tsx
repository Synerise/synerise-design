import * as React from 'react';
import { text, number, boolean, select } from '@storybook/addon-knobs';
import Icon from '@synerise/ds-icon';

const req = require.context('@synerise/ds-icon/dist/icons', false, /test.js/);
const iconsRaw = req(req.keys()[0]);
const iconsNames = Object.keys(iconsRaw);

const additionalIconsReq = require.context('@synerise/ds-icon/dist/icons/additional', false, /test.js/);
const additionalIconsRaw = additionalIconsReq(additionalIconsReq.keys()[0]);
const additionalIconsNames = Object.keys(additionalIconsRaw);

const listyStyles: React.CSSProperties = {
  margin: 10,
  padding: 10,
  minWidth: 145,
  textAlign: 'center',
  border: 1,
  borderStyle: 'solid',
  borderColor: '#e0e0e0',
};

const getProps = () => ({
  component: select('Select icon name', iconsNames, iconsNames[0]),
  color: text('Set color', 'red'),
  size: number('Size', 40),
  stroke: boolean('Set stroke', false),
});

const IconComponent = Object.entries(iconsRaw).map(([key, value]) => {
  const IconModule = value as React.ComponentType;
  return (
    <div style={listyStyles} key={key}>
      <Icon component={<IconModule />} />
      <br />
      <br />
      <p>{key}</p>
    </div>
  );
});

const AdditionalIconComponent = Object.entries(additionalIconsRaw).map(([key, value]) => {
  const IconModule = value as React.ComponentType;
  return (
    <div style={listyStyles} key={key}>
      <Icon component={<IconModule />} size={82} />
      <br />
      <br />
      <p>{key}</p>
    </div>
  );
});

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
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>{IconComponent}</div>
  ),
  additionalListIcon: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>{AdditionalIconComponent}</div>
  ),
};

export default {
  name: 'Components|Icon',
  stories,
  Component: Icon,
};
