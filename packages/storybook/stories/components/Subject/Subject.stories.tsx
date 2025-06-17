import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import Subject from '@synerise/ds-subject';
import type { SubjectProps, ContextItem, ContextGroup } from '@synerise/ds-subject';

import { SUBJECT_ITEMS, SUBJECT_TEXTS } from './data/index.data';

import { controlFromOptionsArray } from '../../utils';
import { AggregateM, NotificationsM, WebhookM } from '@synerise/ds-icon';

export default {
  title: 'Components/Filter/Subject',
  component: Subject,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: args => {
    const [value, setValue] = useState<ContextItem | ContextGroup>(args.selectedItem);
    return (
      <Subject
        {...args}
        selectedItem={value}
        onSelectItem={value => {
          args.onSelectItem && args.onSelectItem(value);
          setValue(value);
        }}
      />
    );
  },
  argTypes: {
    setDropdownVisible: {
      action: 'setDropdownVisible',
    },
    setSelected: {
      action: 'setSelected',
    },
    onActivate: {
      action: 'onActivate',
    },
    onDectivate: {
      action: 'onDectivate',
    },
    onShowPreview: {
      action: 'onShowPreview',
    },
    type: {
      ...controlFromOptionsArray('inline-radio', ['event', 'parameter', 'context']),
    },
  },
  args: {
    texts: SUBJECT_TEXTS,
    items: SUBJECT_ITEMS,
    onClickOutsideEvents: undefined,
    type: 'event',
    placeholder: 'Choose event',
    iconPlaceholder: <NotificationsM />,
    getPopupContainerOverride: (node: HTMLElement | null) => { return node && node.parentElement || document.body }
  },
} as Meta<SubjectProps>;

type Story = StoryObj<SubjectProps>;

export const EventType: Story = {};

export const ParameterType: Story = {
  args: {
    type: 'parameter',
    placeholder: 'Choose parameter',
    iconPlaceholder: <WebhookM />
  },
};

export const ContextType: Story = {
  args: {
    type: 'context',
    placeholder: 'Choose context',
    iconPlaceholder: <AggregateM />
  },
};
