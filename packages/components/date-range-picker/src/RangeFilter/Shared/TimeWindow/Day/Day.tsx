import dayjs from 'dayjs';
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat';
import React, { memo, useCallback, useMemo, useState } from 'react';

import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Icon, { CheckS, Close3S } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './Day.styles';
import { type DayProps } from './Day.types';

dayjs.extend(customParseFormatPlugin);

const Day = ({
  active,
  label,
  onToggle,
  onClear,
  readOnly,
  restricted,
  dayKey,
  texts,
  intl,
  ...rest
}: DayProps) => {
  const [hovered, setHovered] = useState(false);
  const type = useMemo(() => (active ? 'primary' : 'secondary'), [active]);
  const handleIconClick = useCallback((): void => {
    !readOnly && onClear(dayKey);
  }, [readOnly, onClear, dayKey]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  const handleButtonClick = useCallback((): void => {
    onToggle && onToggle(dayKey, true);
  }, [onToggle, dayKey]);

  const icon = useMemo(() => {
    return hovered && !readOnly ? (
      <Icon
        component={<Close3S />}
        onClick={handleIconClick}
        color={theme.palette['red-600']}
      />
    ) : (
      <Icon component={<CheckS />} color={theme.palette['green-600']} />
    );
  }, [hovered, handleIconClick, readOnly]);

  const getPopupContainer = useCallback(
    (node: HTMLElement): HTMLElement =>
      node.parentElement ? node.parentElement : document.body,
    [],
  );
  const labelForTooltip = typeof label === 'function' ? label(false) : label;
  const handleTooltipVisibleChange = useCallback(
    (visible: boolean): void => setHovered(visible),
    [],
  );
  return (
    <S.Container>
      <Tooltip
        trigger={['hover']}
        title={
          active ? labelForTooltip : texts.clickToSelect || 'Click to select'
        }
      >
        <Button
          {...rest}
          onMouseLeave={handleMouseLeave}
          block
          onClick={handleButtonClick}
          type={type}
          mode="label-icon"
        >
          <S.Content>
            <>{label}</>
          </S.Content>
        </Button>
      </Tooltip>
      {restricted && (
        <Tooltip
          trigger={['hover']}
          title={texts.clear || 'Clear'}
          onOpenChange={handleTooltipVisibleChange}
          getPopupContainer={getPopupContainer}
        >
          <S.IconWrapper readonly={readOnly} active={hovered}>
            {icon}
          </S.IconWrapper>
        </Tooltip>
      )}
    </S.Container>
  );
};
export default memo(Day);
