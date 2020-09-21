import * as React from 'react';
import Input, { TextAreaProps } from 'antd/lib/input';
import Scrollbar from '@synerise/ds-scrollbar';
import * as S from './Textarea.styles';

const Textarea: React.FC<TextAreaProps & { error?: string; wrapperStyle?: React.CSSProperties }> = ({
  disabled,
  error,
  rows = 4,
  wrapperStyle,
  onBlur,
  onFocus,
  ...props
}) => {
  const [focus, setFocus] = React.useState<boolean>(false);
  return (
    <S.TextareaWrapper
      className="ds-textarea"
      isDisabled={Boolean(disabled)}
      isFocused={focus}
      hasError={Boolean(error)}
      style={{ height: `${rows * 17}px`, ...wrapperStyle }}
    >
      <Scrollbar absolute>
        <Input.TextArea
          autoSize
          {...props}
          disabled={disabled}
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
};

export default Textarea;
