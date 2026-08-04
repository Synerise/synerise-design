import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import Button from '@synerise/ds-button';
import { useTheme } from '@synerise/ds-core';
import Icon, {
  AddM,
  AiStarM,
  AlignCenterM,
  AlignLeftM,
  AlignRightM,
  BoldM,
  CodeM,
  DeleteM,
  Grid2M,
  H1M,
  H2M,
  H3M,
  ImageM,
  ItalicM,
  LinkM,
  ListM,
  ListNumbersM,
  OptionHorizontalM,
  StrikeM,
  TableL,
  TextM,
  TrashM,
  UnderlineM,
} from '@synerise/ds-icon';
import Popover, { PopoverContent, PopoverTrigger } from '@synerise/ds-popover';
import DSToolbar, { ToolbarButton, ToolbarGroup } from '@synerise/ds-toolbar';

import * as S from '../RichText.styles';
import type { ToolbarProps } from '../RichText.types';
import { computeVisibleCount } from '../utils/computeVisibleCount';
import { ImagePopover } from './ImagePopover';
import { LinkPopover } from './LinkPopover';

const HEADING_ICONS: Record<number, React.ReactElement> = {
  1: <H1M />,
  2: <H2M />,
  3: <H3M />,
};

/** Reserved width for the "more" (⋯) button when items overflow. */
const MORE_BUTTON_WIDTH_PX = 40;

type AlignValue = 'left' | 'center' | 'right';

const ALIGN_CYCLE: AlignValue[] = ['left', 'center', 'right'];

const ALIGN_ICONS: Record<AlignValue, React.ReactElement> = {
  left: <AlignLeftM />,
  center: <AlignCenterM />,
  right: <AlignRightM />,
};

const ALIGN_LABELS: Record<
  AlignValue,
  (texts: ToolbarProps['texts']) => string
> = {
  left: (texts) => texts.alignLeft,
  center: (texts) => texts.alignCenter,
  right: (texts) => texts.alignRight,
};

type TableAction = {
  key: string;
  icon: React.ReactElement;
  label: (texts: ToolbarProps['texts']) => string;
  /** True for the insert action, which is available outside a table. */
  insert?: boolean;
  run: (editor: NonNullable<ToolbarProps['editor']>) => void;
};

const TABLE_ACTIONS: TableAction[] = [
  {
    key: 'insertTable',
    icon: <TableL />,
    label: (t) => t.insertTable,
    insert: true,
    run: (editor) =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
  },
  {
    key: 'addRowBefore',
    icon: <AddM />,
    label: (t) => t.addRowBefore,
    run: (editor) => editor.chain().focus().addRowBefore().run(),
  },
  {
    key: 'addRowAfter',
    icon: <AddM />,
    label: (t) => t.addRowAfter,
    run: (editor) => editor.chain().focus().addRowAfter().run(),
  },
  {
    key: 'addColumnBefore',
    icon: <AddM />,
    label: (t) => t.addColumnBefore,
    run: (editor) => editor.chain().focus().addColumnBefore().run(),
  },
  {
    key: 'addColumnAfter',
    icon: <AddM />,
    label: (t) => t.addColumnAfter,
    run: (editor) => editor.chain().focus().addColumnAfter().run(),
  },
  {
    key: 'deleteRow',
    icon: <DeleteM />,
    label: (t) => t.deleteRow,
    run: (editor) => editor.chain().focus().deleteRow().run(),
  },
  {
    key: 'deleteColumn',
    icon: <DeleteM />,
    label: (t) => t.deleteColumn,
    run: (editor) => editor.chain().focus().deleteColumn().run(),
  },
  {
    key: 'deleteTable',
    icon: <TrashM />,
    label: (t) => t.deleteTable,
    run: (editor) => editor.chain().focus().deleteTable().run(),
  },
];

/** Full width of an element including horizontal margins (separators). */
const outerWidth = (el: Element): number => {
  const styles = window.getComputedStyle(el);
  return (
    el.getBoundingClientRect().width +
    (parseFloat(styles.marginLeft) || 0) +
    (parseFloat(styles.marginRight) || 0)
  );
};

type ToolbarEntry = {
  key: string;
  isSeparator?: boolean;
  inline: React.ReactNode;
  /** Row rendered inside the "more" dropdown when the entry is collapsed. */
  menuRow?: React.ReactNode;
};

