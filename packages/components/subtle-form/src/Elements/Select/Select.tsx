import React from 'react';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { theme } from '@synerise/ds-core';
import { Label } from '@synerise/ds-input';
import Select from '@synerise/ds-select';
import * as S from '../../SubtleForm.styles';
import { SubtleSelectProps } from './Select.types';
import { SelectContainer, ContentAbove } from './Select.styles';

const SubtleSelect: React.FC<SubtleSelectProps> = ({
  disabled,
  value,
  suffix,
  suffixTooltip,
  label,
  children,
  labelTooltip,
  placeholder,
  error,
  errorText,
  dropdownAlign = {},
  ...rest
}) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [blurred, setBlurred] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const hasError = error || !!errorText;
  const handleDeactivate = React.useCallback(() => {
    setActive(false);
    setBlurred(true);
  }, []);
  const handleActivate = React.useCallback(() => {
    setActive(true);
    setBlurred(false);
  }, []);
  return (
    <S.Subtle className="ds-subtle-form" disabled={disabled}>
      <ContentAbove active={active}>
        <Label label={label} tooltip={labelTooltip} />
      </ContentAbove>
      <SelectContainer ref={containerRef} className="ds-subtle-select" active={active}>
        {(active && !blurred) || hasError ? (
          <Select
            disabled={disabled}
            autoFocus={!hasError}
            size="middle"
            onBlur={handleDeactivate}
            value={value}
            placeholder={placeholder}
            errorText={errorText}
            error={error}
            defaultOpen={!hasError}
            dropdownAlign={{ offset: [0, 8], ...dropdownAlign }}
            {...rest}
          >
            {children}
          </Select>
        ) : (
          <S.Inactive
            className="inactive-content"
            onClick={!disabled ? handleActivate : undefined}
            blurred={blurred}
            disabled={disabled}
          >
            <S.MainContent className="main-content" hasMargin>
              <>{value && !!String(value).trim() ? value : placeholder}</>
            </S.MainContent>
            {!active && !disabled && (
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
