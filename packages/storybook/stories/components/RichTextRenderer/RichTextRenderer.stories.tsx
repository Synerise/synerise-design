import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import {
  type RichTextDocument,
  documentToMarkdown,
} from '@synerise/ds-rich-text';
import RichTextRenderer, {
  RichTextRendererProps,
} from '@synerise/ds-rich-text-renderer';

import {
  CLASSNAME_ARG_CONTROL,
  STYLE_ARG_CONTROL,
  fixedHeightWrapper,
} from '../../utils';

type Story = StoryObj<RichTextRendererProps>;

const sampleDocument: RichTextDocument = {
  type: 'doc',
  version: 1,
  children: [
    {
      type: 'heading',
      attrs: { level: 1 },
      children: [{ type: 'text', text: 'Rich Text Renderer' }],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'text', text: 'This component renders a ' },
        { type: 'text', text: 'RichTextDocument', marks: [{ type: 'code' }] },
        { type: 'text', text: ' to React — ' },
        {
          type: 'text',
          text: 'without any editor dependency',
          marks: [{ type: 'bold' }],
        },
        { type: 'text', text: '. It weighs ~1 KB gzip.' },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      children: [{ type: 'text', text: 'Text Formatting' }],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'text', text: 'Bold', marks: [{ type: 'bold' }] },
        { type: 'text', text: ', ' },
        { type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
        { type: 'text', text: ', ' },
        { type: 'text', text: 'underline', marks: [{ type: 'underline' }] },
        { type: 'text', text: ', ' },
        { type: 'text', text: 'strikethrough', marks: [{ type: 'strike' }] },
        { type: 'text', text: ' and ' },
        { type: 'text', text: 'inline code', marks: [{ type: 'code' }] },
        { type: 'text', text: '.' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'text', text: 'A link: ' },
        {
          type: 'text',
          text: 'Synerise',
          marks: [{ type: 'link', href: 'https://synerise.com' }],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      children: [{ type: 'text', text: 'Lists' }],
    },
    {
      type: 'bulletList',
      children: [
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Bullet item one' }],
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Bullet item two' }],
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Nested list:' }],
            },
            {
              type: 'bulletList',
              children: [
                {
                  type: 'listItem',
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Sub-item A' }],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Sub-item B' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'orderedList',
      children: [
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'First ordered item' }],
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Second ordered item' }],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      children: [{ type: 'text', text: 'Code Block' }],
    },
    {
      type: 'codeBlock',
      children: [
        {
          type: 'text',
          text: 'import RichTextRenderer from "@synerise/ds-rich-text-renderer";\n\n<RichTextRenderer document={doc} />',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      children: [{ type: 'text', text: 'Image' }],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/600x200/e2e8f0/475569?text=Sample+Image',
        alt: 'Sample placeholder image',
      },
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      children: [{ type: 'text', text: 'Blockquote' }],
    },
    {
      type: 'blockquote',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'The best way to predict the future is to invent it.',
              marks: [{ type: 'italic' }],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      children: [{ type: 'text', text: 'Text Alignment' }],
    },
    {
      type: 'paragraph',
      attrs: { textAlign: 'left' },
      children: [{ type: 'text', text: 'Left aligned paragraph.' }],
    },
    {
      type: 'paragraph',
      attrs: { textAlign: 'center' },
      children: [{ type: 'text', text: 'Center aligned paragraph.' }],
    },
    {
      type: 'paragraph',
      attrs: { textAlign: 'right' },
      children: [{ type: 'text', text: 'Right aligned paragraph.' }],
    },
  ],
};

const minimalDocument: RichTextDocument = {
  type: 'doc',
  version: 1,
  children: [
    {
      type: 'paragraph',
      children: [
        { type: 'text', text: 'A simple paragraph with no formatting.' },
      ],
    },
  ],
};

export default {
  title: 'Components/RichTextRenderer',
  component: RichTextRenderer,
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedHeightWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
  },
  args: {
    document: sampleDocument,
  },
} as Meta<RichTextRendererProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `const document: RichTextDocument = {
  type: 'doc',
  version: 1,
  children: [
    {
      type: 'heading',
      attrs: { level: 1 },
      children: [{ type: 'text', text: 'Rich Text Renderer' }],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'text', text: 'Renders a document ' },
        { type: 'text', text: 'without any editor dependency', marks: [{ type: 'bold' }] },
      ],
    },
  ],
};

<RichTextRenderer document={document} />`,
      },
    },
  },
};

export const Minimal: Story = {
  parameters: {
    docs: {
      source: {
        code: `const document: RichTextDocument = {
  type: 'doc',
  version: 1,
  children: [
    {
      type: 'paragraph',
      children: [{ type: 'text', text: 'A simple paragraph with no formatting.' }],
    },
  ],
};

<RichTextRenderer document={document} />`,
      },
    },
  },
  args: {
    document: minimalDocument,
  },
};

export const WithCustomImageRenderer: Story = {
  parameters: {
    docs: {
      source: {
        code: `<RichTextRenderer
  document={document}
  blockOverrides={{
    image: ({ block }) => {
      const { src, alt } = block.attrs;
      return <figure className="custom-image"><img src={src} alt={alt ?? ''} /></figure>;
    },
  }}
/>`,
      },
    },
  },
  render: (args) => (
    <RichTextRenderer
      {...args}
      blockOverrides={{
        image: ({ block }) => {
          const attrs = (block as { attrs: { src: string; alt?: string } })
            .attrs;
          return (
            <div
              style={{
                border: '2px dashed #6b7280',
                borderRadius: 8,
                padding: 16,
                textAlign: 'center',
                background: '#f9fafb',
              }}
            >
              <img
                src={attrs.src}
                alt={attrs.alt ?? ''}
                style={{ maxWidth: '100%', borderRadius: 4 }}
              />
              <div style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>
                Custom image renderer (blockOverrides)
              </div>
            </div>
          );
        },
      }}
    />
  ),
};

export const JSONPreview: Story = {
  parameters: {
    docs: {
      source: {
        code: `<>
  <RichTextRenderer document={document} />
  <pre>{JSON.stringify(document, null, 2)}</pre>
</>`,
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, width: '100%' }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 8 }}>Rendered</h4>
        <RichTextRenderer {...args} />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 8 }}>JSON (RichTextDocument)</h4>
        <pre
          style={{
            background: '#f1f5f9',
            padding: 12,
            borderRadius: 4,
            fontSize: 11,
            overflow: 'auto',
            maxHeight: 500,
          }}
        >
          {JSON.stringify(args.document, null, 2)}
        </pre>
      </div>
    </div>
  ),
};

export const MarkdownPreview: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { documentToMarkdown } from '@synerise/ds-rich-text';

<>
  <RichTextRenderer document={document} />
  <pre>{documentToMarkdown(document)}</pre>
</>`,
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, width: '100%' }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 8 }}>Rendered</h4>
        <RichTextRenderer {...args} />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 8 }}>Markdown (documentToMarkdown)</h4>
        <pre
          style={{
            background: '#f1f5f9',
            padding: 12,
            borderRadius: 4,
            fontSize: 11,
            overflow: 'auto',
            maxHeight: 500,
            whiteSpace: 'pre-wrap',
          }}
        >
          {args.document ? documentToMarkdown(args.document) : ''}
        </pre>
      </div>
    </div>
  ),
};
