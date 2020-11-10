import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { EditS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Label, TextArea } from '@synerise/ds-input';
import calculateSize from 'calculate-size';
import * as S from '../../SubtleForm.styles';
import { SubtleTextAreaProps } from './TextArea.types';

const FONT = 'Graphik LCG Web';
const FONT_SIZE = '13px';
const ROW_HEIGHT_PX = 17;
const HORIZONTAL_PADDING_PX = 12;
const VERTICAL_PADDING_PX = 7;

const SubtleTextArea: React.FC<SubtleTextAreaProps> = ({
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
      <S.ContentAbove active={active}>
        <Label label={label} tooltip={labelTooltip} />
      </S.ContentAbove>
      <S.Container ref={containerRef} className="ds-subtle-textarea" active={active}>
        {active || hasError ? (
          <TextArea
            {...rest}
            {...textAreaProps}
            autoFocus={!hasError}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              onChange && onChange(e.currentTarget.value);
            }}
            onBlur={handleDeactivate}
            value={value}
            rows={visibleRows + 1}
            style={{ margin: 0 }}
            placeholder={placeholder}
            error={error}
            errorText={errorText}
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            wrapperStyle={{ margin: 0 }}
          />
        ) : (
          <S.Inactive rows={visibleRows} onClick={handleActivate} blurred={blurred}>
            <S.MainContent>
              <S.ValueArea
                value={value && !!value.trim() ? value : placeholder}
                onBlur={handleDeactivate}
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
