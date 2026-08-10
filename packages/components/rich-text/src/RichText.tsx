import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useTheme } from '@synerise/ds-core';
import { FormFieldLabel } from '@synerise/ds-form-field';
import Icon, { EditS } from '@synerise/ds-icon';
import { useCombinedRefs, useOnClickOutside } from '@synerise/ds-utils';
import { EditorContent, useEditor } from '@tiptap/react';

import * as S from './RichText.styles';
import {
  ALL_TOOLBAR_FEATURES,
  DEFAULT_HEADING_LEVELS,
  DEFAULT_TEXTS,
  type RichTextProps,
} from './RichText.types';
import {
  type RichTextDocument,
  documentToMarkdown,
  documentToTiptapJson,
  markdownToDocument,
  tiptapJsonToDocument,
} from './blockModel';
import { Toolbar } from './components';
import { getExtensions } from './utils';

// Clicks inside portaled popovers (toolbar menus, link/image forms) must not
// deactivate subtle mode — PopoverContent marks its floating element with this attribute.
const SUBTLE_IGNORE_SELECTORS = ['[data-popover-content]'];

const isDocument = (val: unknown): val is RichTextDocument =>
  typeof val === 'object' &&
  val !== null &&
  (val as RichTextDocument).type === 'doc';

const toEditorContent = (
  val: string | RichTextDocument | undefined,
  format: RichTextProps['format'],
): string | Record<string, unknown> => {
  if (val === undefined) {
    return '';
  }
  if (typeof val === 'string') {
    // A markdown string is parsed to the block model; an HTML string is used as-is.
    return format === 'markdown'
      ? documentToTiptapJson(markdownToDocument(val))
      : val;
  }
  return documentToTiptapJson(val);
};

