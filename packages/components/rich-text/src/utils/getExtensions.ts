import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import type { Extensions } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import type { ToolbarFeature } from '../RichText.types';
import { CodeSnippet } from '../extensions/CodeSnippet';

type GetExtensionsOptions = {
  features: ToolbarFeature[];
  headingLevels: (1 | 2 | 3 | 4 | 5 | 6)[];
  placeholder?: string;
  copyText?: string;
  copiedText?: string;
  /** Show the placeholder in non-editable states too (subtle preview). */
  alwaysShowPlaceholder?: boolean;
};

export const getExtensions = ({
  features,
  headingLevels,
  placeholder,
  copyText,
  copiedText,
  alwaysShowPlaceholder = false,
}: GetExtensionsOptions): Extensions => {
  const extensions: Extensions = [
    StarterKit.configure({
      heading: features.includes('heading') ? { levels: headingLevels } : false,
      bulletList: features.includes('bulletList') ? {} : false,
      orderedList: features.includes('orderedList') ? {} : false,
      strike: features.includes('strikethrough') ? {} : false,
      bold: features.includes('bold') ? {} : false,
      italic: features.includes('italic') ? {} : false,
      codeBlock: features.includes('codeBlock') ? {} : false,
    }),
  ];

  if (features.includes('underline')) {
    extensions.push(Underline);
  }

  if (features.includes('link')) {
    extensions.push(
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
    );
  }

  if (features.includes('textAlign')) {
    extensions.push(
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    );
  }

  if (features.includes('codeSnippet')) {
    extensions.push(
      CodeSnippet.configure({
        copyText: copyText ?? 'Copy',
        copiedText: copiedText ?? 'Copied',
      }),
    );
  }

  if (features.includes('image')) {
    extensions.push(
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    );
  }

  if (features.includes('table')) {
    extensions.push(
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    );
  }

  if (placeholder) {
    extensions.push(
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: !alwaysShowPlaceholder,
        // Default `showOnlyCurrent: true` renders the placeholder only in the node holding
        // the cursor, so a freshly-opened, never-focused editor shows nothing. When the
        // placeholder must be visible without focus (subtle preview), show it on any empty
        // node instead.
        showOnlyCurrent: !alwaysShowPlaceholder,
      }),
    );
  }

  return extensions;
};
