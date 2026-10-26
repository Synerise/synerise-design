import React from 'react';
import { injectIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Icon, { CalendarM, ClockM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './Footer.styles';
import type { Props } from './Footer.types';

const Footer: React.FC<Props> = ({
  text,
  canApply,
  onApply,
  intl,
  canSwitchMode,
  onSwitchMode,
  mode,
  dateOnly,
  message,
  texts,
  hideNow,
  getNowDate,
  ...rest
}) => {
  const SwitchModeButton = React.useMemo(
    () => (
      <Button
        type="ghost"
        mode="single-icon"
        disabled={!canSwitchMode}
        onClick={onSwitchMode}
        className="ds-date-time-switch"
      >
        <Icon component={mode === 'time' ? <CalendarM /> : <ClockM />} />
      </Button>
    ),
    [mode, onSwitchMode, canSwitchMode],
  );
  return (
    <S.Container
      className="ds-date-picker-footer"
      key="date-picker-footer"
      {...rest}
    >
      {!hideNow && (
        <S.Range
          data-testid="range-now"
          type="tertiary"
          onClick={(): void => {
            onApply && onApply(getNowDate ? getNowDate() : new Date());
          }}
        >
          {texts.now}
        </S.Range>
      )}
      <S.ActionsPlaceholder />
      <S.Actions>
        {!dateOnly && SwitchModeButton}
        <Tooltip title={message}>
          <Button
            data-testid="date-picker-apply"
            disabled={!canApply}
            type="primary"
            onClick={(): void => {
              onApply && onApply();
            }}
          >
            {texts.apply}
          </Button>
        </Tooltip>
      </S.Actions>
    </S.Container>
  );
};

export default injectIntl(Footer);
