import * as React from 'react';
import AutosizeInput from 'react-input-autosize';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { EditS } from '@synerise/ds-icon';
import { toCamelCase } from '@synerise/ds-utils';
import * as S from './InlineEdit.styles';
import { attachWidthWatcher } from './utils';
import { InlineEditProps } from './InlineEdit.types';

const SAMPLE = String.fromCharCode(...[...Array(26).keys()].map(i => i + 65));

const InlineEdit: React.FC<InlineEditProps> = ({
  className,
  style,
  size = 'normal',
  disabled,
  autoFocus,
  hideIcon,
  tooltipTitle,
  error,
  input,
}): React.ReactElement => {
  const inputRef = React.useMemo(() => {
    return React.createRef<HTMLInputElement>();
  }, []);

  const fontStyleWatcher = React.useMemo(() => {
    return React.createRef<HTMLDivElement>();
  }, []);
  const [scrolled, setScrolled] = React.useState<boolean>();
  const handleScroll = React.useCallback((): void => {
    if (inputRef?.current !== null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const scrolledPixels = ((inputRef?.current as any).input as HTMLElement).scrollLeft;
      if (scrolledPixels > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
  }, [inputRef]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      input.onChange(e);
    },
    [input]
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      input.onBlur && input.onBlur(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      inputRef.current.input && inputRef.current.input.scrollTo({ left: 0 });
    },
    [input, inputRef]
  );

  const handleKeyPress = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        input.onEnterPress && input.onEnterPress(e);
        inputRef.current && inputRef.current.blur();
      }
    },
    [input, inputRef]
  );

  const handleFocusInput = React.useCallback(() => {
    inputRef.current && inputRef.current.focus();
  }, [inputRef]);

  const updateInputWidth = React.useCallback(() => {
    if (inputRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (inputRef.current as any).copyInputStyles();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (inputRef.current as any).updateInputWidth();
    }
  }, [inputRef]);

  React.useEffect(() => {
    autoFocus && inputRef.current && inputRef.current.focus();
    updateInputWidth();
    if (fontStyleWatcher) {
      attachWidthWatcher(fontStyleWatcher.current as HTMLDivElement, updateInputWidth);
    }
  }, [autoFocus, fontStyleWatcher, inputRef, updateInputWidth]);

  return (
    <S.InPlaceEditableInputContainer
      className={`ds-inline-edit ${className || ''}`}
      style={style}
      size={size}
      disabled={disabled}
      error={error}
      scrolled={scrolled}
    >
      <AutosizeInput
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
        onScroll={handleScroll}
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        ref={inputRef as any}
      />
      {!hideIcon && (
        <Tooltip data-testid="inline-edit-icon" title={tooltipTitle}>
          <S.IconWrapper disabled={disabled} onClick={handleFocusInput} size={size}>
            <Icon component={<EditS />} size={24} />
          </S.IconWrapper>
        </Tooltip>
      )}
      <S.FontStyleWatcher
        ref={fontStyleWatcher}
        style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}
      >
        {SAMPLE}
      </S.FontStyleWatcher>
    </S.InPlaceEditableInputContainer>
  );
};

export default InlineEdit;
