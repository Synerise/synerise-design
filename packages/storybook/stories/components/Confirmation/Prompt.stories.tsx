import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Prompt, PromptProps } from '@synerise/ds-confirmation';
import { Input } from '@synerise/ds-input';

import {
    REACT_NODE_AS_STRING,
    BOOLEAN_CONTROL,
    NUMBER_CONTROL,
} from '../../utils';

export default {
    component: Prompt,
    title: 'Components/Confirmation/Prompt',
    parameters: {
        layout: 'padded',
    },
    args: {
        type: 'informative',
        title: 'Campaign name',
        open: true,
        texts: {
            mainButtonLabel: 'Next',
            secondaryButtonLabel: 'Cancel'
        }
    },
    argTypes: {
        title: REACT_NODE_AS_STRING,
        content: REACT_NODE_AS_STRING,
        open: BOOLEAN_CONTROL,
        zIndex: NUMBER_CONTROL,
        icon: { control: false },
        mainButtonProps: { control: false },
        secondaryButtonProps: { control: false },
        texts: { control: false },
    },
} as Meta<PromptProps>;

export const Default: StoryObj<PromptProps> = {
    args: {
        content: <Input resetMargin label='Name' placeholder='Enter campaign name' />
    }
}