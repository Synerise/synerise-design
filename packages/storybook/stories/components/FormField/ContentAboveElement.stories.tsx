import { Meta, StoryObj } from '@storybook/react';

import { ContentAboveElement, ContentAboveProps } from '@synerise/ds-form-field';
import { fixedWrapper400, REACT_NODE_AS_STRING } from '../../utils';

export default {
    component: ContentAboveElement,
    title: 'Components/FormField/Subcomponents',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        label: 'Label',
        tooltip: 'Label tooltip text',
        rightSide: 'Any ReactNode'
    },
    argsTypes: {
        tooltipConfig: { control: false },
        tooltip: REACT_NODE_AS_STRING,
        rightSide: REACT_NODE_AS_STRING,
        label: REACT_NODE_AS_STRING,
    },
    decorators: [fixedWrapper400],
} as Meta<ContentAboveProps>;

export const ContentAboveElementComponent: StoryObj<ContentAboveProps> = {
    name: 'ContentAboveElement'
}
