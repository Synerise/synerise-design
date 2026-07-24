import React from 'react';

import CopyIcon from '@synerise/ds-copy-icon';
import { Node, mergeAttributes } from '@tiptap/core';
import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from '@tiptap/react';

export type CodeSnippetOptions = {
  copyText: string;
  copiedText: string;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    codeSnippet: {
      /** Insert an empty single-line code snippet. */
      insertCodeSnippet: () => ReturnType;
    };
  }
}

const CodeSnippetView = ({ node, extension }: NodeViewProps) => {
  const { copyText, copiedText } = extension.options as CodeSnippetOptions;

  return (
    <NodeViewWrapper
      as="div"
      className="ds-rt-code-snippet"
      data-testid="code-snippet"
    >
      <NodeViewContent as="code" className="ds-rt-code-snippet__content" />
      <span className="ds-rt-code-snippet__actions" contentEditable={false}>
        <CopyIcon
          copyValue={node.textContent ?? ''}
          texts={{ copyTooltip: copyText, copiedTooltip: copiedText }}
        />
      </span>
    </NodeViewWrapper>
  );
};

/**
 * A single-line code snippet block: monospace text in a grey box with a copy button.
 * Serializes to `<pre data-type="code-snippet"><code>…</code></pre>` so it round-trips
 * through the HTML and portable-document serializers without colliding with `codeBlock`.
 */
export const CodeSnippet = Node.create<CodeSnippetOptions>({
  name: 'codeSnippet',
  group: 'block',
  content: 'text*',
  marks: '',
  code: true,
  defining: true,
  isolating: true,

  addOptions() {
    return {
      copyText: 'Copy',
      copiedText: 'Copied',
    };
  },

  parseHTML() {
    return [
      { tag: 'pre[data-type="code-snippet"]', preserveWhitespace: 'full' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'pre',
      mergeAttributes(HTMLAttributes, { 'data-type': 'code-snippet' }),
      ['code', 0],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeSnippetView);
  },

  addCommands() {
    return {
      insertCodeSnippet:
        () =>
        ({ commands }) =>
          commands.insertContent({ type: this.name }),
    };
  },

  addKeyboardShortcuts() {
    return {
      // Single-line: Enter exits the snippet into a new block below instead of adding a newline.
      Enter: ({ editor }) => {
        if (!editor.isActive(this.name)) {
          return false;
        }
        return editor.commands.exitCode();
      },
    };
  },
});
