import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import Editor, { Monaco, EditorProps, loader } from '@monaco-editor/react';

import Loader from '@synerise/ds-loader';
import { InlineSelect } from '@synerise/ds-inline-edit';
import { NOOP, useResizeObserver } from '@synerise/ds-utils';

import { CodeAreaEditorRawProps, CodeAreaSyntaxOption } from '../CodeArea.types';
import { getDefaultTexts } from '../utils/getDefaultTexts';
import { DS_MONACO_THEME, DS_MONACO_THEME_NAME, MONACO_DEFAULT_OPTIONS, TRIGGER_SOURCE } from '../constants';
import { AriaContainer } from './AriaContainer';
import * as S from '../CodeArea.styles';
import { BottomBar } from './BottomBar';

export const CodeAreaEditorRaw = ({
  onMount,
  beforeMount,
  options,
  errorText,
  texts,
  allowFullscreen,
  toggleFullscreen,
  renderFooterContent,
  isFullscreen,
  count,
  counterLimit,
  onChange,
  isValid,
  onDidChangeMarkers,
  isSyntaxSelectVisible,
  syntaxOptions,
  currentSyntax,
  readOnly,
  onSyntaxChange,
  loaderConfig,
  ...props
}: CodeAreaEditorRawProps) => {
  const monacoRef = useRef<Monaco | null>(null);
  const loaderConfigSet = useRef(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { height, width } = useResizeObserver(wrapperRef);
  const monacoAriaContainerElement = useMemo(() => {
    return document.createElement('div');
  }, []);

  if (loaderConfig && !loaderConfigSet.current) {
    loader.config(loaderConfig);
    loaderConfigSet.current = true;
  }

  const editorOptions: EditorProps['options'] = useMemo(() => {
    return {
      ...MONACO_DEFAULT_OPTIONS,
      ...options,
      readOnly,
      domReadOnly: readOnly,
      ariaContainerElement: monacoAriaContainerElement,
    };
  }, [options, readOnly, monacoAriaContainerElement]);

  const allTexts = useMemo(() => {
    return getDefaultTexts(texts);
  }, [texts]);

  const handleBeforeMount = useCallback(
    (monacoInstance: Monaco) => {
      monacoRef.current = monacoInstance;

      monacoInstance.editor.defineTheme(DS_MONACO_THEME_NAME, DS_MONACO_THEME);
      monacoInstance.editor.setTheme(DS_MONACO_THEME_NAME);
      monacoInstance.editor.onDidChangeMarkers(() => {
        const markers = monacoInstance.editor.getModelMarkers({});
        onDidChangeMarkers && onDidChangeMarkers(markers);
      });
      monacoInstance.editor.colorize('test', 'html', {});

      beforeMount && beforeMount(monacoInstance);
    },
    [onDidChangeMarkers, beforeMount]
  );

  const handleEditorDidMount = useCallback(
    (monacoEditor: editor.IStandaloneCodeEditor, monacoInstance: Monaco) => {
      editorRef.current = monacoEditor;

      onMount && onMount(monacoEditor, monacoInstance);
    },
    [onMount]
  );

  const handleChange = useCallback(
    (newValue: string | undefined, event: editor.IModelContentChangedEvent) => {
      if (counterLimit && newValue && newValue.length > counterLimit) {
        editorRef.current && editorRef.current.trigger(TRIGGER_SOURCE, 'undo', null);
        return;
      }
      if (editorRef.current) {
        editorRef.current.pushUndoStop();
      }
      onChange && onChange(newValue, event);
    },
    [onChange, counterLimit]
  );

  const { syntaxDataSource, currentSyntaxItem } = useMemo(() => {
    const source = syntaxOptions?.map((item: CodeAreaSyntaxOption) => {
      const { label: itemLabel, language } = item;
      return {
        key: language,
        text: itemLabel || language,
      };
    });
    const currentItem = syntaxOptions?.find((item: CodeAreaSyntaxOption) => {
      return item.language === currentSyntax;
    });
    return {
      syntaxDataSource: source,
      currentSyntaxItem: currentItem || { language: currentSyntax },
    };
  }, [currentSyntax, syntaxOptions]);

  const syntaxSelect = useMemo(() => {
    return syntaxDataSource && syntaxDataSource.length > 1 && !readOnly ? (
      <InlineSelect
        size="small"
        expanded={false}
        input={{
          name: 'syntax-select',
          value: currentSyntaxItem.label || currentSyntaxItem.language,
          onChange: NOOP,
        }}
        onValueChange={item => {
          item.key && onSyntaxChange && onSyntaxChange(`${item.key}`);
        }}
        initialValue={currentSyntaxItem.label || currentSyntaxItem.language}
        dataSource={syntaxDataSource}
      />
    ) : (
      <S.SyntaxTitle size="small">{currentSyntaxItem.label || currentSyntaxItem.language}</S.SyntaxTitle>
    );
  }, [currentSyntaxItem.label, currentSyntaxItem.language, onSyntaxChange, readOnly, syntaxDataSource]);

  const customFooterContent = useMemo(() => {
    return (
      renderFooterContent && (
        <S.BottomBarElement>
          {renderFooterContent({
            isFullscreen,
            count,
            isValid,
          })}
        </S.BottomBarElement>
      )
    );
  }, [renderFooterContent, isFullscreen, count, isValid]);

  useEffect(() => {
    if (editorRef.current) {
      const currentModel = editorRef.current?.getModel();
      // eslint-disable-next-line no-unused-expressions
      currentModel && monacoRef.current?.editor.setModelLanguage(currentModel, currentSyntax);
    }
  }, [currentSyntax]);

  const isBottomBarShowing = Boolean(isSyntaxSelectVisible || (allowFullscreen && !isFullscreen));

  return (
    <>
      <S.EditorWrapper hasError={Boolean(errorText)}>
        <S.EditorInnerWrapper ref={wrapperRef}>
          <Editor
            {...props}
            width={width}
            height={height}
            language={currentSyntax}
            theme={DS_MONACO_THEME_NAME}
            options={editorOptions}
            onChange={handleChange}
            beforeMount={handleBeforeMount}
            onMount={handleEditorDidMount}
            loading={<Loader />}
          />
        </S.EditorInnerWrapper>
        {isBottomBarShowing && (
          <BottomBar
            texts={allTexts}
            syntaxSelect={syntaxSelect}
            allowFullscreen={allowFullscreen && !isFullscreen}
            toggleFullscreen={toggleFullscreen}
            customFooterContent={customFooterContent}
          />
        )}
      </S.EditorWrapper>
      <AriaContainer element={monacoAriaContainerElement} />
    </>
  );
};

export default CodeAreaEditorRaw;