const RichText = forwardRef<HTMLDivElement, RichTextProps>(
  (
    {
      format = 'html',
      value,
      defaultValue,
      onChange,
      onEditorReady,
      placeholder,
      readOnly = false,
      disabled = false,
      label,
      tooltip,
      tooltipConfig,
      description,
      errorText,
      height,
      maxHeight,
      toolbarFeatures = ALL_TOOLBAR_FEATURES,
      hideToolbar = false,
      subtle = false,
      animations = false,
      headingLevels = DEFAULT_HEADING_LEVELS,
      texts: textsProp,
      noBorder,
      style,
      className,
      autoFocus = false,
      onImageUpload,
      onEditWithAI,
      editWithAIOptions,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [subtleActive, setSubtleActive] = useState(false);
    const [subtleBlurred, setSubtleBlurred] = useState(false);
    const lastEmittedRef = useRef<string>('');
    const wrapperRef = useCombinedRefs<HTMLDivElement>(ref);
    const theme = useTheme();

    const hasError = !!errorText;
    const isSubtle = subtle && !readOnly && !disabled;
    // `errorText` forces edit mode, mirroring SubtleForm behavior.
    const isSubtlePreview = isSubtle && !subtleActive && !hasError;
    const isEditable = !readOnly && !disabled && !isSubtlePreview;

    const texts = useMemo(
      () => ({ ...DEFAULT_TEXTS, ...textsProp }),
      [textsProp],
    );

    const extensions = useMemo(
      () =>
        getExtensions({
          features: toolbarFeatures,
          headingLevels,
          placeholder,
          copyText: texts.copySnippet,
          copiedText: texts.copiedSnippet,
          // Like SubtleForm fields, an empty subtle preview shows the placeholder.
          alwaysShowPlaceholder: isSubtle,
        }),
      [toolbarFeatures, headingLevels, placeholder, texts, isSubtle],
    );

    const handleUpdate = useCallback(
      ({
        editor: ed,
      }: {
        editor: {
          getHTML: () => string;
          getJSON: () => Record<string, unknown>;
        };
      }) => {
        if (!onChange) {
          return;
        }
        if (format === 'document') {
          lastEmittedRef.current = ed.getHTML();
          onChange(tiptapJsonToDocument(ed.getJSON() as never));
        } else if (format === 'markdown') {
          const md = documentToMarkdown(
            tiptapJsonToDocument(ed.getJSON() as never),
          );
          lastEmittedRef.current = md;
          onChange(md);
        } else {
          const html = ed.getHTML();
          lastEmittedRef.current = html;
          onChange(html);
        }
      },
      [format, onChange],
    );

    const editor = useEditor({
      extensions,
      content: toEditorContent(value ?? defaultValue, format),
      editable: isEditable,
      autofocus: autoFocus,
      onUpdate: handleUpdate,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
    });

    useEffect(() => {
      if (editor && onEditorReady) {
        onEditorReady(editor);
      }
    }, [editor, onEditorReady]);

    useEffect(() => {
      if (editor) {
        editor.setEditable(isEditable);
      }
    }, [editor, isEditable]);

    // Focus after activation; must run after the setEditable effect above,
    // since focusing a non-editable editor is a no-op.
    useEffect(() => {
      if (isSubtle && subtleActive && editor && !editor.isDestroyed) {
        editor.commands.focus('end');
      }
    }, [isSubtle, subtleActive, editor]);

    const handleSubtleActivate = useCallback((event: React.MouseEvent) => {
      // A click on a link in preview follows the link (new tab via
      // target="_blank") instead of entering edit mode.
      if ((event.target as HTMLElement).closest('a')) {
        return;
      }
      setSubtleActive(true);
      setSubtleBlurred(false);
    }, []);

    const handleSubtleDeactivate = useCallback(() => {
      setSubtleActive(false);
      setSubtleBlurred(true);
    }, []);

    useOnClickOutside(
      wrapperRef,
      isSubtle && subtleActive ? handleSubtleDeactivate : null,
      undefined,
      SUBTLE_IGNORE_SELECTORS,
    );

    useEffect(() => {
      if (!editor || value === undefined) {
        return;
      }

      if (isDocument(value)) {
        const pmJson = documentToTiptapJson(value);
        const currentJson = JSON.stringify(editor.getJSON());
        const newJson = JSON.stringify(pmJson);
        if (currentJson !== newJson) {
          editor.commands.setContent(pmJson, false);
        }
      } else if (format === 'markdown') {
        // Skip the echo from our own onChange; otherwise parse markdown → document.
        if (lastEmittedRef.current !== value) {
          editor.commands.setContent(
            documentToTiptapJson(markdownToDocument(value)),
            false,
          );
        }
      } else {
        const currentHTML = editor.getHTML();
        if (currentHTML !== value && lastEmittedRef.current !== value) {
          editor.commands.setContent(value, false);
        }
      }
    }, [editor, value, format]);

    const labelElement = useMemo(
      () =>
        label && (
          <FormFieldLabel
            label={label}
            tooltip={tooltip}
            tooltipConfig={
              tooltip || tooltipConfig
                ? {
                    ...tooltipConfig,
                    title: tooltip,
                  }
                : undefined
            }
          />
        ),
      [label, tooltip, tooltipConfig],
    );

    return (
      <S.RichTextWrapper
        ref={wrapperRef}
        $disabled={disabled}
        style={style}
        className={className}
        data-testid="rich-text-wrapper"
      >
        {labelElement && (
          <S.ContentAbove data-testid="rich-text-label">
            {labelElement}
          </S.ContentAbove>
        )}

        <S.EditorWrapper
          $hasError={hasError}
          $noBorder={noBorder}
          $isFocused={isFocused}
          $subtlePreview={isSubtlePreview}
          $subtleBlurred={subtleBlurred}
          $animations={animations}
          onClick={isSubtlePreview ? handleSubtleActivate : undefined}
          data-testid="rich-text-editor-wrapper"
        >
          {!hideToolbar && !readOnly && !isSubtlePreview && (
            <S.ToolbarArea>
              <Toolbar
                editor={editor}
                features={toolbarFeatures}
                headingLevels={headingLevels}
                texts={texts}
                disabled={disabled}
                onImageUpload={onImageUpload}
                onEditWithAI={onEditWithAI}
                editWithAIOptions={editWithAIOptions}
              />
            </S.ToolbarArea>
          )}

          <S.EditorArea
            $height={height}
            $maxHeight={maxHeight}
            $readOnly={readOnly}
            $subtlePreview={isSubtlePreview}
            data-testid="rich-text-editor"
          >
            <EditorContent editor={editor} />
          </S.EditorArea>

          {isSubtlePreview && (
            <S.SubtleSuffix data-testid="rich-text-subtle-edit-icon">
              <Icon component={<EditS />} color={theme.palette['grey-600']} />
            </S.SubtleSuffix>
          )}
        </S.EditorWrapper>

        {(errorText || description) && (
          <S.ContentBelow data-testid="rich-text-below">
            {errorText && (
              <S.ErrorText data-testid="rich-text-error">
                {errorText}
              </S.ErrorText>
            )}
            {description && (
              <S.Description data-testid="rich-text-description">
                {description}
              </S.Description>
            )}
          </S.ContentBelow>
        )}
      </S.RichTextWrapper>
    );
  },
);

RichText.displayName = 'RichText';

export default RichText;
