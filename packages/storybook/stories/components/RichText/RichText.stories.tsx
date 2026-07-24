import React, { useState } from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import RichText, { RichTextProps } from '@synerise/ds-rich-text';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
  STYLE_ARG_CONTROL,
  fixedHeightWrapper,
} from '../../utils';

type Story = StoryObj<RichTextProps>;

export default {
  title: 'Components/RichText',
  component: RichText,
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedHeightWrapper],
  render: (args) => {
    const [content, setContent] = useState(args.value ?? '');
    const handleChange = (html: string) => {
      args.onChange?.(html);
      setContent(html);
    };
    return <RichText {...args} value={content} onChange={handleChange} />;
  },
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    label: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    errorText: REACT_NODE_AS_STRING,
    tooltip: REACT_NODE_AS_STRING,
    placeholder: STRING_CONTROL,
    readOnly: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    hideToolbar: BOOLEAN_CONTROL,
    subtle: BOOLEAN_CONTROL,
    animations: BOOLEAN_CONTROL,
    noBorder: BOOLEAN_CONTROL,
    autoFocus: BOOLEAN_CONTROL,
    height: STRING_CONTROL,
    maxHeight: STRING_CONTROL,
  },
  args: {
    value: '',
    label: 'Rich Text Editor',
    description: 'Format your content using the toolbar above.',
    placeholder: 'Start typing...',
    tooltip: 'Rich text editor with formatting options',
    readOnly: false,
    disabled: false,
    hideToolbar: false,
    subtle: false,
    animations: false,
    noBorder: false,
    autoFocus: false,
    onChange: fn(),
    onEditorReady: fn(),
  },
} as Meta<RichTextProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Format your content using the toolbar above."
  placeholder="Start typing..."
  tooltip="Rich text editor with formatting options"
  value={content}
  onChange={setContent}
/>`,
      },
    },
  },
};

export const WithContent: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Format your content using the toolbar above."
  placeholder="Start typing..."
  tooltip="Rich text editor with formatting options"
  value={'<h2>Hello World</h2><p>This is a <strong>rich text</strong> editor with <em>formatting</em> support.</p><ul><li>Bold, italic, underline</li><li>Headings</li><li>Lists</li><li><a href="https://synerise.com">Links</a></li></ul>'}
  onChange={setContent}
/>`,
      },
    },
  },
  args: {
    value:
      '<h2>Hello World</h2><p>This is a <strong>rich text</strong> editor with <em>formatting</em> support.</p><ul><li>Bold, italic, underline</li><li>Headings</li><li>Lists</li><li><a href="https://synerise.com">Links</a></li></ul>',
  },
};

export const ReadOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Format your content using the toolbar above."
  tooltip="Rich text editor with formatting options"
  value={content}
  readOnly
/>`,
      },
    },
  },
  args: {
    ...WithContent.args,
    readOnly: true,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Format your content using the toolbar above."
  tooltip="Rich text editor with formatting options"
  value={content}
  disabled
/>`,
      },
    },
  },
  args: {
    ...WithContent.args,
    disabled: true,
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Format your content using the toolbar above."
  placeholder="Start typing..."
  tooltip="Rich text editor with formatting options"
  errorText="This field is required"
  value={content}
  onChange={setContent}
/>`,
      },
    },
  },
  args: {
    errorText: 'This field is required',
  },
};

export const NoBorder: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Format your content using the toolbar above."
  placeholder="Start typing..."
  tooltip="Rich text editor with formatting options"
  value={content}
  onChange={setContent}
  noBorder
/>`,
      },
    },
  },
  args: {
    noBorder: true,
  },
};

export const Subtle: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Hover to reveal the edit affordance, click to edit, click outside to go back to preview."
  placeholder="Start typing..."
  tooltip="Rich text editor with formatting options"
  value={content}
  onChange={setContent}
  subtle
/>`,
      },
    },
  },
  args: {
    ...WithContent.args,
    subtle: true,
    description:
      'Hover to reveal the edit affordance, click to edit, click outside to go back to preview.',
  },
};

export const SubtleAnimated: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Hovering slides the content into the editing position before you click."
  placeholder="Start typing..."
  tooltip="Rich text editor with formatting options"
  value={content}
  onChange={setContent}
  subtle
  animations
/>`,
      },
    },
  },
  args: {
    ...WithContent.args,
    subtle: true,
    animations: true,
    description:
      'Hovering slides the content into the editing position before you click.',
  },
};

export const LimitedToolbar: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Format your content using the toolbar above."
  placeholder="Start typing..."
  tooltip="Rich text editor with formatting options"
  toolbarFeatures={['bold', 'italic', 'underline', 'link']}
  value={content}
  onChange={setContent}
/>`,
      },
    },
  },
  args: {
    toolbarFeatures: ['bold', 'italic', 'underline', 'link'],
  },
};

export const WithFixedHeight: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Format your content using the toolbar above."
  placeholder="Start typing..."
  tooltip="Rich text editor with formatting options"
  height={200}
  maxHeight={200}
  value={content}
  onChange={setContent}
/>`,
      },
    },
  },
  args: {
    height: 200,
    maxHeight: 200,
  },
};

export const HiddenToolbar: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Format your content using the toolbar above."
  placeholder="Start typing..."
  tooltip="Rich text editor with formatting options"
  value={'<p>Editor without toolbar</p>'}
  onChange={setContent}
  hideToolbar