type MorePanel = 'menu' | 'heading' | 'link' | 'image' | 'table' | 'align';

export const Toolbar = ({
  editor,
  features,
  headingLevels,
  texts,
  disabled,
  onImageUpload,
  onEditWithAI,
  editWithAIOptions,
}: ToolbarProps) => {
  const theme = useTheme();
  const [showLinkPopover, setShowLinkPopover] = useState(false);
  const [showImagePopover, setShowImagePopover] = useState(false);
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [showAlignMenu, setShowAlignMenu] = useState(false);
  const [showAiMenu, setShowAiMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [morePanel, setMorePanel] = useState<MorePanel>('menu');
  const [aiLoading, setAiLoading] = useState(false);

  // Overflow handling: while everything is visible the entry widths are
  // re-measured on each pass; entries that don't fit collapse into the
  // "more" dropdown, using the cached widths for the hidden ones.
  const itemsRef = useRef<HTMLDivElement>(null);
  const widthsRef = useRef<number[] | null>(null);
  const entriesCountRef = useRef(0);
  const [visibleCount, setVisibleCount] = useState(Number.POSITIVE_INFINITY);
  const visibleCountRef = useRef(visibleCount);
  visibleCountRef.current = visibleCount;

  const recompute = useCallback(() => {
    const el = itemsRef.current;
    if (!el) {
      return;
    }
    // Zero width means the container is not laid out yet (hidden parent,
    // jsdom, SSR hydration) — show everything until a real measurement exists.
    if (el.clientWidth <= 0) {
      if (Number.isFinite(visibleCountRef.current)) {
        setVisibleCount(Number.POSITIVE_INFINITY);
      }
      return;
    }
    if (!Number.isFinite(visibleCountRef.current)) {
      // Everything is rendered — measure fresh each time, so late layout
      // changes (webfont load, zoom) never leave a stale cache behind.
      widthsRef.current = Array.from(el.children).map(outerWidth);
    } else if (!widthsRef.current) {
      // Collapsed without a cache — wait for the expanded render to measure.
      return;
    } else if (el.scrollWidth > el.clientWidth) {
      // Visible items overflow, so the cached widths are stale — expand
      // once to re-measure everything.
      widthsRef.current = null;
      setVisibleCount(Number.POSITIVE_INFINITY);
      return;
    }
    const next = computeVisibleCount(
      widthsRef.current,
      el.clientWidth,
      MORE_BUTTON_WIDTH_PX,
    );
    setVisibleCount(
      next >= entriesCountRef.current ? Number.POSITIVE_INFINITY : next,
    );
  }, []);

  useLayoutEffect(() => {
    recompute();
  });

  const hasEditor = !!editor;
  useEffect(() => {
    const el = itemsRef.current;
    if (!el || typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    const observer = new ResizeObserver(() => recompute());
    observer.observe(el);
    return () => observer.disconnect();
  }, [recompute, hasEditor]);

  // Webfont load changes button widths after the first measurement; the
  // container itself does not resize then, so the observer never fires.
  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready?.then(() => {
      if (!cancelled) {
        recompute();
      }
    });
    return () => {
      cancelled = true;
    };
  }, [recompute]);

  const handleLinkToggle = useCallback(() => {
    setShowLinkPopover((prev) => !prev);
  }, []);

  const handleLinkClose = useCallback(() => {
    setShowLinkPopover(false);
  }, []);

  const handleImageToggle = useCallback(() => {
    setShowImagePopover((prev) => !prev);
  }, []);

  const handleImageClose = useCallback(() => {
    setShowImagePopover(false);
  }, []);

  const closeMore = useCallback(() => {
    setShowMoreMenu(false);
    setMorePanel('menu');
  }, []);

  const runAIAction = useCallback(
    async (
      action: (
        selectedText: string,
      ) => Promise<string | null | void> | string | null | void,
    ) => {
      if (!editor) {
        return;
      }
      const { from, to, empty } = editor.state.selection;
      const selectedText = empty
        ? editor.getText()
        : editor.state.doc.textBetween(from, to, '\n');
      setAiLoading(true);
      try {
        const result = await action(selectedText);
        // null/undefined means the handler handled the action externally — keep content as is.
        if (result === null || result === undefined) {
          return;
        }
        if (empty) {
          editor.chain().focus().selectAll().insertContent(result).run();
        } else {
          editor.chain().focus().insertContentAt({ from, to }, result).run();
        }
      } catch (error) {
        // The consumer's AI handler rejected; leave the content untouched.
        // eslint-disable-next-line no-console
        console.error('RichText: Edit with AI action failed', error);
      } finally {
        setAiLoading(false);
      }
    },
    [editor],
  );

  const handleEditWithAI = useCallback(() => {
    if (onEditWithAI) {
      void runAIAction(onEditWithAI);
    }
  }, [onEditWithAI, runAIAction]);

  const activeHeadingLevel = editor
    ? headingLevels.find((level) => editor.isActive('heading', { level }))
    : undefined;
  const blockLabel = activeHeadingLevel
    ? `${texts.heading} ${activeHeadingLevel}`
    : texts.paragraph;

  // Widths change with feature set, heading label, or translated labels —
  // expand once so everything gets re-measured.
  const measureSignature = [features.join(','), blockLabel, disabled].join('|');
  useLayoutEffect(() => {
    widthsRef.current = null;
    setVisibleCount(Number.POSITIVE_INFINITY);
  }, [measureSignature, texts, headingLevels]);

  if (!editor) {
    return null;
  }

  const has = (feature: string) => features.includes(feature as never);

  const hasAiOptions = !!editWithAIOptions?.length;

  const closeBlockMenu = () => setShowBlockMenu(false);

  const renderHeadingMenuItems = (close: () => void) => (
    <>
      <Button
        type={!activeHeadingLevel ? 'ghost-primary' : 'ghost'}
        mode="icon-label"
        icon={<Icon component={<TextM />} />}
        onClick={() => {
          editor.chain().focus().setParagraph().run();
          close();
        }}
      >
        {texts.paragraph}
      </Button>
      {headingLevels.map((level) => (
        <Button
          key={level}
          type={activeHeadingLevel === level ? 'ghost-primary' : 'ghost'}
          mode="icon-label"
          icon={<Icon component={HEADING_ICONS[level] || HEADING_ICONS[1]} />}
          onClick={() => {
            editor.chain().focus().toggleHeading({ level }).run();
            close();
          }}
        >
          {`${texts.heading} ${level}`}
        </Button>
      ))}
    </>
  );

  const renderTableMenuItems = (close: () => void) => {
    const inTable = editor.isActive('table');
    return TABLE_ACTIONS.map((action) => {
      const enabled = action.insert || inTable;
      return (
        <Button
          key={action.key}
          type="ghost"
          mode="icon-label"
          disabled={!enabled}
          icon={<Icon component={action.icon} />}
          onClick={() => {
            action.run(editor);
            close();
          }}
        >
          {action.label(texts)}
        </Button>
      );
    });
  };

  const renderAlignMenuItems = (close: () => void) =>
    ALIGN_CYCLE.map((align) => (
      <Button
        key={align}
        type={editor.isActive({ textAlign: align }) ? 'ghost-primary' : 'ghost'}
        mode="icon-label"
        disabled={disabled}
        icon={<Icon component={ALIGN_ICONS[align]} />}
        onClick={() => {
          editor.chain().focus().setTextAlign(align).run();
          close();
        }}
      >
        {ALIGN_LABELS[align](texts)}
      </Button>
    ));

  const actionEntry = (
    key: string,
    icon: React.ReactElement,
    label: string,
    active: boolean,
    run: () => void,
  ): ToolbarEntry => ({
    key,
    inline: (
      <ToolbarButton
        mode="single-icon"
        tooltipProps={{ title: label }}
        onClick={run}
        disabled={disabled}
        type={active ? 'ghost-primary' : 'ghost'}
      >
        <Icon component={icon} />
      </ToolbarButton>
    ),
    menuRow: (
      <Button
        key={key}
        type={active ? 'ghost-primary' : 'ghost'}
        mode="icon-label"
        disabled={disabled}
        icon={<Icon component={icon} />}
        onClick={() => {
          run();
          closeMore();
        }}
      >
        {label}
      </Button>
    ),
  });

  /** Menu row that swaps the "more" dropdown content to a nested panel. */
  const panelEntryRow = (
    key: string,
    icon: React.ReactElement,
    label: string,
    active: boolean,
    panel: MorePanel,
  ) => (
    <Button
      key={key}
      type={active ? 'ghost-primary' : 'ghost'}
      mode="icon-label"
      disabled={disabled}
      icon={<Icon component={icon} />}
      onClick={() => setMorePanel(panel)}
    >
      {label}
    </Button>
  );

  const sections: ToolbarEntry[][] = [];

  if (has('heading')) {
    sections.push([
      {
        key: 'heading',
        inline: (
          <Popover
            open={showBlockMenu}
            onOpenChange={(open) => {
              if (!open) {
                closeBlockMenu();
              }
            }}
            placement="bottom-start"
          >
            <PopoverTrigger asChild>
              <Button
                type={showBlockMenu ? 'ghost-primary' : 'ghost'}
                disabled={disabled}
                onClick={() => setShowBlockMenu((prev) => !prev)}
              >
                {blockLabel}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <S.BlockMenu>
                {renderHeadingMenuItems(closeBlockMenu)}
              </S.BlockMenu>
            </PopoverContent>
          </Popover>
        ),
        menuRow: panelEntryRow(
          'heading',
          <TextM />,
          blockLabel,
          !!activeHeadingLevel,
          'heading',
        ),
      },
    ]);
  }

  const formatting: ToolbarEntry[] = [];
  if (has('bold')) {
    formatting.push(
      actionEntry('bold', <BoldM />, texts.bold, editor.isActive('bold'), () =>
        editor.chain().focus().toggleBold().run(),
      ),
    );
  }
  if (has('italic')) {
    formatting.push(
      actionEntry(
        'italic',
        <ItalicM />,
        texts.italic,
        editor.isActive('italic'),
        () => editor.chain().focus().toggleItalic().run(),
      ),
    );
  }
  if (has('strikethrough')) {
    formatting.push(
      actionEntry(
        'strikethrough',
        <StrikeM />,
        texts.strikethrough,
        editor.isActive('strike'),
        () => editor.chain().focus().toggleStrike().run(),
      ),
    );
  }
  if (has('underline')) {
    formatting.push(
      actionEntry(
        'underline',
        <UnderlineM />,
        texts.underline,
        editor.isActive('underline'),
        () => editor.chain().focus().toggleUnderline().run(),
      ),
    );
  }
  if (formatting.length) {
    sections.push(formatting);
  }

  const lists: ToolbarEntry[] = [];
  if (has('bulletList')) {
    lists.push(
      actionEntry(
        'bulletList',
        <ListM />,
        texts.bulletList,
        editor.isActive('bulletList'),
        () => editor.chain().focus().toggleBulletList().run(),
      ),
    );
  }
  if (has('orderedList')) {
    lists.push(
      actionEntry(
        'orderedList',
        <ListNumbersM />,
        texts.orderedList,
        editor.isActive('orderedList'),
        () => editor.chain().focus().toggleOrderedList().run(),
      ),
    );
  }
  if (has('textAlign')) {
    // Dropdown of the three alignments (like the table menu); the trigger shows
    // the current alignment's icon and highlights when it isn't the default left.
    const currentAlign =
      ALIGN_CYCLE.find((a) => editor.isActive({ textAlign: a })) ?? 'left';
    lists.push({
      key: 'textAlign',
      inline: (
        <Popover
          open={showAlignMenu}
          onOpenChange={(open) => {
            if (!open) {
              setShowAlignMenu(false);
            }
          }}
          placement="bottom-start"
        >
          {/* No asChild, stable tooltip — see the link popover comment. */}
          <PopoverTrigger>
            <ToolbarButton
              mode="single-icon"
              tooltipProps={{
                title: texts.align,
                open: showAlignMenu ? false : undefined,
              }}
              onClick={() => setShowAlignMenu((prev) => !prev)}
              disabled={disabled}
              type={
                currentAlign !== 'left' || showAlignMenu
                  ? 'ghost-primary'
                  : 'ghost'
              }
            >
              <Icon component={ALIGN_ICONS[currentAlign]} />
            </ToolbarButton>
          </PopoverTrigger>
          <PopoverContent>
            <S.BlockMenu>
              {renderAlignMenuItems(() => setShowAlignMenu(false))}
            </S.BlockMenu>
          </PopoverContent>
        </Popover>
      ),
      menuRow: panelEntryRow(
        'textAlign',
        ALIGN_ICONS[currentAlign],
        texts.align,
        currentAlign !== 'left',
        'align',
      ),
    });
  }
  if (lists.length) {
    sections.push(lists);
  }

  const extras: ToolbarEntry[] = [];
  if (has('link')) {
    extras.push({
      key: 'link',
      inline: (
        <Popover
          open={showLinkPopover}
          onOpenChange={(open) => {
            if (!open) {
              handleLinkClose();
            }
          }}
          placement="bottom-start"
        >
          {/* No asChild: ToolbarButton with tooltipProps renders a nested
              PopoverTrigger anchor as its first DOM node, and toggling the
              tooltip remounts the button — both break the asChild sibling
              reference (popover lands at the viewport corner). The plain
              trigger span is a stable, measurable reference.
              tooltipProps stays mounted (open: false instead of undefined):
              unmounting the Tooltip remounts the button, and its focus
              manager yanks focus out of the just-opened popover, which
              instantly closes it via closeOnFocusOut. */}
          <PopoverTrigger>
            <ToolbarButton
              mode="single-icon"
              tooltipProps={{
                title: texts.link,
                open: showLinkPopover ? false : undefined,
              }}
              onClick={handleLinkToggle}
              disabled={disabled}
              type={editor.isActive('link') ? 'ghost-primary' : 'ghost'}
            >
              <Icon component={<LinkM />} />
            </ToolbarButton>
          </PopoverTrigger>
          <PopoverContent>
            <LinkPopover
              editor={editor}
              texts={texts}
              onClose={handleLinkClose}
            />
          </PopoverContent>
        </Popover>
      ),
      menuRow: panelEntryRow(
        'link',
        <LinkM />,
        texts.link,
        editor.isActive('link'),
        'link',
      ),
    });
  }
  if (has('codeSnippet')) {
    extras.push(
      actionEntry(
        'codeSnippet',
        <CodeM />,
        texts.codeSnippet,
        editor.isActive('codeSnippet'),
        () => editor.chain().focus().insertCodeSnippet().run(),
      ),
    );
  }
  if (has('codeBlock')) {
    extras.push(
      actionEntry(
        'codeBlock',
        <CodeM />,
        texts.codeBlock,
        editor.isActive('codeBlock'),
        () => editor.chain().focus().toggleCodeBlock().run(),
      ),
    );
  }
  if (has('table')) {
    const inTable = editor.isActive('table');
    extras.push({
      key: 'table',
      inline: (
        <Popover
          open={showTableMenu}
          onOpenChange={(open) => {
            if (!open) {
              setShowTableMenu(false);
            }
          }}
          placement="bottom-start"
        >
          {/* No asChild, stable tooltip — see the link popover comment. */}
          <PopoverTrigger>
            <ToolbarButton
              mode="single-icon"
              tooltipProps={{
                title: texts.table,
                open: showTableMenu ? false : undefined,
              }}
              onClick={() => setShowTableMenu((prev) => !prev)}
              disabled={disabled}
              type={inTable || showTableMenu ? 'ghost-primary' : 'ghost'}
            >
              <Icon component={<Grid2M />} />
            </ToolbarButton>
          </PopoverTrigger>
          <PopoverContent>
            <S.BlockMenu>
              {renderTableMenuItems(() => setShowTableMenu(false))}
            </S.BlockMenu>
          </PopoverContent>
        </Popover>
      ),
      menuRow: panelEntryRow(
        'table',
        <Grid2M />,
        texts.table,
        inTable,
        'table',
      ),
    });
  }
  if (has('image')) {
    extras.push({
      key: 'image',
      inline: (
        <Popover
          open={showImagePopover}
          onOpenChange={(open) => {
            if (!open) {
              handleImageClose();
            }
          }}
          placement="bottom-start"
        >
          {/* No asChild, stable tooltip — see the link popover comment. */}
          <PopoverTrigger>
            <ToolbarButton
              mode="single-icon"
              tooltipProps={{
                title: texts.image,
                open: showImagePopover ? false : undefined,
              }}
              onClick={handleImageToggle}
              disabled={disabled}
            >
              <Icon component={<ImageM />} />
            </ToolbarButton>
          </PopoverTrigger>
          <PopoverContent>
            <ImagePopover
              editor={editor}
              texts={texts}
              onClose={handleImageClose}
              onImageUpload={onImageUpload}
            />
          </PopoverContent>
        </Popover>
      ),
      menuRow: panelEntryRow('image', <ImageM />, texts.image, false, 'image'),
    });
  }
  if (extras.length) {
    sections.push(extras);
  }

  // Flatten sections into one list with separators at section boundaries.
  const entries: ToolbarEntry[] = [];
  sections.forEach((section, index) => {
    if (index > 0) {
      entries.push({
        key: `separator-${index}`,
        isSeparator: true,
        inline: <S.ToolbarSeparator />,
      });
    }
    entries.push(...section);
  });
  entriesCountRef.current = entries.length;

  const shownCount = Number.isFinite(visibleCount)
    ? (visibleCount as number)
    : entries.length;
  const shownEntries = entries.slice(0, shownCount);
  // A separator makes no sense as the last visible item before the ⋯ button.
  while (
    shownEntries.length &&
    shownEntries[shownEntries.length - 1].isSeparator
  ) {
    shownEntries.pop();
  }
  const hiddenEntries = entries
    .slice(shownCount)
    .filter((entry) => !entry.isSeparator);

  return (
    <DSToolbar>
      <S.ToolbarItems ref={itemsRef} data-testid="rich-text-toolbar-items">
        {shownEntries.map((entry) => (
          <S.ToolbarEntry key={entry.key}>{entry.inline}</S.ToolbarEntry>
        ))}

        {hiddenEntries.length > 0 && (
          <Popover
            open={showMoreMenu}
            onOpenChange={(open) => {
              if (!open) {
                closeMore();
              }
            }}
            placement="bottom-end"
          >
            {/* No asChild, stable tooltip — see the link popover comment. */}
            <PopoverTrigger>
              <ToolbarButton
                mode="single-icon"
                tooltipProps={{
                  title: texts.more,
                  open: showMoreMenu ? false : undefined,
                }}
                onClick={() =>
                  showMoreMenu ? closeMore() : setShowMoreMenu(true)
                }
                disabled={disabled}
                type={showMoreMenu ? 'ghost-primary' : 'ghost'}
                data-testid="rich-text-toolbar-more"
              >
                <Icon component={<OptionHorizontalM />} />
              </ToolbarButton>
            </PopoverTrigger>
            <PopoverContent>
              {morePanel === 'link' ? (
                <LinkPopover
                  editor={editor}
                  texts={texts}
                  onClose={closeMore}
                />
              ) : morePanel === 'image' ? (
                <ImagePopover
                  editor={editor}
                  texts={texts}
                  onClose={closeMore}
                  onImageUpload={onImageUpload}
                />
              ) : (
                <S.BlockMenu>
                  {morePanel === 'heading'
                    ? renderHeadingMenuItems(closeMore)
                    : morePanel === 'table'
                      ? renderTableMenuItems(closeMore)
                      : morePanel === 'align'
                        ? renderAlignMenuItems(closeMore)
                        : hiddenEntries.map((entry) => entry.menuRow)}
                </S.BlockMenu>
              )}
            </PopoverContent>
          </Popover>
        )}
      </S.ToolbarItems>

      {(onEditWithAI || hasAiOptions) && (
        <ToolbarGroup isCompact style={{ marginLeft: 'auto' }}>
          {(() => {
            const aiButton = (
              <Button
                type="custom-color-ghost"
                color="pink"
                mode="icon-label"
                loading={aiLoading}
                disabled={disabled}
                icon={
                  <Icon
                    color={theme.palette['mars-400']}
                    component={<AiStarM />}
                  />
                }
                onClick={
                  hasAiOptions
                    ? () => setShowAiMenu((prev) => !prev)
                    : handleEditWithAI
                }
              >
                <S.AiGradientLabel>{texts.editWithAI}</S.AiGradientLabel>
              </Button>
            );

            if (!hasAiOptions) {
              return aiButton;
            }

            return (
              <Popover
                open={showAiMenu}
                onOpenChange={(open) => {
                  if (!open) {
                    setShowAiMenu(false);
                  }
                }}
                placement="bottom-end"
              >
                <PopoverTrigger asChild>{aiButton}</PopoverTrigger>
                <PopoverContent>
                  <S.BlockMenu>
                    {(editWithAIOptions ?? []).map((option) => (
                      <Button
                        key={option.key}
                        type="ghost"
                        mode={option.icon ? 'icon-label' : undefined}
                        icon={option.icon}
                        onClick={() => {
                          setShowAiMenu(false);
                          void runAIAction(option.onSelect);
                        }}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </S.BlockMenu>
                </PopoverContent>
              </Popover>
            );
          })()}
        </ToolbarGroup>
      )}
    </DSToolbar>
  );
};
