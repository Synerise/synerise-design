import type { Editor } from '@tiptap/react';
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-core/testing';
import { describe, it, expect, vi } from 'vitest';

import RichText from '../RichText';
import type { RichTextProps } from '../RichText.types';

const PASTED_MARKDOWN = [
  '# Title',
  '',
  '- one',
  '- two',
  '',
  '1. first',
  '',
  '| A | B |',
  '| --- | --- |',
  '| 1 | 2 |',
].join('\n');

const renderEditor = async (props: Partial<RichTextProps> = {}) => {
  let editor: Editor | undefined;
  const onChange = vi.fn();
  renderWithProvider(
    <RichText
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

const paste = (editor: Editor, data: Record<string, string>) => {
  fireEvent.paste(editor.view.dom, {
    clipboardData: {
      types: Object.keys(data),
      getData: (type: string) => data[type] ?? '',
    },
  });
};

const nodeTypes = (editor: Editor) =>
  (editor.getJSON().content ?? []).map((node) => node.type);

describe('pasting markdown', () => {
  it('turns pasted markdown blocks into formatted content in markdown format', async () => {
    const { editor, onChange } = await renderEditor({ format: 'markdown' });

    paste(editor, { 'text/plain': PASTED_MARKDOWN });

    expect(nodeTypes(editor)).toEqual([
      'heading',
      'bulletList',
      'orderedList',
      'table',
    ]);
    expect(onChange).toHaveBeenLastCalledWith(PASTED_MARKDOWN);
  });

  it('parses the plain text even when the clipboard also carries foreign HTML', async () => {
    const { editor } = await renderEditor({ format: 'markdown' });

    // Code editors such as VS Code put syntax-highlighted HTML next to the plain text.
    paste(editor, {
      'text/plain': '## Subtitle',
      'text/html': '<div><span>## Subtitle</span></div>',
    });

    expect(nodeTypes(editor)).toEqual(['heading']);
  });

  it('keeps inline markdown inline when pasted into a paragraph', async () => {
    const { editor, onChange } = await renderEditor({
      format: 'markdown',
      defaultValue: 'Start',
    });
    editor.commands.focus('end');

    paste(editor, { 'text/plain': '**bold**' });

    expect(nodeTypes(editor)).toEqual(['paragraph']);
    expect(onChange).toHaveBeenLastCalledWith('Start**bold**');
  });

  it('keeps a pasted heading as its own block after the text at the cursor', async () => {
    const { editor } = await renderEditor({
      format: 'markdown',
      defaultValue: 'Start',
    });
    editor.commands.focus('end');

    paste(editor, { 'text/plain': '# Title\n\n- one' });

    expect(nodeTypes(editor)).toEqual(['paragraph', 'heading', 'bulletList']);
  });

  it('leaves copies from another rich text editor to the default paste', async () => {
    const { editor } = await renderEditor({ format: 'markdown' });

    paste(editor, {
      'text/plain': '# Not a heading',
      'text/html': '<p data-pm-slice="1 1 []"># Not a heading</p>',
    });

    expect(nodeTypes(editor)).toEqual(['paragraph']);
  });

  it('does not parse markdown in the html format', async () => {
    const { editor } = await renderEditor();

    paste(editor, { 'text/plain': '# Not a heading' });

    expect(nodeTypes(editor)).toEqual(['paragraph']);
  });

  it('keeps the text of blocks the toolbar does not support', async () => {
    const { editor } = await renderEditor({
      format: 'markdown',
      toolbarFeatures: ['bold'],
    });

    paste(editor, {
      'text/plain': '```\ncode\n```\n\n| A |\n| --- |\n| 1 |\n\nsee https://example.com',
    });

    expect(editor.getText()).toContain('code');
    expect(editor.getText()).toContain('see https://example.com');
    expect(nodeTypes(editor)).not.toContain('table');
  });

  it('keeps the document valid when a pasted list has an empty item', async () => {
    const { editor } = await renderEditor({ format: 'markdown' });

    paste(editor, { 'text/plain': '- a\n-\n- b' });

    expect(nodeTypes(editor)).toEqual(['bulletList']);
    expect(() => editor.state.doc.check()).not.toThrow();
  });

  it('trims the spaces around a pasted word, as markdown does', async () => {
    const { editor } = await renderEditor({
      format: 'markdown',
      defaultValue: 'hello',
    });
    editor.commands.focus('end');

    paste(editor, { 'text/plain': ' world ' });

    expect(editor.getText()).toBe('helloworld');
  });

  it('keeps the structure of rich HTML copied from documents', async () => {
    const { editor } = await renderEditor({ format: 'markdown' });

    paste(editor, {
      'text/plain': 'Doc title\n\nItem',
      'text/html': '<h2>Doc title</h2><ul><li>Item</li></ul>',
    });

    expect(nodeTypes(editor)).toEqual(['heading', 'bulletList']);
  });

  it('pastes markdown as literal text inside a code block', async () => {
    const { editor } = await renderEditor({
      format: 'markdown',
      toolbarFeatures: ['codeBlock'],
      defaultValue: '```\nabc\n```',
    });
    editor.commands.focus('end');

    paste(editor, { 'text/plain': '# x' });

    expect(nodeTypes(editor)).toEqual(['codeBlock']);
    expect(editor.getText()).toContain('# x');
  });

  it('keeps tag-like text literal instead of dropping it as HTML', async () => {
    const { editor } = await renderEditor({ format: 'markdown' });

    paste(editor, {
      'text/plain':
        '# Setup\n\nUse List<String> here\n\n<dependency>\n  <id>x</id>\n</dependency>',
    });

    expect(nodeTypes(editor)[0]).toBe('heading');
    expect(editor.getText()).toContain('Use List<String> here');
    expect(editor.getText()).toContain('<id>x</id>');
  });

  it('does not create links with unsafe URLs', async () => {
    const { editor } = await renderEditor({ format: 'markdown' });

    paste(editor, {
      'text/plain':
        '# Links\n\n[a](javascript:alert(1)) [b](JaVa\tscript:alert(1)) [c](https://x.io)',
    });

    const html = editor.getHTML();
    expect(html).not.toMatch(/href="[^"]*script:/i);
    expect(html).toContain('href="https://x.io"');
  });

  it('keeps the document valid when a list item starts with a nested list', async () => {
    const { editor } = await renderEditor({ format: 'markdown' });

    paste(editor, { 'text/plain': '- - a\n- b\n\n> q' });

    expect(() => editor.state.doc.check()).not.toThrow();
    expect(nodeTypes(editor)).toContain('blockquote');
    expect(editor.getText()).not.toContain('- ');
  });

  it('keeps single line breaks as line breaks', async () => {
    const { editor } = await renderEditor({ format: 'markdown' });

    paste(editor, { 'text/plain': '# Address\nStreet 1\nCity' });

    expect(nodeTypes(editor)).toEqual(['heading', 'paragraph']);
    expect(editor.getHTML()).toContain('Street 1<br>City');
  });

  it('pastes two plain lines as one paragraph with a line break', async () => {
    const { editor } = await renderEditor({ format: 'markdown' });

    paste(editor, { 'text/plain': 'line one\nline two' });

    expect(nodeTypes(editor)).toEqual(['paragraph']);
    expect(editor.getHTML()).toContain('line one<br>line two');
  });

  it('uses the default paste for whitespace-only text next to HTML', async () => {
    const { editor } = await renderEditor({ format: 'markdown' });

    paste(editor, { 'text/plain': '  ', 'text/html': '<p>from html</p>' });

    expect(editor.getText()).toBe('from html');
  });

  it.each([
    ['Google Docs bold wrapper', '<b id="docs-internal-guid-1"><p># T</p></b>'],
    ['a link', '<p><a href="https://x.io"># T</a></p>'],
  ])('keeps the default paste for structured HTML: %s', async (_, html) => {
    const { editor } = await renderEditor({ format: 'markdown' });

    paste(editor, { 'text/plain': '# T\n\n- item', 'text/html': html });

    expect(nodeTypes(editor)).not.toContain('heading');
  });

  it.each([
    ['line breaks', '<div># T<br><br>- item</div>'],
    ['spans', '<div><span># T</span></div><div><span>- item</span></div>'],
    ['an image', '<div><img src="https://x.io/a.png"># T</div>'],
  ])('parses markdown when the HTML only wraps the text: %s', async (_, html) => {
    const { editor } = await renderEditor({ format: 'markdown' });

    paste(editor, { 'text/plain': '# T\n\n- item', 'text/html': html });

    expect(nodeTypes(editor)).toEqual(['heading', 'bulletList']);
  });

  it('keeps a nested list through paste, save and reload', async () => {
    const { editor, onChange } = await renderEditor({ format: 'markdown' });
    paste(editor, { 'text/plain': '# Rules\n\n- Tone\n  - formal' });
    const saved = onChange.mock.lastCall?.[0];

    const { editor: reloaded } = await renderEditor({
      format: 'markdown',
      value: saved,
    });

    expect(reloaded.getJSON()).toEqual(editor.getJSON());
  });

  it('pastes literally when the selection ends inside code', async () => {
    const { editor } = await renderEditor({
      format: 'markdown',
      toolbarFeatures: ['codeBlock'],
      defaultValue: 'para\n\n```\nabc\n```',
    });
    editor.commands.setTextSelection({ from: 2, to: 8 });

    paste(editor, { 'text/plain': '# x\n\n- y' });

    expect(nodeTypes(editor)).not.toContain('heading');
    expect(nodeTypes(editor)).not.toContain('bulletList');
  });

  it.each([
    ['https://x.io', 'https://x.io'],
    ['www.x.io', 'http://www.x.io'],
    ['a@b.io', 'mailto:a@b.io'],
  ])('links the selected text when %s is pasted over it', async (url, href) => {
    const { editor, onChange } = await renderEditor({
      format: 'markdown',
      defaultValue: 'see docs here',
    });
    editor.commands.setTextSelection({ from: 5, to: 9 });

    paste(editor, { 'text/plain': url });

    expect(onChange).toHaveBeenLastCalledWith(`see [docs](${href}) here`);
  });
});
