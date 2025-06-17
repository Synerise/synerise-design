import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Text as TextComponent } from '@synerise/ds-typography';
import { CLASSNAME_ARG_CONTROL, fixedWrapper300, STRING_CONTROL } from '../../utils';

export default {
  component: TextComponent,
  title: 'tokens/Typography/Text',
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
} as Meta<typeof TextComponent>;

export const Text: StoryObj<typeof TextComponent> = {};

export const TextWithEllipsis: StoryObj<typeof TextComponent> = {
  args: {
    ellipsis: {
      tooltip: 'Tooltip shows only if text overflows',
    },
  },
};
