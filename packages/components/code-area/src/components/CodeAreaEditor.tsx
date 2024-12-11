import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Label } from '@synerise/ds-input';

import { useResizeObserver } from '@synerise/ds-utils';
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { getCharCount } from '../utils/getCharCount';
import { ContentAbove, ContentBelow, FullscreenHeader } from './index';
import { CodeAreaEditorRaw } from './CodeAreaEditorRaw';
import * as S from '../CodeArea.styles';
import { getDefaultTexts } from '../utils/getDefaultTexts';
import { calculateRequiredSpace } from '../utils/calculateRequiredSpace';
import { CodeAreaEditorProps } from '../CodeArea.types';

export const CodeAreaEditor = ({
  renderAdditionalDescription,
  description,
  errorText,
  style,
  zIndex,
  className,
  counter,
  fullscreenLabel,
  tooltip,
  label,
  tooltipProps,
  ...props
}: CodeAreaEditorProps) => {
  const {
    allowFullscreen,
    texts,
    isFullscreen,
    toggleFullscreen,
    syntaxOptions,
    value,
    renderFooterContent,
    readOnly,
    defaultValue,
  } = props;

  const [isValid, setIsValid] = useState(true);

  const contentBelowRef = useRef<HTMLDivElement>(null);

  const { height: contentBelowHeight } = useResizeObserver(contentBelowRef);

  const counterLimit = counter?.limit;
  const count = getCharCount(value || defaultValue, counterLimit);
  const renderCounter = useCallback(
    (placement?: 'top' | 'bottom') => {
      return (
        counterLimit &&
        (!placement || counter?.placement === placement) && (
          <S.Counter>
            {count} / {counter.limit}
          </S.Counter>
        )
      );
    },
    [counterLimit, counter, count]
  );

  const handleOnDidChangeMarkers = useCallback((markers: editor.IMarker[]) => {
    setIsValid(!markers.length);
  }, []);

  const labelWithTooltip = useMemo(() => {
    return (
      label && (
        <Label
          label={label}
          tooltip={tooltip}
          tooltipConfig={
            (tooltip || tooltipProps) && {
              ...tooltipProps,
              placement: isFullscreen ? 'right' : undefined,
              title: tooltip,
            }
          }
        />
      )
    );
  }, [isFullscreen, tooltip, tooltipProps, label]);

  const additionalDescription = useMemo(
    () =>
      renderAdditionalDescription && (
        <S.AdditionalDescription>
          {renderAdditionalDescription({
            isFullscreen,
            count,
            isValid,
          })}
        </S.AdditionalDescription>
      ),
    [count, isValid, isFullscreen, renderAdditionalDescription]
  );

  useEffect(() => {
    setIsValid(!errorText);
  }, [errorText]);

  const isSyntaxSelectVisible = syntaxOptions && syntaxOptions.length > 1 && !readOnly;
  const isBottomBarShowing = Boolean(
    isSyntaxSelectVisible || (allowFullscreen && !isFullscreen) || renderFooterContent
  );
  const requiredSpace = isFullscreen ? calculateRequiredSpace(isBottomBarShowing, contentBelowHeight) : 0;

  const allTexts = getDefaultTexts(texts);

  return (
    <S.CodeAreaWrapper
      readOnly={!!readOnly}
      requiredSpace={requiredSpace}
      className={className}
      style={style}
      isFullscreen={isFullscreen}
      zIndex={zIndex}
    >
      {isFullscreen && (
        <FullscreenHeader label={fullscreenLabel || labelWithTooltip} texts={allTexts} onClick={toggleFullscreen} />
      )}
      {!isFullscreen && <ContentAbove label={labelWithTooltip} counter={renderCounter('top')} />}
      <S.CodeAreaContent>
        <CodeAreaEditorRaw
          {...props}
          onDidChangeMarkers={handleOnDidChangeMarkers}
          counter={counter}
          errorText={errorText}
          count={count}
          counterLimit={counterLimit}
          isSyntaxSelectVisible={isSyntaxSelectVisible}
          isValid={isValid}
        />
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

export default CodeAreaEditor;
