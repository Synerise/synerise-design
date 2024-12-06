import * as he from 'he';
import type { StoryObj, Meta } from '@storybook/react';

import CodeSnippet, { CodeSnippetType } from '@synerise/ds-code-snippet';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL, controlFromOptionsArray, fixedWrapper200, NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
} from '../../utils';


const fontSizeOptions = {
  small:12,
  medium:14,
};

const exampleContent =`const registerButton = document.getElementById("registerButton");
const emailInput = document.querySelector(".email-input");
registerButton.addEventListener('click',()=>{
  alert('Invalid data');
  alert(emailInput.value);
  console.log('Something went wrong');
})`


export default {
  title: "Components/CodeSnippet",
  tags: ['autodocs'],
  component: CodeSnippet,
  decorators: [fixedWrapper200],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    children: REACT_NODE_AS_STRING,
    tooltipTitleHover: REACT_NODE_AS_STRING,
    tooltipTitleClick: REACT_NODE_AS_STRING,
    colorSyntax: BOOLEAN_CONTROL,
    rows: NUMBER_CONTROL,
    labelBeforeExpanded: REACT_NODE_AS_STRING,
    labelAfterExpanded: REACT_NODE_AS_STRING,
    wrap: BOOLEAN_CONTROL,
    timeToHideTooltip: NUMBER_CONTROL,
    languages: ['javascript','typescript','json'],
    fontSize: {
      ...controlFromOptionsArray('select', Object.keys(fontSizeOptions)),
      mapping: fontSizeOptions
    },
    type: {
      ...controlFromOptionsArray('select', Object.keys(CodeSnippetType)),
      mapping: CodeSnippetType
    },
  },
} as Meta<typeof CodeSnippet>;

type Story = StoryObj<typeof CodeSnippet>;

export const Default: Story = {
  args: {
    children: "Some code text style",
  },
};
export const SingleLine: Story = {
  args: {
    children: "Some code text style",
    type: 'single-line',
    fontSize: 'small',
    tooltipTitleHover: 'Copy',
    tooltipTitleClick: 'Copied',
  },
};

export const MultiLine: Story = {
  args: {
    children: he.decode(exampleContent),
    type: 'multi-line',
    colorSyntax: true,
    rows: 6,
    tooltipTitleHover: 'Copy',
    tooltipTitleClick: 'Copied',
    labelBeforeExpanded: 'Show more',
    labelAfterExpanded: 'Show less',
    wrap: true,
    timeToHideTooltip: 3000,
  },
};

