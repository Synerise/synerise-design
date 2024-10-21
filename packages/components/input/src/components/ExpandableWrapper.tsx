import React, { ChangeEvent, FocusEvent, forwardRef, ReactNode } from 'react';

import type { TextAreaRef } from 'antd/lib/input/TextArea';
import Textarea from '../Textarea/Textarea';
import * as S from '../Input.styles';
import { InputProps } from '../Input.types';

type ExpandableWrapperProps = Pick<InputProps, 'value'> & {
  children: ReactNode;
  expanded: boolean;
  onChange: (Event: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (event: FocusEvent<HTMLTextAreaElement>) => void;
};

export const ExpandableWrapper = forwardRef<TextAreaRef, ExpandableWrapperProps>(
  ({ children, value, expanded, onChange, onBlur }, expandableTextAreaRef) => {
    return (
      <S.ExpandableWrapper expanded={expanded}>
        {children}
        <Textarea
          data-testid="inputExpandTextarea"
          onChange={onChange}
          autoSize={{ minRows: 2, maxRows: 6 }}
          onBlur={onBlur}
          ref={expandableTextAreaRef}
          value={value}
        />
      </S.ExpandableWrapper>
    );
  }
);
