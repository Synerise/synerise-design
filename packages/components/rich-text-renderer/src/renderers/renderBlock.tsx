import React, { type ReactNode } from 'react';

import type { Block } from '@synerise/ds-rich-text';

import type { BlockOverrideProps } from '../RichTextRenderer.types';
import { renderInline } from './renderInline';

type Overrides = Partial<
  Record<Block['type'], React.ComponentType<BlockOverrideProps>>
>;

export const renderBlock = (
  block: Block,
  index: number,
  overrides?: Overrides,
): ReactNode => {
  const Override = overrides?.[block.type];
  if (Override) {
    return <Override key={index} block={block} />;
  }

  switch (block.type) {
    case 'paragraph': {
      const style = block.attrs?.textAlign
        ? { textAlign: block.attrs.textAlign }
        : undefined;
      return (
        <p key={index} style={style}>
          {block.children.map(renderInline)}
        </p>
      );
    }

    case 'heading': {
      const Tag = `h${block.attrs.level}` as keyof JSX.IntrinsicElements;
      const style = block.attrs.textAlign
        ? { textAlign: block.attrs.textAlign }
        : undefined;
      return (
        <Tag key={index} style={style}>
          {block.children.map(renderInline)}
        </Tag>
      );
    }

    case 'codeBlock':
      return (
        <pre key={index}>
          <code>{block.children.map(renderInline)}</code>
        </pre>
      );

    case 'codeSnippet':
      return (
        <pre key={index} data-type="code-snippet">
          <code>{block.children.map(renderInline)}</code>
        </pre>
      );

    case 'image':
      return (
        <img
          key={index}
          src={block.attrs.src}
          alt={block.attrs.alt ?? ''}
          title={block.attrs.title ?? undefined}
        />
      );

    case 'bulletList':
      return (
        <ul key={index}>
          {block.children.map((li, i) => (
            <li key={i}>
              {li.children.map((child, j) => renderBlock(child, j, overrides))}
            </li>
          ))}
        </ul>
      );

    case 'orderedList':
      return (
        <ol key={index} start={block.attrs?.start}>
          {block.children.map((li, i) => (
            <li key={i}>
              {li.children.map((child, j) => renderBlock(child, j, overrides))}
            </li>
          ))}
        </ol>
      );

    case 'blockquote':
      return (
        <blockquote key={index}>
          {block.children.map((child, i) => renderBlock(child, i, overrides))}
        </blockquote>
      );

    case 'horizontalRule':
      return <hr key={index} />;

    case 'table':
      return (
        <table key={index}>
          <tbody>
            {block.children.map((row, r) => (
              <tr key={r}>
                {row.children.map((cell, c) => {
                  const CellTag = cell.type === 'tableHeader' ? 'th' : 'td';
                  return (
                    <CellTag
                      key={c}
                      colSpan={cell.attrs?.colspan}
                      rowSpan={cell.attrs?.rowspan}
                    >
                      {cell.children.map((child, j) =>
                        renderBlock(child, j, overrides),
                      )}
                    </CellTag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      );

    default:
      return null;
  }
};
