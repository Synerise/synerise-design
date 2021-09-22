import * as React from 'react';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import ActionArea from '@synerise/ds-action-area';
import mdx from './ActionArea.mdx';

export default {
  title: 'Components/ActionArea',
  component: ActionArea,
  parameters:{
    docs:{
      page:mdx,
      // component: ActionArea,
    }
  },
};

export const Basic = () => (
  <ActionArea
      label={text('Set label', 'Label')}
      description={text('Set description', 'Very long description')}
      actionLabel={text('Set button label', 'Define')}
      action={action('handle action')}
    />
)
export const my = () => {
  <ActionArea
      label={'Label'}
      actionLabel="marek"
      description="very long"
      action={()=>{}}
      />
}