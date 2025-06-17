import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import Confirmation, { ConfirmationProps } from '@synerise/ds-confirmation';
import Description, { DescriptionRow } from '@synerise/ds-description';
import { PlayXl, ErrorXl, PauseXl, LaunchXl } from '@synerise/ds-icon';

import { BATCH_ITEMS, COLUMNS, DECISION_OPTIONS, RELATED_OBJECTS_COUNT, RELATED_OBJECTS_DATA } from './Confirmation.data';
import { TreeTable } from '@synerise/ds-table';
import { ListItemProps } from '@synerise/ds-list-item';

import {
  REACT_NODE_AS_STRING,
  BOOLEAN_CONTROL,
  NUMBER_CONTROL,
} from '../../utils';

export default {
  component: Confirmation,
  title: 'Components/Confirmation',
  parameters: {
    layout: 'padded',
  },
  tags: ['new'],
  args: {
    type: 'negative',
    description: 'Please confirm',
    icon: <ErrorXl />,
    open: true,
    texts: {
      mainButtonLabel: 'Yes, activate',
      secondaryButtonLabel: 'No, cancel'
    }
  },
  argTypes: {
    description: REACT_NODE_AS_STRING,
    title: REACT_NODE_AS_STRING,
    open: BOOLEAN_CONTROL,
    zIndex: NUMBER_CONTROL,
    icon: { control: false },
    mainButtonProps: { control: false },
    secondaryButtonProps: { control: false },
    texts: { control: false },
  },
} as Meta<ConfirmationProps<ListItemProps>>;

export const BatchActionConfirmation: StoryObj<ConfirmationProps<ListItemProps>> = {
  args: {
    type: 'negative',
    title: 'Delete 54 aggregates?',
    description: 'Deleting this analysis will cause errors in 3 analyses that contain it. This action can’t be undone',
    texts: {
      mainButtonLabel: 'Yes, delete',
      secondaryButtonLabel: 'No, keep'
    },
    batchActionItems: BATCH_ITEMS,
  }
};

export const SuccessType: StoryObj<ConfirmationProps<ListItemProps>> = {
  args: {
    title: "Launch campaign?",
    type: 'success',
    icon: <PlayXl />,
    texts: {
      mainButtonLabel: 'Yes, activate',
      secondaryButtonLabel: 'No, cancel'
    }
  }
};

export const InformativeType: StoryObj<ConfirmationProps<ListItemProps>> = {
  args: {
    title: "Launch campaign?",
    type: 'informative',
    icon: <LaunchXl />,
    texts: {
      mainButtonLabel: 'Yes, launch',
      secondaryButtonLabel: 'No, cancel'
    },
    additionalInfo: <Description type='inline'>
      <DescriptionRow label='Audience:' value='22 123' />
      <DescriptionRow label='Scheduled:' value='23 May, 2024, 13:25' />
    </Description>
  }
};

export const WarningType: StoryObj<ConfirmationProps<ListItemProps>> = {
  args: {
    title: "Launch campaign?",
    type: 'warning',
    icon: <PauseXl />,
    texts: {
      mainButtonLabel: 'Yes, activate',
      secondaryButtonLabel: 'No, cancel'
    }
  }
};

export const DecisionConfirmation: StoryObj<ConfirmationProps<ListItemProps>> = {
  args: {
    title: 'Delete folder?',
    description: 'Folder contain 23 objects.',
    type: 'negative',
    icon: <ErrorXl />,
    texts: {
      mainButtonLabel: 'Delete',
      secondaryButtonLabel: 'No, keep',
      decisionTitle: 'What do you want to do with items in this folder?'
    },
    decisionOptions: DECISION_OPTIONS
  }
};

export const RelatedObjects: StoryObj<ConfirmationProps<ListItemProps>> = {
  args: {
    title: 'Delete segmentation?',
    type: 'negative',
    icon: <ErrorXl />,
    texts: {
      mainButtonLabel: 'Delete',
      secondaryButtonLabel: 'No, keep',
      relatedObjectsTitle: 'Related objects',
      relatedObjectsButtonLabel: `Show ${RELATED_OBJECTS_COUNT} related objects`
    },
    relatedObjects: <TreeTable showHeader={false} hideTitleBar={true} dataSource={RELATED_OBJECTS_DATA} columns={COLUMNS} />
  }
};
