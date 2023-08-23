import * as React from 'react';

import FieldSet from '@synerise/ds-field-set';
import { boolean, text } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import Switch from '@synerise/ds-switch/dist/Switch';
import { ExpanderWrapper } from '@synerise/ds-field-set/dist/FieldSet.styles';
import Checkbox from '@synerise/ds-checkbox/dist';



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
    const [expanded, setExpanded] = React.useState(false);
    const handleClick = (): void => {
      setExpanded(!expanded);
    }
    return (
      <FieldSet onTitleClick={handleClick} title={title} description={description} prefix={<ExpanderWrapper description={description}><Button.Expander onClick={handleClick} expanded={expanded} /></ExpanderWrapper>} component={ expanded &&
        <Checkbox.Group onChange={values => console.log('Checked values', values)}>
          <Checkbox
            disabled={boolean('Disabled', false)}
            hasError={boolean('Has error', false)}
            indeterminate={boolean('Set indeterminate state of checkbox', false)}
            description="Deliver your campaign"
            errorText={text('Set error message', '')}
            value="A"
          >
            Batch delivery
          </Checkbox>
          <Checkbox
            disabled={boolean('Disabled', false)}
            hasError={boolean('Has error', false)}
            indeterminate={boolean('Set indeterminate state of checkbox', false)}
            description="Lorem ipsum dolor sit amet"
            errorText={text('Set error message', '')}
            value="B"
          >
            Enable a control group
          </Checkbox>
        </Checkbox.Group>
      }  />
    )
  },
  withSwitch: () => {
    const title = text('Title', 'Advanced option');
    const description = text('Description', 'This section is for avanced users only');
    const [checked, setChecked] = React.useState(true);
    return (
      <FieldSet title={title} description={description} prefix={<Switch onChange={setChecked} defaultChecked={true} checked={checked}/>} component={ checked &&
        <Checkbox.Group onChange={values => console.log('Checked values', values)}>
          <Checkbox
            disabled={boolean('Disabled', false)}
            hasError={boolean('Has error', false)}
            indeterminate={boolean('Set indeterminate state of checkbox', false)}
            description="Deliver your campaign to a large list in batches to prevent website-crushing click flods"
            errorText={text('Set error message', '')}
            value="A"
          >
            Batch delivery
          </Checkbox>
          <Checkbox
            disabled={boolean('Disabled', false)}
            hasError={boolean('Has error', false)}
            indeterminate={boolean('Set indeterminate state of checkbox', false)}
            description="A control group is a defined percentage of your audience who
            won’t receive this campaign so you can better understand performance"
            errorText={text('Set error message', '')}
            value="B"
          >
            Enable a control group
          </Checkbox>
        </Checkbox.Group>
      }  />
    )
  },
};

export default {
name: 'Components/FieldSet/WithFirstLevel',
  config: {},
  stories,
  Component: FieldSet,
}
