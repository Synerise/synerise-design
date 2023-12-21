import * as React from 'react';
import {
  useIntl
} from 'react-intl';
import Icon, {
  ClockM,
  Close3S
} from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip';
import Settings from './Settings/Settings';
import {
  CompletedWithinProps,
  Period
} from './CompletedWithin.types';
import * as S from './CompleteWithin.styles';
const meta: Meta < CompletedWithinProps > = {
  title: "Complete Within",
  component: CompletedWithin
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < CompletedWithinProps > ;
const StoryTemplate: Story = {
  render: (args) => <CompletedWithin   {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {}
};