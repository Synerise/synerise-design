import * as React from 'react';

import FieldSet from '@synerise/ds-field-set';
import { text } from '@storybook/addon-knobs';
import Expander from '@synerise/ds-button/dist/Expander/Expander';
import Switch from '@synerise/ds-switch/dist/Switch';
import { ExpanderWrapper } from '@synerise/ds-field-set/dist/FieldSet.styles';



const stories = {

  default: () => {
    const title = text('Title', 'Advanced option');
    return (
      <FieldSet title={title} />
    )
  },
  withDescription: () => {
    const title = text('Title', 'Advanced option');
    const description = text('Description', 'This section is for avanced users only');
    return (
      <FieldSet title={title} description={description}   />
    )
  },
  withExpander: () => {
    const title = text('Title', 'Advanced option');
    const description = text('Description', 'This section is for avanced users only');
    return (
      <FieldSet title={title} description={description} prefix={<ExpanderWrapper description={description}><Expander/></ExpanderWrapper>}  />
    )
  },
  withSwitch: () => {
    const title = text('Title', 'Advanced option');
    const description = text('Description', 'This section is for avanced users only');
    return (
      <FieldSet title={title} description={description} prefix={<Switch/>}  />
    )
  },
};

export default {
name: 'Components/FieldSet/WithFirstLevel',
  config: {},
  stories,
  Component: FieldSet,
}
