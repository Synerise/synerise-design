import * as React from 'react';
import AutosizeInput from 'react-input-autosize';
import Tooltip from '@synerise/ds-tooltip';
import Icon from '@synerise/ds-icon';
import EditM from '@synerise/ds-icon/dist/icons/EditM';
import { toCamelCase } from '@synerise/ds-utils';
import * as S from './InlineEdit.styles';

export type InputProps = {
  name?: string;
  value: string | number;
  disabled?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onEnterPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
};

export interface InlineEditProps {
  size: 'normal' | 'small';
  tooltipTitle?: string;
  className?: string;
  disabled?: boolean;
  input: InputProps;
  style?: { [key: string]: string | number };
  autoFocus?: boolean;
  error?: boolean;
  hideIcon?: boolean;
}

const InlineEdit: React.FC<InlineEditProps> = ({
  className,
  style,
  size,
  disabled,
  autoFocus,
  hideIcon,
  tooltipTitle,
  error,
  input,
}): React.ReactElement => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputKey = React.useMemo(() => {
    return `autosize-input-${size}`;
  }, [size]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      input.onChange(e);
    },
    [input]
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      input.onBlur && input.onBlur(e);
    },
    [input]
  );

  const handleKeyPress = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        input.onEnterPress && input.onEnterPress(e);
        inputRef.current && inputRef.current.blur();
      }
    },
    [input]
  );

  const handleFocusInput = React.useCallback(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  React.useEffect(() => {
    autoFocus && inputRef.current && inputRef.current.focus();
  }, [autoFocus, inputRef]);

  return (
    <S.InPlaceEditableInputContainer
      className={className}
      style={style}
      size={size}
      disabled={disabled}
      error={error}
      emptyValue={input.value === ''}
    >
      <AutosizeInput
        key={inputKey}
        id={input.name ? toCamelCase(input.name) : 'id'}
        className="autosize-input"
        placeholder={input.placeholder}
        maxLength={input.maxLength}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        name={input.name}
        value={input.value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete={input.autoComplete}
        placeholderIsMinWidth={false}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
        // @ts-ignore
        ref={inputRef}
      />
      {!hideIcon && (
        <Tooltip data-testid="inline-edit-icon" title={tooltipTitle}>
          <S.IconWrapper onClick={handleFocusInput} size={size}>
            <Icon component={<EditM />} size={20} />
          </S.IconWrapper>
        </Tooltip>
      )}
    </S.InPlaceEditableInputContainer>
  );
};

export default InlineEdit;
