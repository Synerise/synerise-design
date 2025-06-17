import { Meta, StoryObj } from '@storybook/react-webpack5';

import { FormFieldLabel, FormFieldLabelProps } from '@synerise/ds-form-field';
import { fixedWrapper400, REACT_NODE_AS_STRING, STRING_CONTROL } from '../../utils';

export default {
    component: FormFieldLabel,
    title: 'Components/FormField/Subcomponents',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        label: 'Label',
        tooltip: 'Label tooltip text'
    },
    argsTypes: {
        id: STRING_CONTROL,
        tooltipConfig: { control: false },
        children: REACT_NODE_AS_STRING,
        tooltip: REACT_NODE_AS_STRING,
        label: REACT_NODE_AS_STRING,
    },
    decorators: [fixedWrapper400],
} as Meta<FormFieldLabelProps>;

export const LabelComponent: StoryObj<FormFieldLabelProps> = {
    name: 'FormFieldLabel'
}
