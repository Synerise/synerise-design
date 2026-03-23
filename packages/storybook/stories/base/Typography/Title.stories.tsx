import { Meta, StoryObj } from '@storybook/react-vite';
import { Title as TitleComponent } from '@synerise/ds-typography';

import {
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  STRING_CONTROL,
  fixedWrapper300,
} from '../../utils';

export default {
  component: TitleComponent,
  title: 'tokens/Typography/Title',
  decorators: [fixedWrapper300],
  argTypes: {
    children: STRING_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    level: NUMBER_CONTROL,
  },
  args: {
    level: 4,
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  },
} as Meta<typeof TitleComponent>;

export const Title: StoryObj<typeof TitleComponent> = {};

export const TitleWithEllipsis: StoryObj<typeof TitleComponent> = {
  args: {
    ellipsis: {
      tooltip: 'Tooltip shows only if text overflows',
    },
  },
};
