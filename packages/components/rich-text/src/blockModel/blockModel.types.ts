// ── Primitives ──

export type TextAlign = 'left' | 'center' | 'right';
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

// ── Marks (inline formatting) ──

export type BoldMark = { type: 'bold' };
export type ItalicMark = { type: 'italic' };
export type UnderlineMark = { type: 'underline' };
export type StrikeMark = { type: 'strike' };
export type CodeMark = { type: 'code' };
export type LinkMark = {
  type: 'link';
  href: string;
  target?: string;
  rel?: string;
};

export type Mark =
  | BoldMark
  | ItalicMark
  | UnderlineMark
  | StrikeMark
  | CodeMark
  | LinkMark;

// ── Inline nodes (children of blocks) ──

export type TextNode = {
  type: 'text';
  text: string;
  marks?: Mark[];
};

export type HardBreakNode = {
  type: 'hardBreak';
};

export type InlineNode = TextNode | HardBreakNode;

// ── Block nodes ──

export type ParagraphBlock = {
  type: 'paragraph';
  attrs?: { textAlign?: TextAlign };
  children: InlineNode[];
};

export type HeadingBlock = {
  type: 'heading';
  attrs: { level: HeadingLevel; textAlign?: TextAlign };
  children: InlineNode[];
};

export type CodeBlockBlock = {
  type: 'codeBlock';
  attrs?: { language?: string };
  children: InlineNode[];
};

export type CodeSnippetBlock = {
  type: 'codeSnippet';
  children: InlineNode[];
};

export type ImageBlock = {
  type: 'image';
  attrs: { src: string; alt?: string; title?: string };
};

export type ListItemBlock = {
  type: 'listItem';
  children: Block[];
};

export type BulletListBlock = {
  type: 'bulletList';
  children: ListItemBlock[];
};

export type OrderedListBlock = {
  type: 'orderedList';
  attrs?: { start?: number };
  children: ListItemBlock[];
};

export type BlockquoteBlock = {
  type: 'blockquote';
  children: Block[];
};

export type HorizontalRuleBlock = {
  type: 'horizontalRule';
};

export type TableCellBlock = {
  type: 'tableCell';
  attrs?: { colspan?: number; rowspan?: number };
  children: Block[];
};

export type TableHeaderBlock = {
  type: 'tableHeader';
  attrs?: { colspan?: number; rowspan?: number };
  children: Block[];
};

export type TableRowBlock = {
  type: 'tableRow';
  children: (TableCellBlock | TableHeaderBlock)[];
};

export type TableBlock = {
  type: 'table';
  children: TableRowBlock[];
};

export type Block =
  | ParagraphBlock
  | HeadingBlock
  | CodeBlockBlock
  | CodeSnippetBlock
  | ImageBlock
  | BulletListBlock
  | OrderedListBlock
  | BlockquoteBlock
  | HorizontalRuleBlock
  | TableBlock;

// ── Document (root) ──

export type RichTextDocument = {
  type: 'doc';
  version: 1;
  children: Block[];
};

// ── ProseMirror JSON shape (local, no TipTap dependency) ──

export type PMNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: PMNode[];
  marks?: PMMark[];
  text?: string;
};

export type PMMark = {
  type: string;
  attrs?: Record<string, unknown>;
};
