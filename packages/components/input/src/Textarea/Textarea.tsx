import type { TextAreaRef } from 'antd/lib/input/TextArea';
import React, { type Ref, forwardRef, useState } from 'react';

import Scrollbar from '@synerise/ds-scrollbar';

import * as InputStyles from '../Input.styles';
import * as S from './Textarea.styles';
import { type RawTextAreaProps } from './Textarea.types';

export const RawTextArea = forwardRef(
  (
    {
      disabled,
      error,
      rows = 4,
      wrapperStyle,
      onBlur,
      onFocus,
      resize,
      autoSize,
      readOnly,
      ...props
    }: RawTextAreaProps,
    ref: Ref<TextAreaRef>,
  ) => {
    const [focus, setFocus] = useState(false);
    return (
      <S.TextareaWrapper
        className="ds-textarea"
        isDisabled={Boolean(disabled)}
        isFocused={focus}
        isReadOnly={readOnly}
        hasError={Boolean(error)}
        resize={resize}
        style={{
          height: autoSize ? 'auto' : `${rows * 17}px`,
          ...wrapperStyle,
        }}
      >
        <Scrollbar absolute classes="textarea-scrollbar">
          <InputStyles.AntdTextArea
            autoSize={autoSize}
            {...props}
            ref={ref}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={(e): void => {
              onFocus && onFocus(e);
              setFocus(true);
            }}
            onBlur={(e): void => {
              onBlur && onBlur(e);
              setFocus(false);
            }}
          />
        </Scrollbar>
      </S.TextareaWrapper>
    );
  },
);

export default RawTextArea;
