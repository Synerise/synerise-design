import * as React from 'react';

import { text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions';
import * as accmenu from '../AccordionMenu/index.stories'
import * as actarea from '../ActionArea/index.stories'
import * as dsalert from '../Alert/index.stories'
import * as dsappmenu from '../AppMenu/index.stories'
import * as dsautocomplete from '../Autocomplete/index.stories'

export const story = () => {
  return (
    <div style={{ width: '200px' }}>
      {text('desc', 'sample story')}
    </div>
  );
}

import Button from '@synerise/ds-button';

export const button = () => <Button mode="simple" onClick={action('onclick')}>
  label
</Button>

button.args = {
  variant: 'primary',
};

export const accMenu = accmenu.Default
export const actArea = actarea.default.stories.default
export const Alert = dsalert.default.stories.default
export const AppMenu = dsappmenu.default.stories.default
AppMenu.Component = dsappmenu.default.Component
export const Autocomplete = dsautocomplete.default.stories.default
Autocomplete.component = dsautocomplete.default.Component

export default {
  name: 'Components/AccordionMenu',
  title: 'components',
  config: {},
  // component: dsautocomplete.default.Component,
  component: dsappmenu.default.Component,
  parameters: {
    decorator: ({children}) => <div className="wrapper">{children}</div>,
    withoutCenter: true,
  },
  argTypes: {
    advanced: { control: 'boolean' },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  }
};
