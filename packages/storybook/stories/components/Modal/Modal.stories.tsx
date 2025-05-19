import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Modal from '@synerise/ds-modal';
import { ObjectAvatar } from '@synerise/ds-avatar';
import Icon, { MailM, UserM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import { sizes, headerWithPrefix, color } from './Modal.data';

import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  CLASSNAME_ARG_CONTROL, controlFromOptionsArray, NUMBER_CONTROL,
  REACT_NODE_AS_STRING, reactNodeAsSelect,
} from '../../utils';



export default {
  title: "Components/Modal",
  component: Modal,
  render: (args, storyContext) => {
    const visible = storyContext.viewMode === 'docs' ? false : args.visible;
    return <Modal {...args} visible={visible} />
  },
  decorators: [centeredPaddedWrapper],
  argTypes: {
    wrapClassName: CLASSNAME_ARG_CONTROL,
    visible: BOOLEAN_CONTROL,
    title: {
      ...reactNodeAsSelect(
        ['blank', 'title', 'withAvatar', 'iconAndLabel'],
        {
          blank: '',
          title: 'Title',
          withAvatar: headerWithPrefix(
            'Header with avatar',
            <ObjectAvatar
              badgeStatus="active"
              iconComponent={<Icon component={<MailM />} color={theme.palette['red-500']} />}
            />
          ),
          iconAndLabel: headerWithPrefix('Header with icon', <Icon component={<UserM />} color={theme.palette['grey-600']} />),

        }
      ),
    },
    description: REACT_NODE_AS_STRING,
    cancelText: REACT_NODE_AS_STRING,
    okText: REACT_NODE_AS_STRING,
    width: NUMBER_CONTROL,
    okType: REACT_NODE_AS_STRING,
    zIndex: NUMBER_CONTROL,
    bodyBackground: {
      ...controlFromOptionsArray('select', color),
    },
    closable: BOOLEAN_CONTROL,
    confirmLoading: BOOLEAN_CONTROL,
    withTabs: BOOLEAN_CONTROL,
    onOk: {
      action: 'onOk',
    },
    onCancel: {
      action: 'onCancel',
    },
    settingButton: REACT_NODE_AS_STRING,
    showHeaderAction: BOOLEAN_CONTROL,
    headerActions: REACT_NODE_AS_STRING,
    renderCustomFooter: BOOLEAN_CONTROL,
    footer: REACT_NODE_AS_STRING,
    removeFooter: BOOLEAN_CONTROL,
    size: {
      ...controlFromOptionsArray('select', sizes),
    },

  },
} as Meta<typeof Modal>;

type Story = StoryObj<typeof Modal>;


export const Blank: Story = {
  args: {
    visible: true,
    blank: true,
    footer: null,
    size: 'small',
    children: <div style={{ height: 362 }}></div>,
  },
};

export const withHeader: Story = {
  args: {
    visible: true,
    title: 'title',
    description: 'Description',
    footer: null,
    size: 'small',
    children: <div style={{ height: 362 }}></div>,
  },
};


export const Fullscreen: Story = {
  args: {
    visible: true,
    title: 'title',
    description: 'Description',
    size: 'fullScreen',
    children: <div style={{ height: 1400, backgroundColor: 'rgba(0,0,0,0.2)' }}></div>,
  },
};

export const withFooter: Story = {
  args: {
    visible: true,
    title: 'title',
    description: 'Description',
    onOk: 'Apply',
    onCancel: 'Cancel',
    size: 'small',
    children: 'Modal content...',
  },
};


