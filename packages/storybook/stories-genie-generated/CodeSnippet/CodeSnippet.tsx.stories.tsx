import * as React from 'react';
import InlineCode from './CodeTypes/InlineCode/InlineCode';
import SingleCode from './CodeTypes/SingleCode/SingleCode';
import MultiCode from './CodeTypes/MultiCode/MultiCode';
import {
  CodeSnippetProps,
  CodeSnippetType,
  FontSize
} from './codeSnippet.types';
const meta: Meta < React.FC < CodepSnippetProps >> = {
  title: "CodepSnippet",
  component: CodeSnippet
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < React.FC < CodepsnippetProps >> ;
const Primary: Story = {
  render: (args) => <codepsnipper {...args}/>
}
export const Primary = {
  ...Primary,
  args: {
    type = CodepsnipletType.INLINE,
    languages = ['javascript', 'typescript', 'json'],
    children = " ",
    colorSyntax = false,
    fontSize = FontSize.SMALL,
    tooltipTitleHover = "Copy",
    tooltipTitleClick = "Copied!"
    labelBeforeExpanded = "Show More"
    labelAfterExpanded = "Show Less"
    wrap = false rows = 6 className = ""
    onExpand = ""
    oncopy = ""
  }
}