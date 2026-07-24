import React, { type ReactNode } from 'react';

import type { InlineNode } from '@synerise/ds-rich-text';

import { renderMark } from './renderMark';

export const renderInline = (node: InlineNode, index: number): ReactNode => {
  if (node.type === 'hardBreak') {
    return <br key={index} />;
  }

  let content: ReactNode = node.text;

  if (node.marks) {
    for (let i = 0; i < node.marks.length; i++) {
      content = renderMark(node.marks[i], content, i);
    }
  }

  return <React.Fragment key={index}>{content}</React.Fragment>;
};
