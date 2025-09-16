import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, { EditS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { useOnClickOutside } from '@synerise/ds-utils';

import * as S from '../../SubtleForm.styles';
import { type SubtleFieldProps } from '../../SubtleForm.types';
import { MaskedDatePlaceholder } from '../DatePicker/DatePicker.styles';

const SubtleField = ({
  disabled,
  suffix,
  suffixTooltip,
  label,
  labelTooltip,
  activeElement,
  inactiveElement,
  mask,
  maskVisible,
  errorText,
  active: activeProp,
}: SubtleFieldProps) => {
  const [active, setActive] = useState(activeProp);
  const [blurred, setBlurred] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleDeactivate = useCallback(() => {
    setActive(false);
    setBlurred(true);
  }, []);
  const handleActivate = useCallback(() => {
    setActive(true);
    setBlurred(false);
  }, []);

  const theme = useTheme();

  useEffect(() => setActive(activeProp), [activeProp]);

  const isActive = Boolean(
    errorText || (active && !blurred && !!activeElement),
  );

  useOnClickOutside(containerRef, () => {
    handleDeactivate();
  });
  return (
    <S.Subtle className="ds-subtle-form" disabled={disabled}>
      <S.SubtleFormField active={isActive} label={label} tooltip={labelTooltip}>
        <S.Container
          ref={containerRef}
          className="ds-subtle-field"
          active={active}
        >
          {isActive && activeElement ? (
            activeElement()
          ) : (
            <S.Inactive
              tabIndex={0}
              onFocus={!disabled ? handleActivate : undefined}
              onClick={!disabled ? handleActivate : undefined}
              onBlur={handleDeactivate}
              blurred={blurred}
              disabled={disabled}
              mask={maskVisible}
            >
              <S.MainContent hasMargin>
                {inactiveElement && inactiveElement()}
                {!disabled && maskVisible && (
                  <MaskedDatePlaceholder>{mask}</MaskedDatePlaceholder>
                )}
              </S.MainContent>
              {!active && !disabled && (
                <S.Suffix select>
                  <Tooltip title={suffixTooltip}>
                    {suffix ?? (
                      <Icon
                        component={<EditS />}
                        color={theme.palette['grey-600']}
                      />
                    )}
                  </Tooltip>
                </S.Suffix>
              )}
            </S.Inactive>
          )}
        </S.Container>
      </S.SubtleFormField>
    </S.Subtle>
  );
};
SubtleField.displayName = 'SubtleField';
export default SubtleField;
