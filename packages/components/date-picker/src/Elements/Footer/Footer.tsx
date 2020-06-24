import * as React from 'react';
import { injectIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import { CalendarM, ClockM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import * as S from './Footer.styles';
import { Props } from './Footer.types';

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
  ...rest
}) => {
  const SwitchModeButton = React.useMemo(
    () => (
      <Button type="ghost" mode="label-icon" disabled={!canSwitchMode} onClick={onSwitchMode}>
        {mode === 'time' ? texts.selectDate : texts.selectTime}
        <Icon component={mode === 'time' ? <CalendarM /> : <ClockM />} />
      </Button>
    ),
    [mode, texts, onSwitchMode, canSwitchMode]
  );
  return (
    <S.Container {...rest}>
      <S.Range
        type="tertiary-dark"
        disabled={!canApply}
        onClick={(): void => {
          onApply && onApply(new Date());
        }}
      >
        {texts.now}
      </S.Range>
      <S.Actions>
        {!dateOnly && SwitchModeButton}
        <Tooltip title={message}>
          <Button
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
