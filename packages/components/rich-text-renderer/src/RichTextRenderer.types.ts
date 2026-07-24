import type { CSSProperties } from 'react';

import type { Block, RichTextDocument } from '@synerise/ds-rich-text';

export type BlockOverrideProps<T extends Block = Block> = {
  block: T;
};

export type RichTextRendererProps = {
  document: RichTextDocument;
  className?: string;
  style?: CSSProperties;
  blockOverrides?: Partial<
    Record<Block['type'], React.ComponentType<BlockOverrideProps>>
  >;
};
