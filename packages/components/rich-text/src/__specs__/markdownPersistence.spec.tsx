import type { Editor, JSONContent } from '@tiptap/react';
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-core/testing';
import { describe, it, expect, vi } from 'vitest';

import { documentToMarkdown, tiptapJsonToDocument } from '../blockModel';
import RichText from '../RichText';
import type { RichTextProps, ToolbarFeature } from '../RichText.types';

const TOOLBAR_FEATURES: ToolbarFeature[] = [
  'heading',
  'bold',
  'italic',
  'strikethrough',
  'underline',
  'bulletList',
  'orderedList',
  'link',
  'codeSnippet',
  'table',
];

type Edit = (editor: Editor) => void;

const paste =
  (text: string): Edit =>
  (editor) => {
    fireEvent.paste(editor.view.dom, {
      clipboardData: {
        types: ['text/plain'],
        getData: (type: string) => (type === 'text/plain' ? text : ''),
      },
    });
  };

const PASTED_MARKDOWN: Array<[string, string]> = [
  ['headings', '# H1\n\n## H2\n\n### H3'],
  ['inline marks', '# T\n\n**bold** *italic* ~~strike~~ `code`'],
  ['underline', '# T\n\n<u>under</u> text'],
  ['links', '# T\n\n[Docs](https://x.io) and https://y.io'],
  ['flat list', '- one\n- two'],
  ['ordered list', '1. one\n2. two'],
  ['ordered list with start', '3. three\n4. four'],
  ['nested list', '- Tone\n  - formal'],
  ['list item with marks', '- **bold** item\n- `code` item'],
  ['table', '| A | B |\n| --- | --- |\n| 1 | 2 |'],
  ['code block', '```\nconst a = 1;\n\nconst b = 2;\n```'],
  ['inline code paragraph', '# T\n\n`npm i`'],
  ['line breaks', '# Address\nStreet 1\nCity'],
  ['blank lines', 'one\n\n\n\ntwo'],
  ['tag-like text', '# T\n\nUse List<String> and <id>x</id>'],
  ['custom component tag', '# T\n\nInsert component <Key<T>> into the page'],
  ['special characters', '# T\n\nPrice: 5 * 3 = 15, a_b_c, 50% & more #tag'],
  ['blockquote', '# T\n\n> quoted'],
  ['horizontal rule', 'above\n\n---\n\nbelow'],
  [
    'real-world instructions',
    [
      '# Agent instructions',
      '',
      '## Tone',
      'Answer **briefly** and *politely*.',
      '',
      '## Format',
      '- Start with a summary',
      '- Put IDs in code, e.g. `campaign-123`',
      '',
      '## Priorities',
      '1. Accuracy over speed',
      '2. Link to the [docs](https://hub.synerise.com)',
      '',
      '| Term | Meaning |',
      '| --- | --- |',
      '| BP | Business profile |',
    ].join('\n'),
  ],
];

// [name, loaded value, edit]
const CASES: Array<[string, string | undefined, Edit]> = [
  ...PASTED_MARKDOWN.map(
    ([name, markdown]): [string, undefined, Edit] => [
      name,
      undefined,
      paste(markdown),
    ],
  ),
  [
    'line break in a table cell',
    '| A |\n| --- |\n| 1 |',
    (editor) =>
      editor.chain().focus('end').setHardBreak().insertContent('2').run(),
  ],
  [
    'line break at the end of a paragraph',
    'a\n\nb',
    (editor) => editor.chain().setTextSelection(2).setHardBreak().run(),
  ],
  [
    'line break in a heading',
    '# a',
    (editor) =>
      editor.chain().focus('end').setHardBreak().insertContent('b').run(),
  ],
  [
    'text after a nested list in a list item',
    '- item one',
    (editor) => {
      editor.commands.setTextSelection(5);
      paste('- x\n- y')(editor);
    },
  ],
  [
    'backslash, ampersand and angle bracket in text',
    'start',
    (editor) =>
      editor
        .chain()
        .focus('end')
        .insertContent({ type: 'text', text: ' C:\\<b>x</b> &lt; a & b\\' })
        .run(),
  ],
];

const renderEditor = async (props: Partial<RichTextProps>) => {
  let editor: Editor | undefined;
  const onChange = vi.fn();
  renderWithProvider(
    <RichText
      format="markdown"
      onChange={onChange}
      onEditorReady={(instance) => {
        editor = instance;
      }}
      {...props}
    />,
  );
  await waitFor(() => expect(editor).toBeDefined());
  return { editor: editor as Editor, onChange };
};

// Same serialization RichText runs in onUpdate for the markdown format.
const save = (editor: Editor) =>
  documentToMarkdown(tiptapJsonToDocument(editor.getJSON() as never));

// Markdown cannot format a line break, and a formatted break looks the same, so its marks are ignored.
const withoutBreakMarks = (json: JSONContent): JSONContent => ({
  ...json,
  ...(json.type === 'hardBreak' && { marks: undefined }),
  ...(json.content && { content: json.content.map(withoutBreakMarks) }),
});

const editSaveAndReload = async (
  edit: Edit,
  { value, toolbarFeatures = TOOLBAR_FEATURES }: Partial<RichTextProps> = {},
) => {
  const { editor: edited, onChange } = await renderEditor({
    toolbarFeatures,
    value,
  });
  edit(edited);
  const saved: string = onChange.mock.lastCall?.[0];
  const { editor: reloaded } = await renderEditor({
    toolbarFeatures,
    value: saved,
  });
  return { edited, reloaded, saved };
};

const expectToPersist = async (
  edit: Edit,
  props: Partial<RichTextProps> = {},
) => {
  const { edited, reloaded, saved } = await editSaveAndReload(edit, props);

  expect(
    withoutBreakMarks(reloaded.getJSON()),
    'reload shows what was edited',
  ).toEqual(withoutBreakMarks(edited.getJSON()));
  expect(save(reloaded), 'saving again changes nothing').toBe(saved);
};

describe('markdown persistence: edit → save → reload', () => {
  it.each(CASES)('%s', async (_, value, edit) => {
    await expectToPersist(edit, { value });
  });

  // Whatever a toolbar strips must be stripped the same way on paste and on reload.
  describe.each<[string, ToolbarFeature]>([
    ['without bold', 'bold'],
    ['without tables', 'table'],
  ])('%s', (_, removedFeature) => {
    const toolbarFeatures = TOOLBAR_FEATURES.filter(
      (feature) => feature !== removedFeature,
    );

    it.each(CASES)('%s', async (__, value, edit) => {
      await expectToPersist(edit, { value, toolbarFeatures });
    });
  });

  describe('accepted limits', () => {
    it('literal markdown syntax turns into formatting after a reload', async () => {
      const { edited, reloaded } = await editSaveAndReload(
        paste('# T\n\n\\*\\*not bold\\*\\*'),
      );

      expect(edited.getHTML()).toContain('**not bold**');
      expect(reloaded.getHTML()).toContain('<strong>not bold</strong>');
    });

    it('runs of spaces collapse to one after a reload', async () => {
      const { edited, reloaded } = await editSaveAndReload(
        (editor) =>
          editor
            .chain()
            .focus('end')
            .insertContent({ type: 'text', text: '   b' })
            .run(),
        { value: 'a' },
      );

      expect(edited.getText()).toBe('a   b');
      expect(reloaded.getText()).toBe('a b');
    });
  });
});
