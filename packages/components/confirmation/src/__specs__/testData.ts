import { theme } from '@synerise/ds-core';
import type { ListItemProps } from '@synerise/ds-list-item';
import type { RadioProps } from '@synerise/ds-radio';
import type { ConfirmationType } from '../Confirmation.types';

export const RELATED_OBJECTS_LABEL = 'related objects button'
export const PROPS = {
    title: 'TITLE',
    description: 'DESCRIPTION',
    icon: 'ICON',
    mainButtonProps: {
        'data-testid': 'main-button'
    },
    secondaryButtonProps: {
        'data-testid': 'cancel-button'
    },
    texts: {
        relatedObjectsButtonLabel: RELATED_OBJECTS_LABEL
    }
}
export const COLOR_TEST_CASES: { type: ConfirmationType, color: string }[] = [
    {
        type: 'negative',
        color: theme.palette['red-600']
    },
    {
        type: 'success',
        color: theme.palette['green-600']
    },
    {
        type: 'warning',
        color: theme.palette['yellow-600']
    },
    {
        type: 'informative',
        color: theme.palette['blue-600']
    },
]
export const ITEM_NAME = 'TEST1'
export const ITEMS: ListItemProps[] = [{
    text: ITEM_NAME
}]
export const DECISION_OPTIONS: RadioProps[] = [
    {
        value: 'option 1'
    },
    {

        value: 'option 2'
    }
];