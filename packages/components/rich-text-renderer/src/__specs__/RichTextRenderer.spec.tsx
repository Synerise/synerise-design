import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-core';
import { describe, it, expect } from 'vitest';

import type { RichTextDocument } from '@synerise/ds-rich-text';

import RichTextRenderer from '../RichTextRenderer';

const sampleDoc: RichTextDocument = {
  type: 'doc',
  version: 1,
  children: [
    {
      type: 'heading',
      attrs: { level: 2 },
      children: [{ type: 'text', text: 'Title' }],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'text', text: 'Hello ' },
        { type: 'text', text: 'world', marks: [{ type: 'bold' }] },
      ],
    },
    {
      type: 'bulletList',
      children: [
        {
          type: 'listItem',
          children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Item A' }] }],
        },
      ],
    },
    {
      type: 'image',
      attrs: { src: 'https://example.com/img.png', alt: 'test image' },
    },
  ],
};

describe('RichTextRenderer', () => {
  it('renders the wrapper', () => {
    renderWithProvider(<RichTextRenderer document={sampleDoc} />);
    expect(screen.getByTestId('rich-text-renderer')).toBeTruthy();
  });

  it('renders heading', () => {
    renderWithProvider(<RichTextRenderer document={sampleDoc} />);
    expect(screen.getByText('Title').tagName).toBe('H2');
  });

  it('renders bold text', () => {
    renderWithProvider(<RichTextRenderer document={sampleDoc} />);
    const bold = screen.getByText('world');
    expect(bold.closest('strong')).toBeTruthy();
  });

  it('renders list items', () => {
    renderWithProvider(<RichTextRenderer document={sampleDoc} />);
    expect(screen.getByText('Item A')).toBeTruthy();
  });

  it('renders image', () => {
    renderWithProvider(<RichTextRenderer document={sampleDoc} />);
    const img = screen.getByAltText('test image') as HTMLImageElement;
    expect(img.src).toBe('https://example.com/img.png');
  });

  it('renders safe link hrefs', () => {
    const doc: RichTextDocument = {
      type: 'doc',
      version: 1,
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'link',
              marks: [{ type: 'link', href: 'https://example.com' }],
            },
          ],
        },
      ],
    };
    renderWithProvider(<RichTextRenderer document={doc} />);
    const link = screen.getByText('link').closest('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('https://example.com');
  });

  it('drops dangerous link hrefs (no javascript: execution on click)', () => {
    const doc: RichTextDocument = {
      type: 'doc',
      version: 1,
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'evil',
              // eslint-disable-next-line no-script-url
              marks: [{ type: 'link', href: 'javascript:alert(1)' }],
            },
          ],
        },
      ],
    };
    renderWithProvider(<RichTextRenderer document={doc} />);
    const link = screen.getByText('evil').closest('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBeNull();
  });

  it('renders a table with headers, cells, and colspan', () => {
    const doc: RichTextDocument = {
      type: 'doc',
      version: 1,
      children: [
        {
          type: 'table',
          children: [
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableHeader',
                  children: [{ type: 'paragraph', children: [{ type: 'text', text: 'H1' }] }],
                },
                {
                  type: 'tableHeader',
                  children: [{ type: 'paragraph', children: [{ type: 'text', text: 'H2' }] }],
                },
              ],
            },
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  attrs: { colspan: 2 },
                  children: [{ type: 'paragraph', children: [{ type: 'text', text: 'wide' }] }],
                },
              ],
            },
          ],
        },
      ],
    };
    const { container } = renderWithProvider(<RichTextRenderer document={doc} />);
    expect(container.querySelector('table')).toBeTruthy();
    expect(screen.getByText('H1').closest('th')).toBeTruthy();
    const wideCell = screen.getByText('wide').closest('td') as HTMLTableCellElement;
    expect(wideCell).toBeTruthy();
    expect(wideCell.getAttribute('colspan')).toBe('2');
  });

  it('renders a code snippet block', () => {
    const doc: RichTextDocument = {
      type: 'doc',
      version: 1,
      children: [
        { type: 'codeSnippet', children: [{ type: 'text', text: 'npm i foo' }] },
      ],
    };
    const { container } = renderWithProvider(<RichTextRenderer document={doc} />);
    const pre = container.querySelector('pre[data-type="code-snippet"]');
    expect(pre).toBeTruthy();
    expect(pre?.textContent).toBe('npm i foo');
  });

  it('supports blockOverrides', () => {
    const CustomImage = ({ block }: { block: unknown }) => (
      <div data-testid="custom-image">{(block as { attrs: { src: string } }).attrs.src}</div>
    );

    renderWithProvider(
      <RichTextRenderer document={sampleDoc} blockOverrides={{ image: CustomImage }} />,
    );

    expect(screen.getByTestId('custom-image')).toBeTruthy();
    expect(screen.getByText('https://example.com/img.png')).toBeTruthy();
  });
});
