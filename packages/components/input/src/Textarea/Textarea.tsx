import * as React from 'react';
import Input from 'antd/lib/input';
import Scrollbar from '@synerise/ds-scrollbar';
import * as S from './Textarea.styles';
import { TextAreaProps } from './Textarea.types';

const Textarea: React.FC<TextAreaProps> = ({
  disabled,
  error,
  rows = 4,
  wrapperStyle,
  onBlur,
  onFocus,
  autoSize,
  ...props
}) => {
  const [focus, setFocus] = React.useState<boolean>(false);
  return (
    <S.TextareaWrapper
      className="ds-textarea"
      isDisabled={Boolean(disabled)}
      isFocused={focus}
      hasError={Boolean(error)}
      style={{ height: autoSize ? 'auto' : `${rows * 17}px`, ...wrapperStyle }}
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
