import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Label } from '@synerise/ds-input';
import Select from '@synerise/ds-select';
import * as S from '../../SubtleForm.styles';
import { SubtleSelectProps } from './Select.types';
import { SelectContainer, ContentAbove } from './Select.styles';

const SubtleSelect: React.FC<SubtleSelectProps> = ({
  value,
  suffix,
  suffixTooltip,
  label,
  children,
  labelTooltip,
  placeholder,
  error,
  errorText,
  ...rest
}) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [blurred, setBlurred] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const hasError = error || !!errorText;
  console.log('hasError', hasError);
  const handleDeactivate = React.useCallback(() => {
    setActive(false);
    setBlurred(true);
  }, []);
  const handleActivate = React.useCallback(() => {
    setActive(true);
    setBlurred(false);
  }, []);
  return (
    <S.Subtle className="ds-subtle-form">
      <ContentAbove active={active}>
        <Label label={label} tooltip={labelTooltip} />
      </ContentAbove>
      <SelectContainer ref={containerRef} className="ds-subtle-textarea" active={active}>
        {(active && !blurred) || hasError ? (
          <Select
            autoFocus
            size="middle"
            onBlur={handleDeactivate}
            value={value}
            placeholder={placeholder}
            errorText={errorText}
            error={error}
            defaultOpen
            {...rest}
          >
            {children}
          </Select>
        ) : (
          <S.Inactive onClick={handleActivate} blurred={blurred}>
            <S.MainContent>{value && !!String(value).trim() ? value : placeholder}</S.MainContent>
            {!active && (
              <S.Suffix select>
                <Tooltip title={suffixTooltip}>
                  {suffix ?? <Icon component={<AngleDownS />} color={theme.palette['grey-600']} />}
                </Tooltip>
              </S.Suffix>
            )}
          </S.Inactive>
        )}
      </SelectContainer>
    </S.Subtle>
  );
};
export default SubtleSelect;
