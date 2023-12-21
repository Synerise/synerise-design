{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import InformationCard, {
    InformationCardProps
  } from './InformationCard';
  const meta: Meta < InformationCardProps > = {
    title: 'Storybook CSF3/InformationCard',
    component: InformationCard,
  };
  export default meta;
  const excludedProps = ['ref'];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < InformationCardProps > ;
  const StoryTemplate: Story = {
    render: (args) => <InformationCard {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      actionButton: false,
      actionButtonTooltipText: '',
      actionButtonCallback: () => {},
      asTooltip: false,
      avatarTooltipText: '',
      copyTooltip: '',
      copiedTooltip: '',
      renderFooter: () => null,
      renderBadge: () => null,
      subtitle: '',
      title: '',
      notice: '',
      footerText: '',
      iconColor: '',
      descriptionConfig: null,
    },
  };
}