/>`,
      },
    },
  },
  args: {
    hideToolbar: true,
    value: '<p>Editor without toolbar</p>',
  },
};

/** format="markdown": value and onChange are a Markdown string (shown live below the editor). */
export const MarkdownFormat: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  format="markdown"
  label="Markdown editor"
  description='value / onChange are Markdown strings (format="markdown").'
  placeholder="Start typing in Markdown..."
  value={markdown}
  onChange={setMarkdown}
/>`,
      },
    },
  },
  render: (args) => {
    const [content, setContent] = useState((args.value as string) ?? '');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <RichText
          {...args}
          format="markdown"
          value={content}
          onChange={(v) => {
            args.onChange?.(v);
            setContent(v as string);
          }}
        />
        <pre
          style={{
            background: '#f1f5f9',
            padding: 12,
            borderRadius: 4,
            fontSize: 11,
            whiteSpace: 'pre-wrap',
          }}
        >
          {content}
        </pre>
      </div>
    );
  },
  args: {
    label: 'Markdown editor',
    description: 'value / onChange are Markdown strings (format="markdown").',
    value: '',
    placeholder: 'Start typing in Markdown...',
  },
};

export const WithTable: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Format your content using the toolbar above."
  tooltip="Rich text editor with formatting options"
  value={'<p>Use the table tool to insert a table.</p><table><tbody><tr><th><p>Feature</p></th><th><p>Status</p></th></tr><tr><td><p>Tables</p></td><td><p>Supported</p></td></tr></tbody></table>'}
  onChange={setContent}
/>`,
      },
    },
  },
  args: {
    value:
      '<p>Use the table tool to insert a table; the dropdown adds/removes rows & columns when the caret is inside one.</p><table><tbody><tr><th><p>Feature</p></th><th><p>Status</p></th></tr><tr><td><p>Tables</p></td><td><p>Supported</p></td></tr></tbody></table>',
  },
};

export const WithCodeSnippet: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Format your content using the toolbar above."
  tooltip="Rich text editor with formatting options"
  value={'<p>A single-line code snippet renders in a grey box with a copy button:</p><pre data-type="code-snippet"><code>npm i @synerise/ds-rich-text</code></pre>'}
  onChange={setContent}
/>`,
      },
    },
  },
  args: {
    value:
      '<p>A single-line code snippet renders in a grey box with a copy button:</p><pre data-type="code-snippet"><code>npm i @synerise/ds-rich-text</code></pre><p>Insert one from the toolbar.</p>',
  },
};

/** Pink "Edit with AI" button appears when an onEditWithAI handler is provided. */
export const EditWithAI: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Rich Text Editor"
  description="Format your content using the toolbar above."
  tooltip="Rich text editor with formatting options"
  value={content}
  onChange={setContent}
  onEditWithAI={(selectedText) => aiService.improveText(selectedText)}
/>`,
      },
    },
  },
  args: {
    value:
      '<p>Select some text and click <strong>Edit with AI</strong> (this demo uppercases it).</p>',
    onEditWithAI: (text: string) =>
      new Promise<string>((resolve) => {
        setTimeout(() => resolve(text.toUpperCase()), 600);
      }),
  },
};

/** editWithAIOptions turns the Edit with AI button into a dropdown; each option's behavior is consumer-defined. */
export const EditWithAIDropdown: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  value={content}
  onChange={setContent}
  editWithAIOptions={[
    { key: 'improve', label: 'Improve writing', onSelect: (text) => aiService.improve(text) },
    { key: 'shorten', label: 'Make shorter', onSelect: (text) => aiService.shorten(text) },
    // resolve undefined to handle the action yourself (content stays unchanged)
    { key: 'custom', label: 'Open assistant...', onSelect: () => { openAssistant(); } },
  ]}
/>`,
      },
    },
  },
  args: {
    value:
      '<p>Select some text and pick an option from the <strong>Edit with AI</strong> dropdown.</p>',
    editWithAIOptions: [
      {
        key: 'uppercase',
        label: 'Uppercase',
        onSelect: (text: string) =>
          new Promise<string>((resolve) => {
            setTimeout(() => resolve(text.toUpperCase()), 400);
          }),
      },
      {
        key: 'lowercase',
        label: 'Lowercase',
        onSelect: (text: string) =>
          new Promise<string>((resolve) => {
            setTimeout(() => resolve(text.toLowerCase()), 400);
          }),
      },
      {
        key: 'external',
        label: 'External action (no change)',
        onSelect: () => undefined,
      },
    ],
  },
};

/** Matches the Workflow design: block-type dropdown, code snippet, and Edit with AI. */
export const Workflow: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichText
  label="Description"
  description="Edited 7 days ago"
  toolbarFeatures={[
    'heading',
    'bold',
    'italic',
    'strikethrough',
    'underline',
    'textAlign',
    'link',
    'codeSnippet',
    'table',
  ]}
  value={content}
  onChange={setContent}
  onEditWithAI={(selectedText) => aiService.improveText(selectedText)}
/>`,
      },
    },
  },
  args: {
    label: 'Description',
    description: 'Edited 7 days ago',
    toolbarFeatures: [
      'heading',
      'bold',
      'italic',
      'strikethrough',
      'underline',
      'textAlign',
      'link',
      'codeSnippet',
      'table',
    ],
    value: [
      '<h1>H1 - Title</h1>',
      '<h2>H2 - Subtitle</h2>',
      "<p>At Veridia Dynamics, we're committed to exploring the future. Our team is dedicated to using technology to improve lives.</p>",
      '<pre data-type="code-snippet"><code>Some singleline code</code></pre>',
      '<p>We invest in a culture of teamwork, innovation, and growth.</p>',
      '<h3>H3 - Title:</h3>',
      '<ul><li>AI-Driven Solutions</li><li><s>Sustainable Technologies</s></li><li><a href="https://synerise.com">Human-Centered Design</a></li></ul>',
    ].join(''),
    onEditWithAI: (text: string) =>
      new Promise<string>((resolve) => {
        setTimeout(() => resolve(text), 600);
      }),
  },
};
