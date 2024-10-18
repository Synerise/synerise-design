import React, { useState, useMemo, useRef, useEffect } from 'react';
import MonacoEditor, { monaco } from 'react-monaco-editor';
import { InlineSelect } from '@synerise/ds-inline-edit';
import { Label } from '@synerise/ds-input';
import { useResizeObserver } from '@synerise/ds-utils';

import { CodeAreaProps, CodeAreaSyntaxOption } from './CodeArea.types';
import * as S from './CodeArea.styles';
import { FullscreenHeader, ContentBelow, ContentAbove, BottomBar } from './components';
import { getDefaultTexts, getCharCount, calculateRequiredSpace } from './utils';
import { MONACO_DEFAULT_OPTIONS, TRIGGER_SOURCE, DS_MONACO_THEME, DS_MONACO_THEME_NAME } from './constants';

const CodeArea = ({
  label,
  description,
  counter,
  errorText,
  syntaxOptions,
  currentSyntax,
  allowFullscreen,
  renderFooterContent,
  renderAdditionalDescription,
  tooltip,
  tooltipProps,
  style,
  className,
  texts,
  onChange,
  onFullscreenChange,
  onSyntaxChange,
  value,
  ...monacoProps
}: CodeAreaProps) => {
  const [isValid, setIsValid] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof monaco | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentBelowRef = useRef<HTMLDivElement>(null);

  const { height, width } = useResizeObserver(wrapperRef);
  const { height: contentBelowHeight } = useResizeObserver(contentBelowRef);

  const count = getCharCount(value, counter?.limit);
  const allTexts = getDefaultTexts(texts);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    onFullscreenChange && onFullscreenChange(isFullscreen);
  };

  const { editorWillMount, editorDidMount, options } = monacoProps;
  const combinedOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    ...MONACO_DEFAULT_OPTIONS,
    ...options,
  };

  const handleEditorWillMount = (monacoInstance: typeof monaco) => {
    monacoRef.current = monacoInstance;

    monacoInstance.editor.defineTheme(DS_MONACO_THEME_NAME, DS_MONACO_THEME);
    monacoInstance.editor.setTheme(DS_MONACO_THEME_NAME);
    monacoInstance.editor.onDidChangeMarkers(() => {
      const markers = monacoInstance.editor.getModelMarkers({});
      setIsValid(!markers.length);
    });

    editorWillMount && editorWillMount(monacoInstance);
  };

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monacoInstance: typeof monaco) => {
    editorRef.current = editor;

    editorDidMount && editorDidMount(editor, monacoInstance);
  };

  const handleChange = (newValue: string, event: monaco.editor.IModelContentChangedEvent) => {
    if (counter?.limit && newValue.length > counter?.limit) {
      editorRef.current && editorRef.current.trigger(TRIGGER_SOURCE, 'undo', null);
      return;
    }
    if (editorRef.current) {
      editorRef.current.pushUndoStop();
    }
    onChange && onChange(newValue, event);
  };

  const labelWithTooltip = label && (
    <Label
      label={label}
      tooltip={tooltip}
      tooltipConfig={
        (tooltip || tooltipProps) ? {
          ...tooltipProps,
          placement: isFullscreen ? 'right' : undefined,
          title: tooltip,
        }: {}
      }
    />
  );

  const renderCounter = (placement?: 'top' | 'bottom') => {
    return (
      counter?.limit &&
      (!placement || counter?.placement === placement) && (
        <S.Counter>
          {count} / {counter.limit}
        </S.Counter>
      )
    );
  };

  useEffect(() => {
    setIsValid(!errorText);
  }, [errorText]);

  useEffect(() => {
    if (editorRef.current) {
      const currentModel = editorRef.current?.getModel();
      // eslint-disable-next-line no-unused-expressions
      currentModel && monacoRef.current?.editor.setModelLanguage(currentModel, currentSyntax);
    }
  }, [currentSyntax]);

  const { syntaxDataSource, currentSyntaxItem } = useMemo(() => {
    const source = syntaxOptions?.map((item: CodeAreaSyntaxOption) => {
      const { label: itemLabel, language } = item;
      return {
        key: language,
        text: itemLabel || language,
        onSelect: () => {
          onSyntaxChange && onSyntaxChange(language);
        },
      };
    });
    const currentItem = syntaxOptions?.find((item: CodeAreaSyntaxOption) => {
      return item.language === currentSyntax;
    });
    return {
      syntaxDataSource: source,
      currentSyntaxItem: currentItem || { language: currentSyntax },
    };
  }, [currentSyntax, onSyntaxChange, syntaxOptions]);

  const syntaxSelect = useMemo(() => {
    return syntaxDataSource && syntaxDataSource.length > 1 ? (
      <InlineSelect
        size="small"
        expanded={false}
        input={{
          name: 'syntax-select',
          value: currentSyntaxItem.label || currentSyntaxItem.language,
        }}
        initialValue={currentSyntaxItem.label || currentSyntaxItem.language}
        dataSource={syntaxDataSource}
      />
    ) : (
      <S.SyntaxTitle size="small">{currentSyntaxItem.label || currentSyntaxItem.language}</S.SyntaxTitle>
    );
  }, [currentSyntaxItem, syntaxDataSource]);

  const customFooterContent = renderFooterContent && (
    <S.BottomBarElement>
      {renderFooterContent({
        isFullscreen,
        count,
        isValid,
      })}
    </S.BottomBarElement>
  );

  const additionalDescription = renderAdditionalDescription && (
    <S.AdditionalDescription>
      {renderAdditionalDescription({
        isFullscreen,
        count,
        isValid,
      })}
    </S.AdditionalDescription>
  );

  const isBottomBarShowing = Boolean(syntaxSelect || (allowFullscreen && !isFullscreen) || customFooterContent);
  const requiredSpace = isFullscreen ? calculateRequiredSpace(isBottomBarShowing, contentBelowHeight) : 0;

  return (
    <S.CodeAreaWrapper requiredSpace={requiredSpace} className={className} style={style} isFullscreen={isFullscreen}>
      {isFullscreen && <FullscreenHeader label={labelWithTooltip} texts={allTexts} onClick={toggleFullscreen} />}
      {!isFullscreen && <ContentAbove label={labelWithTooltip} counter={renderCounter('top')} />}

      <S.CodeAreaContent>
        <S.EditorWrapper hasError={Boolean(errorText)}>
          <S.EditorInnerWrapper ref={wrapperRef}>
            <MonacoEditor
              theme={DS_MONACO_THEME_NAME}
              width={width}
              height={height}
              {...monacoProps}
              options={combinedOptions}
              value={value}
              onChange={handleChange}
              editorDidMount={handleEditorDidMount}
              editorWillMount={handleEditorWillMount}
              language={currentSyntax}
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
        <ContentBelow
          ref={contentBelowRef}
          errorText={errorText}
          description={description}
          additionalDescription={additionalDescription}
          counter={renderCounter(!isFullscreen ? 'bottom' : undefined)}
        />
      </S.CodeAreaContent>
    </S.CodeAreaWrapper>
  );
};

export default CodeArea;
