import type {
  Meta,
  StoryObj
} from '@storybook/react';
import SectionMessage from './SectionMessage';
const meta: Meta < typeof SectionMessage > = {
  title: "Section Message",
  component: SectionMessage
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < typeof SectionMessage > ;
const StoryTemplate: Story = {
  render: (args) => <SectionMessage {...args} />
};
export const PrimaryStory = {
  ...StoryTemplate,
  args: {
    icon: <Check3M />,
    type: "positive",
    message: "This is a positive message.",
    description: "This is a description of the positive message.",
    showMoreLabel: "Show more details",
    onShowMore: () => alert("Showing more details"),
    onClose: () => alert("Closing..."),
    newClient: true,
    textButton: "Create client"
    withEmphasis: <div>Some emphasized content</div>,
    withLink: (<a href="http://www.example.com">click here</a>),
    unorderedList: (<ul><li>item 1</li><li>item 2</li></ul>),
    color: "blue",
    withClose: true,
    customColor: "#FFFFFF",
    customColorIcon: 'red',
    customIcon: (<UserAddM/>)
  }
};