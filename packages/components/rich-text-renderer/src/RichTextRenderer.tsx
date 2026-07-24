import React from 'react';

import * as S from './RichTextRenderer.styles';
import type { RichTextRendererProps } from './RichTextRenderer.types';
import { renderBlock } from './renderers';

const RichTextRenderer = ({
  document,
  className,
  style,
  blockOverrides,
}: RichTextRendererProps) => (
  <S.RendererWrapper
    className={className}
    style={style}
    data-testid="rich-text-renderer"
  >
    {document.children.map((block, i) => renderBlock(block, i, blockOverrides))}
  </S.RendererWrapper>
);

RichTextRenderer.displayName = 'RichTextRenderer';

export default RichTextRenderer;
