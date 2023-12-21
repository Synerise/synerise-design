// Storybook Component
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Card from './Card';
const meta: Meta < Card > = {
  title: "Card",
  component: Card
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < Card > ;
const StoryTemplate: Story = {
  render: (args) => <Card {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    raised: false,
    disabled: false,
    style: undefined,
    className: undefined,
    lively: true,
    withHeader: true,
    defaultHeaderBackgroundColor: "#ffffff",
    title: "My Title",
    description: "My Description",
    compactHeader: false,
    icon: "check-circle-o",
    avatar: undefined,
    renderBadge(): null;iconColor: "#626262",
    headerSideChildren: [],
    onHeaderClick: (): void => {}
    withoutPadding = false headerBorderBottom = "1px solid #e8ebef",
    background = 'white-shadow',
    hideContent = true staticContent = [],
    showSideChildrenWhenHeaderHidden = true
  }
};