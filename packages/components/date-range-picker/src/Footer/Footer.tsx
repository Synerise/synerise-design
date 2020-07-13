import * as React from 'react';
import { injectIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import { ArrowRightS, CalendarM, ClockM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import moment from 'moment';
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
  value,
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
    [mode, onSwitchMode, canSwitchMode]
  );
  const ChosenRange = React.useMemo(
    () => (
      <S.ChosenRange>
        {moment(value?.from).format('MMM D, YYYY, HH:mm')}
        <Icon component={<ArrowRightS />} />
        {moment(value?.to).format('MMM D, YYYY, HH:mm')}
      </S.ChosenRange>
    ),
    [value]
  );
  return (
    <S.Container className="ds-date-range-picker-footer" {...rest}>
      {ChosenRange}
      <S.ActionsPlaceholder />
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
