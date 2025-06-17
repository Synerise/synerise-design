import React, { useEffect, useRef, useCallback, ChangeEvent, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import FormField from '@synerise/ds-form-field';

import '@synerise/ds-core/dist/js/style';
import './style/index.less';

import * as S from './Input.styles';
import { ElementIcons } from './components';
import DSTextArea from './Textarea/Textarea';
import { TextareaProps } from './TextArea.types';
import { useElementFocus } from './hooks';
import { getCharCount } from './utils';
import { useCounterLimit } from './hooks/useCounterLimit';

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
  const rightSide = useCounterLimit({ renderCustomCounter, counterLimit, charCount });

  return (
    <S.OuterWrapper className={className} resetMargin={resetMargin}>
      <FormField
        label={label}
        rightSide={rightSide}
        id={id}
        tooltip={tooltip}
        tooltipConfig={tooltipConfig}
        description={description}
        errorText={errorText}
      >
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
          <DSTextArea
            {...antdTextareaProps}
            className={hasErrorMessage || error ? 'error' : undefined}
            error={hasErrorMessage || error}
            onChange={handleChange}
            value={antdTextareaProps.value}
            id={id}
            autoComplete="off"
          />
        </S.InputWrapper>
      </FormField>
    </S.OuterWrapper>
  );
};

export const RawTextArea = S.AntdTextArea;
