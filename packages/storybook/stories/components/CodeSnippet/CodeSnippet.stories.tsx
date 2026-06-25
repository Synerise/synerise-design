import type { Meta, StoryObj } from '@storybook/react-vite';
import CodeSnippet, { CodeSnippetType } from '@synerise/ds-code-snippet';
import { FontSize } from '@synerise/ds-code-snippet/dist/CodeSnippet.types';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  controlFromOptionsArray,
  fixedWrapper200,
} from '../../utils';

const fontSizeOptions = {
  small: 12,
  medium: 14,
};

const exampleContent = `const registerButton = document.getElementById("registerButton");
const emailInput = document.querySelector(".email-input");
registerButton.addEventListener('click',()=>{
  alert('Invalid data');
  alert(emailInput.value);
  console.log('Something went wrong');
})`;

export default {
  title: 'Components/CodeSnippet',
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
    overscrollBehavior: controlFromOptionsArray('select', [
      'contain',
      'auto',
      'none',
    ]),
    languages: ['javascript', 'typescript', 'json'],
    fontSize: {
      ...controlFromOptionsArray('select', Object.keys(fontSizeOptions)),
      mapping: fontSizeOptions,
    },
    type: {
      ...controlFromOptionsArray('select', Object.keys(CodeSnippetType)),
      mapping: CodeSnippetType,
    },
  },
} as Meta<typeof CodeSnippet>;

type Story = StoryObj<typeof CodeSnippet>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<CodeSnippet>Some code text style</CodeSnippet>`,
      },
    },
  },
  args: {
    children: 'Some code text style',
  },
};
export const SingleLine: Story = {
  parameters: {
    docs: {
      source: {
        code: `<CodeSnippet
  type={CodeSnippetType.SINGLE_LINE}
  fontSize={12}
  tooltipTitleHover="Copy"
  tooltipTitleClick="Copied"
>
  Some code text style
</CodeSnippet>`,
      },
    },
  },
  args: {
    children: 'Some code text style',
    type: CodeSnippetType.SINGLE_LINE,
    fontSize: FontSize.SMALL,
    tooltipTitleHover: 'Copy',
    tooltipTitleClick: 'Copied',
  },
};

export const MultiLine: Story = {
  parameters: {
    docs: {
      source: {
        code: `<CodeSnippet
  type={CodeSnippetType.MULTI_LINE}
  colorSyntax
  rows={6}
  wrap
  overscrollBehavior="contain"
  tooltipTitleHover="Copy"
  tooltipTitleClick="Copied"
  labelBeforeExpanded="Show more"
  labelAfterExpanded="Show less"
>
  {codeString}
</CodeSnippet>`,
      },
    },
  },
  args: {
    children: exampleContent,
    type: CodeSnippetType.MULTI_LINE,
    colorSyntax: true,
    rows: 6,
    overscrollBehavior: 'contain',
    tooltipTitleHover: 'Copy',
    tooltipTitleClick: 'Copied',
    labelBeforeExpanded: 'Show more',
    labelAfterExpanded: 'Show less',
    wrap: true,
  },
};

export const MultiLineWithHiddenExpandAndCopyButton: Story = {
  parameters: {
    docs: {
      source: {
        code: `<CodeSnippet
  type={CodeSnippetType.MULTI_LINE}
  colorSyntax
  rows={6}
  hideExpandButton
  hideCopyButton
>
  {codeString}
</CodeSnippet>`,
      },
    },
  },
  args: {
    children: exampleContent,
    type: CodeSnippetType.MULTI_LINE,
    colorSyntax: true,
    rows: 6,
    hideExpandButton: true,
    hideCopyButton: true,
  },
};

export const MultiLineExpanded: Story = {
  parameters: {
    docs: {
      source: {
        code: `<CodeSnippet
  type={CodeSnippetType.MULTI_LINE}
  colorSyntax
  rows={6}
  expanded
>
  {codeString}
</CodeSnippet>`,
      },
    },
  },
  args: {
    children: exampleContent,
    type: CodeSnippetType.MULTI_LINE,
    colorSyntax: true,
    rows: 6,
    expanded: true,
  },
};
