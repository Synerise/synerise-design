import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Paragraph as ParagraphComponent } from '@synerise/ds-typography';
import { CLASSNAME_ARG_CONTROL, fixedWrapper300, STRING_CONTROL } from '../../utils';

export default {
  component: ParagraphComponent,
  title: 'tokens/Typography/Paragraph',
  decorators: [fixedWrapper300],
  argTypes: {
    children: STRING_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
  },
  args: {
    size: 'medium',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula eget ipsum vel elementum. Interdum et malesuada fames ac ante ipsum primis.',
  },
} as Meta<typeof ParagraphComponent>;

export const Paragraph: StoryObj<typeof ParagraphComponent> = {};
