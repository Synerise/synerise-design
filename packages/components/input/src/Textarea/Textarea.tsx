import * as React from 'react';
import Input, { TextAreaProps } from 'antd/lib/input';
import Scrollbar from '@synerise/ds-scrollbar';
import * as S from './Textarea.styles';

const Textarea: React.FC<TextAreaProps & { error?: string }> = ({ disabled, error, rows = 4, ...props }) => {
  const [focus, setFocus] = React.useState<boolean>(false);
  return (
    <S.TextareaWrapper
      isDisabled={Boolean(disabled)}
      isFocused={focus}
      hasError={Boolean(error)}
      style={{ height: `${rows * 17}px` }}
    >
      <Scrollbar absolute>
        <Input.TextArea
          autoSize
          {...props}
          disabled={disabled}
          onFocus={(): void => setFocus(true)}
          onBlur={(): void => setFocus(false)}
        />
      </Scrollbar>
    </S.TextareaWrapper>
  );
};

export default Textarea;
