import { Meta, StoryObj } from '@storybook/react-webpack5';

import { ContentBelowElement, ContentBelowProps } from '@synerise/ds-form-field';
import { fixedWrapper400, REACT_NODE_AS_STRING } from '../../utils';

export default {
    component: ContentBelowElement,
    title: 'Components/FormField/Subcomponents',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        description: 'Description',
        errorText: 'An error message renders here',
    },
    argsTypes: {
        description: REACT_NODE_AS_STRING,
        errorText: REACT_NODE_AS_STRING,
    },
    decorators: [fixedWrapper400],
} as Meta<ContentBelowProps>;

export const ContentBelowElementComponent: StoryObj<ContentBelowProps> = {
    name: 'ContentBelowElement'
}
