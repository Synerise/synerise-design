import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-core';
import { describe, it, expect, vi } from 'vitest';

import RichText from '../RichText';

describe('RichText', () => {
  it('renders the editor wrapper', () => {
    renderWithProvider(<RichText />);
    expect(screen.getByTestId('rich-text-wrapper')).toBeTruthy();
  });

  it('renders label when provided', () => {
    renderWithProvider(<RichText label="Test Label" />);
    expect(screen.getByTestId('rich-text-label')).toBeTruthy();
  });

  it('renders error text when provided', () => {
    renderWithProvider(<RichText errorText="Something went wrong" />);
    expect(screen.getByTestId('rich-text-error')).toBeTruthy();
    expect(screen.getByText('Something went wrong')).toBeTruthy();
  });

  it('renders description when provided', () => {
    renderWithProvider(<RichText description="Helper text" />);
    expect(screen.getByTestId('rich-text-description')).toBeTruthy();
    expect(screen.getByText('Helper text')).toBeTruthy();
  });

  it('hides toolbar when hideToolbar is true', () => {
    const { container } = renderWithProvider(<RichText hideToolbar />);
    const toolbar = container.querySelector('[class*="ToolbarWrapper"]');
    expect(toolbar).toBeNull();
  });

  it('hides toolbar in readOnly mode', () => {
    const { container } = renderWithProvider(<RichText readOnly />);
    const toolbar = container.querySelector('[class*="ToolbarWrapper"]');
    expect(toolbar).toBeNull();
  });

  it('renders with default value', () => {
    renderWithProvider(<RichText defaultValue="<p>Hello world</p>" />);
    expect(screen.getByText('Hello world')).toBeTruthy();
  });

  describe('toolbar popovers', () => {
    it('opens the link, table, and image dropdowns from their toolbar buttons', async () => {
      const { container } = renderWithProvider(<RichText defaultValue="<p>x</p>" />);
      await waitFor(() =>
        expect(container.querySelector('.ProseMirror')).toBeTruthy(),
      );

      // The align/link/table/image popovers use the plain (non-asChild)
      // trigger, which wraps its button in a [data-popover-trigger] span.
      // DOM order matches the toolbar: align, link, table, image.
      const triggers = Array.from(
        container.querySelectorAll('[data-popover-trigger]'),
      ).filter((t) => t.querySelector('button'));
      expect(triggers).toHaveLength(4);
      const [, linkButton, tableButton, imageButton] = triggers.map(
        (t) => t.querySelector('button') as HTMLElement,
      );

      fireEvent.click(linkButton);
      await waitFor(() =>
        expect(
          document.querySelector('input[placeholder="Enter URL..."]'),
        ).toBeTruthy(),
      );
      fireEvent.click(linkButton);
      await waitFor(() =>
        expect(
          document.querySelector('input[placeholder="Enter URL..."]'),
        ).toBeNull(),
      );

      fireEvent.click(tableButton);
      await waitFor(() => expect(screen.getByText('Insert table')).toBeTruthy());
      fireEvent.click(tableButton);

      fireEvent.click(imageButton);
      await waitFor(() =>
        expect(
          document.querySelector('input[placeholder="Enter image URL..."]'),
        ).toBeTruthy(),
      );
    });

    it('opens the align dropdown with left/center/right options', async () => {
      const { container } = renderWithProvider(<RichText defaultValue="<p>x</p>" />);
      await waitFor(() =>
        expect(container.querySelector('.ProseMirror')).toBeTruthy(),
      );

      // Align is the first plain popover trigger (before link/table/image).
      const triggers = Array.from(
        container.querySelectorAll('[data-popover-trigger]'),
      ).filter((t) => t.querySelector('button'));
      const alignButton = triggers[0].querySelector('button') as HTMLElement;

      fireEvent.click(alignButton);
      await waitFor(() => expect(screen.getByText('Align left')).toBeTruthy());
      expect(screen.getByText('Align center')).toBeTruthy();
      expect(screen.getByText('Align right')).toBeTruthy();
    });

    it('normalizes protocol-less link URLs so they are absolute', async () => {
      let editorInstance: import('@tiptap/react').Editor | undefined;
      const { container } = renderWithProvider(
        <RichText
          defaultValue="<p>Google</p>"
          onEditorReady={(e) => {
            editorInstance = e;
          }}
        />,
      );
      await waitFor(() =>
        expect(container.querySelector('.ProseMirror')).toBeTruthy(),
      );
      await waitFor(() => expect(editorInstance).toBeTruthy());
      editorInstance?.commands.selectAll();

      // Order: align, link, table, image — the link trigger is second.
      const triggers = Array.from(
        container.querySelectorAll('[data-popover-trigger]'),
      ).filter((t) => t.querySelector('button'));
      const linkButton = triggers[1].querySelector('button') as HTMLElement;

      fireEvent.click(linkButton);
      const input = (await waitFor(() => {
        const el = document.querySelector('input[placeholder="Enter URL..."]');
        expect(el).toBeTruthy();
        return el;
      })) as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'www.google.com' } });
      fireEvent.click(screen.getByText('Apply'));

      await waitFor(() =>
        expect(editorInstance?.getHTML()).toContain(
          'href="https://www.google.com"',
        ),
      );
    });
  });

  describe('edit with AI', () => {
    it('opens a dropdown with consumer options and applies the selected one', async () => {
      let editorInstance: import('@tiptap/react').Editor | undefined;
      const { container } = renderWithProvider(
        <RichText
          defaultValue="<p>hello</p>"
          onEditorReady={(e) => {
            editorInstance = e;
          }}
          editWithAIOptions={[
            { key: 'upper', label: 'Uppercase', onSelect: (t) => t.toUpperCase() },
            { key: 'noop', label: 'External action', onSelect: () => undefined },
          ]}
        />,
      );
      await waitFor(() =>
        expect(container.querySelector('.ProseMirror')).toBeTruthy(),
      );

      fireEvent.click(screen.getByText('Edit with AI'));
      await waitFor(() => expect(screen.getByText('Uppercase')).toBeTruthy());
      expect(screen.getByText('External action')).toBeTruthy();

      fireEvent.click(screen.getByText('Uppercase'));
      await waitFor(() =>
        expect(editorInstance?.getHTML()).toContain('HELLO'),
      );
    });

    it('leaves content unchanged when an option resolves undefined', async () => {
      let editorInstance: import('@tiptap/react').Editor | undefined;
      const onSelect = vi.fn(() => undefined);
      const { container } = renderWithProvider(
        <RichText
          defaultValue="<p>hello</p>"
          onEditorReady={(e) => {
            editorInstance = e;
          }}
          editWithAIOptions={[
            { key: 'noop', label: 'External action', onSelect },
          ]}
        />,
      );
      await waitFor(() =>
        expect(container.querySelector('.ProseMirror')).toBeTruthy(),
      );

      fireEvent.click(screen.getByText('Edit with AI'));
      await waitFor(() =>
        expect(screen.getByText('External action')).toBeTruthy(),
      );
      fireEvent.click(screen.getByText('External action'));

      await waitFor(() => expect(onSelect).toHaveBeenCalledWith('hello'));
      expect(editorInstance?.getHTML()).toContain('hello');
    });
  });

  describe('subtle mode', () => {
    const getProseMirror = (container: HTMLElement) =>
      container.querySelector('.ProseMirror');

    it('starts in preview mode — no toolbar, editor not editable, edit icon rendered', async () => {
      const { container } = renderWithProvider(
        <RichText subtle defaultValue="<p>Preview me</p>" />,
      );
      await waitFor(() => expect(getProseMirror(container)).toBeTruthy());

      expect(container.querySelector('[class*="ToolbarWrapper"]')).toBeNull();
      expect(
        getProseMirror(container)?.getAttribute('contenteditable'),
      ).toBe('false');
      expect(screen.getByTestId('rich-text-subtle-edit-icon')).toBeTruthy();
    });

    it('switches to edit mode on click — toolbar appears, editor editable, icon hidden', async () => {
      const { container } = renderWithProvider(
        <RichText subtle defaultValue="<p>Preview me</p>" />,
      );
      await waitFor(() => expect(getProseMirror(container)).toBeTruthy());

      fireEvent.click(screen.getByTestId('rich-text-editor-wrapper'));

      await waitFor(() =>
        expect(
          getProseMirror(container)?.getAttribute('contenteditable'),
        ).toBe('true'),
      );
      expect(
        container.querySelector('[class*="ToolbarWrapper"]'),
      ).not.toBeNull();
      expect(screen.queryByTestId('rich-text-subtle-edit-icon')).toBeNull();
    });

    it('returns to preview mode on outside click', async () => {
      const { container } = renderWithProvider(
        <div>
          <div data-testid="outside">outside</div>
          <RichText subtle defaultValue="<p>Preview me</p>" />
        </div>,
      );
      await waitFor(() => expect(getProseMirror(container)).toBeTruthy());

      fireEvent.click(screen.getByTestId('rich-text-editor-wrapper'));
      await waitFor(() =>
        expect(
          getProseMirror(container)?.getAttribute('contenteditable'),
        ).toBe('true'),
      );

      fireEvent.mouseDown(screen.getByTestId('outside'));

      await waitFor(() =>
        expect(
          getProseMirror(container)?.getAttribute('contenteditable'),
        ).toBe('false'),
      );
      expect(screen.getByTestId('rich-text-subtle-edit-icon')).toBeTruthy();
    });

    it('renders links opening in a new tab and keeps preview mode on link click', async () => {
      const { container } = renderWithProvider(
        <RichText
          subtle
          defaultValue='<p><a href="https://synerise.com">Visit</a></p>'
        />,
      );
      await waitFor(() => expect(getProseMirror(container)).toBeTruthy());

      const link = container.querySelector('.ProseMirror a') as HTMLElement;
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');

      fireEvent.click(link);

      // Following a link must not switch the field into edit mode.
      expect(
        getProseMirror(container)?.getAttribute('contenteditable'),
      ).toBe('false');
    });

    it('shows the placeholder in an empty subtle preview', async () => {
      const { container } = renderWithProvider(
        <RichText subtle placeholder="Type here..." />,
      );
      await waitFor(() => expect(getProseMirror(container)).toBeTruthy());

      expect(
        getProseMirror(container)?.getAttribute('contenteditable'),
      ).toBe('false');
      const emptyNode = container.querySelector(
        '.ProseMirror p.is-editor-empty',
      );
      expect(emptyNode?.getAttribute('data-placeholder')).toBe('Type here...');
    });

    it('forces edit mode when errorText is set', async () => {
      const { container } = renderWithProvider(
        <RichText subtle errorText="Required" defaultValue="<p>Text</p>" />,
      );
      await waitFor(() =>
        expect(
          getProseMirror(container)?.getAttribute('contenteditable'),
        ).toBe('true'),
      );
      expect(screen.queryByTestId('rich-text-subtle-edit-icon')).toBeNull();
    });

    it('stays in preview and does not activate when readOnly', async () => {
      const { container } = renderWithProvider(
        <RichText subtle readOnly defaultValue="<p>Text</p>" />,
      );
      await waitFor(() => expect(getProseMirror(container)).toBeTruthy());

      fireEvent.click(screen.getByTestId('rich-text-editor-wrapper'));

      expect(
        getProseMirror(container)?.getAttribute('contenteditable'),
      ).toBe('false');
      expect(container.querySelector('[class*="ToolbarWrapper"]')).toBeNull();
    });
  });
});
