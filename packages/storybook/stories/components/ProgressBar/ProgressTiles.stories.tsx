import { Meta, StoryObj } from '@storybook/react-webpack5';
import { ProgressTiles } from '@synerise/ds-progress-bar';

import {
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  fixedWrapper300,
} from '../../utils';
import { COLORS } from './ProgressBar.constants';

type ProgressTilesProps = typeof ProgressTiles;

export default {
  component: ProgressTiles,
  title: 'Components/ProgressBar',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  argTypes: {
    values: { control: false },
    label: REACT_NODE_AS_STRING,
    percent: NUMBER_CONTROL,
  },
  args: {
    label: 'Label',
    tileWidth: '30px',
    percent: 30,
    colors: [
      COLORS.mars,
      COLORS.yellow,
      COLORS.cyan,
      COLORS.red,
      COLORS.yellow,
      COLORS.violet,
    ],
  },
} as Meta<ProgressTilesProps>;

export const WithProgressTiles: StoryObj<ProgressTilesProps> = {
  parameters: {
    docs: {
      source: {
        code: `<ProgressTiles
  label="Label"
  tileWidth="30px"
  percent={30}
  colors={[COLORS.mars, COLORS.yellow, COLORS.cyan, COLORS.red, COLORS.yellow, COLORS.violet]}
/>`,
      },
    },
  },
};
