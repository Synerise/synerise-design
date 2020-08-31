import * as React from 'react';

import Subject from '@synerise/ds-subject';
import { AggregateM, NotificationsM, VarTypeStringM, WebhookM } from '@synerise/ds-icon/dist/icons';
import { boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

const ITEMS = [...new Array(30)].map((i, index) => ({
  id: index,
  name: `Attribute #${index}`,
  icon: <NotificationsM />,
}));

const ICONS = {
  NotificationsM: <NotificationsM />,
  WebhookM: <WebhookM />,
  VarTypeStringM: <VarTypeStringM />,
  AggregateM: <AggregateM />
}

const DEFAULT_STATE = {
  selected: undefined,
}

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    return (
      <Subject selectItem={(item) => store.set({selected: item})} showPreview={boolean('Show preview button', true) && action('Show preview')} type={select('Select type', ['event', 'parameter', 'context'], 'event')} placeholder={text('Set placeholder', 'Choose event')} iconPlaceholder={ICONS[select('Select placeholder icon', ['NotificationsM', 'WebhookM', 'VarTypeStringM', 'AggregateM'], 'NotificationsM')]} selectedItem={store.state.selected} items={ITEMS}/>
    )
  }
)};

export default {
name: 'Components/Subject',
  config: {},
  stories,
  Component: Subject,
}
