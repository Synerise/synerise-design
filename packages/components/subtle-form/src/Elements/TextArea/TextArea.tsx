import * as React from 'react';
import Icon, { EditS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { theme } from '@synerise/ds-core';
import { Label, TextArea } from '@synerise/ds-input';
import calculateSize from 'calculate-size';
import * as S from '../../SubtleForm.styles';
import { SubtleTextAreaProps } from './TextArea.types';
import { focusPadding } from '../../SubtleForm.styles';

const FONT = 'Graphik LCG Web';
const FONT_SIZE = '13px';
const ROW_HEIGHT_PX = 17;
const HORIZONTAL_PADDING_PX = 20;
const VERTICAL_PADDING_PX = 7;

const SubtleTextArea: React.FC<SubtleTextAreaProps> = ({
  disabled,
  minRows = 1,
  maxRows,
  value,
  onChange,
  placeholder,
  label,
  labelTooltip,
  suffixTooltip,
  suffix,
  error,
  errorText,
  textAreaProps,
  ...rest
}) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [blurred, setBlurred] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleRows, setVisibleRows] = React.useState<number>(minRows);

  const hasError = error || !!errorText;
  const calculateTextHeight = React.useCallback(() => {
    let textHeight = 0;
    if (!!value && !!containerRef.current) {
      const { height } = calculateSize(value, {
        width: `${containerRef.current.offsetWidth - 2 * HORIZONTAL_PADDING_PX}px`,
        font: FONT,
        fontSize: FONT_SIZE,
      });
      textHeight = height;
    }
    return textHeight;
  }, [value, containerRef]);

  React.useEffect(() => {
    const keyboardBasedLines = Number(value?.split('\n').length);

    const refBasedLines = Math.floor((calculateTextHeight() + 2 * VERTICAL_PADDING_PX) / ROW_HEIGHT_PX);
    const lines = Math.max(Number(refBasedLines), keyboardBasedLines);
    if (lines && lines < minRows) {
      setVisibleRows(minRows);
      return;
    }
    if (lines && !!maxRows && lines > maxRows) {
      setVisibleRows(maxRows);
      return;
    }
    if (lines) {
      setVisibleRows(lines);
    }
  }, [minRows, maxRows, value, calculateTextHeight]);

  const handleDeactivate = React.useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (textAreaProps) {
        const { onBlur } = textAreaProps;
        onBlur && onBlur(e);
      }
      setActive(false);
      setBlurred(true);
    },
    [textAreaProps]
  );
  const handleActivate = React.useCallback(() => {
    setActive(true);
    setBlurred(false);
  }, []);
  return (
    <S.Subtle className="ds-subtle-form">
      {label && (
        <S.ContentAbove active={active}>
          <Label label={label} tooltip={labelTooltip} />
        </S.ContentAbove>
      )}
      <S.Container ref={containerRef} className="ds-subtle-textarea" active={active} disabled={disabled}>
        {(active || hasError) && !disabled ? (
          <TextArea
            autoFocus={!hasError && !disabled}
            onChange={
              !disabled
                ? (e: React.ChangeEvent<HTMLInputElement>): void => {
                    onChange && onChange(e.currentTarget.value as string);
                  }
                : undefined
            }
            onBlur={!disabled ? handleDeactivate : undefined}
            value={value}
            rows={visibleRows + 1}
            style={{ margin: 0, padding: focusPadding }}
            placeholder={placeholder}
            error={error}
            errorText={errorText}
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            wrapperStyle={{ margin: 0 }}
            {...rest}
            {...textAreaProps}
          />
        ) : (
          <S.Inactive
            rows={visibleRows}
            onClick={!disabled ? handleActivate : undefined}
            blurred={blurred}
            disabled={disabled}
          >
            <S.MainContent breakWord>
              <S.ValueArea
                disabled={disabled}
                value={value && !!value.trim() ? value : placeholder}
                onBlur={!disabled ? handleDeactivate : undefined}
                grey={!value && !!placeholder}
              />
            </S.MainContent>
            <S.Suffix>
              <Tooltip title={suffixTooltip}>
                {suffix ?? <Icon component={<EditS />} color={theme.palette['grey-600']} />}
              </Tooltip>
            </S.Suffix>
          </S.Inactive>
        )}
      </S.Container>
    </S.Subtle>
  );
};
export default SubtleTextArea;
