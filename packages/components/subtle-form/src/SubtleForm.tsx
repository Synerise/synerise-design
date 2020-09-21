import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { EditS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Label, TextArea } from '@synerise/ds-input';
import { SubtleFormProps, SubtleFormSubComponents } from './SubtleForm.types';
import * as S from './SubtleForm.styles';
import { SubtleTextAreaProps } from './Elements/TextArea/TextArea.types';
import SubtleTextArea from './Elements/TextArea/TextArea';

const SubtleForm: React.FC<SubtleFormProps> & SubtleFormSubComponents = ({
  minRows = 1,
  maxRows,
  value,
  onChange,
  placeholder,
  label,
  labelTooltip,
  suffixTooltip,
  suffix,
}) => {
  const [active, setActive] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleRows, setVisibleRows] = React.useState<number>(minRows);
  React.useEffect(() => {
    const lines = value?.split('\n').length;
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
  }, [minRows, maxRows, value]);

  const handleDeactivate = React.useCallback(() => {
    setActive(false);
  }, []);
  const handleActivate = React.useCallback(() => {
    setActive(true);
  }, []);

  return (
    <S.Subtle className="ds-subtle-form">
      <S.ContentAbove active={active}>
        <Label label={label} tooltip={labelTooltip} />
      </S.ContentAbove>
      <S.Container ref={containerRef} className="ds-subtle-textarea" active={active}>
        {active ? (
          <TextArea
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              onChange && onChange(e.currentTarget.value);
            }}
            onBlur={handleDeactivate}
            value={value}
            rows={visibleRows < 2 ? 2 : visibleRows}
            style={{ margin: 0 }}
            // @ts-ignore
            wrapperStyle={{ minHeight: visibleRows * 17 + 17, margin: 0 }}
          />
        ) : (
          <S.Inactive rows={visibleRows} onClick={handleActivate}>
            <S.MainContent>
              <S.ValueArea value={value || placeholder} onBlur={handleDeactivate} grey={!value && !!placeholder} />
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
SubtleForm.TextArea = (props: SubtleTextAreaProps): React.ReactElement<SubtleTextAreaProps> =>
  SubtleTextArea(props) as React.ReactElement<SubtleTextAreaProps>;

export default SubtleForm;
