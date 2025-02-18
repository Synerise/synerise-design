import React, { useEffect, useRef, useCallback, ChangeEvent, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import '@synerise/ds-core/dist/js/style';
import './style/index.less';

import * as S from './Input.styles';
import { ContentAboveElement, ContentBelowElement, ElementIcons } from './components';
import Textarea from './Textarea/Textarea';
import { TextareaProps } from './TextArea.types';
import { useElementFocus } from './hooks';
import { getCharCount } from './utils';

export const TextArea = ({
  className,
  errorText,
  label,
  description,
  counterLimit,
  tooltip,
  tooltipConfig,
  icon1,
  icon1Tooltip,
  autoResize,
  icon2,
  icon2Tooltip,
  resetMargin,
  handleInputRef,
  prefixel,
  suffixel,
  error,
  renderCustomCounter,
  ...antdTextareaProps
}: TextareaProps) => {
  const id = useMemo(() => uuid(), []);
  const charCount = getCharCount(antdTextareaProps.value, counterLimit);
  const hasErrorMessage = Boolean(errorText);

  const ref = useRef<HTMLTextAreaElement>(null);
  const handleIconsClick = useElementFocus(ref);

  useEffect(() => {
    handleInputRef && handleInputRef(ref);
  }, [ref, handleInputRef]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { value: newValue } = e.currentTarget;
      if (counterLimit && newValue.length > counterLimit) {
        return;
      }
      antdTextareaProps.onChange && antdTextareaProps.onChange(e);
    },
    [antdTextareaProps, counterLimit]
  );

  return (
    <S.OuterWrapper autoResize={autoResize} className={className} resetMargin={resetMargin}>
      <ContentAboveElement
        label={label}
        counterLimit={counterLimit}
        id={id}
        tooltip={tooltip}
        tooltipConfig={tooltipConfig}
        charCount={charCount}
        renderCustomCounter={renderCustomCounter}
      />
      <S.InputWrapper>
        <ElementIcons
          handleIconsClick={handleIconsClick}
          disabled={antdTextareaProps.disabled}
          icon1Tooltip={icon1Tooltip}
          icon1={icon1}
          icon2={icon2}
          icon2Tooltip={icon2Tooltip}
          className={className}
          type="textArea"
        />
        <Textarea
          {...antdTextareaProps}
          className={hasErrorMessage || error ? 'error' : undefined}
          error={hasErrorMessage || error}
          onChange={handleChange}
          value={antdTextareaProps.value}
          id={id}
          autoComplete="off"
        />
      </S.InputWrapper>
      <ContentBelowElement description={description} errorText={errorText} />
    </S.OuterWrapper>
  );
};

export const RawTextArea = S.AntdTextArea;
