import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { within, waitFor, userEvent, fn, expect } from 'storybook/test';
import Confirmation, { ConfirmationProps } from '@synerise/ds-confirmation';
import ConfirmationMeta, { RelatedObjects } from './Confirmation.stories'
import { ListItemProps } from '@synerise/ds-list-item';

export default {
    ...ConfirmationMeta,
    title: 'Components/Confirmation/Tests',
    tags: ['visualtests'],

} as Meta<ConfirmationProps<ListItemProps>>;

const RELATED_OBJECTS_BUTTON_LABEL = 'RELATED_OBJECTS_BUTTON_LABEL'
const RELATED_OBJECTS_TITLE = 'Related objects';

export const RelatedObjectsModal: StoryObj<ConfirmationProps<ListItemProps>> = {
    args: {
        ...RelatedObjects.args,
        texts: {
            relatedObjectsTitle: RELATED_OBJECTS_TITLE,
            relatedObjectsButtonLabel: RELATED_OBJECTS_BUTTON_LABEL
        }
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement.parentElement!);
        await userEvent.click(await canvas.findByText(RELATED_OBJECTS_BUTTON_LABEL))
        await canvas.findByText(RELATED_OBJECTS_TITLE);
    }
}
