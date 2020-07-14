import * as React from 'react';
import { injectIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import { ArrowRightS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import * as S from './Footer.styles';
import { Props } from './Footer.types';
import fnsFormat from '../dateUtils/format';
import getDateFromString from '../dateUtils/getDateFromString';

const Footer: React.FC<Props> = ({
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
  format,
  showTime,
  ...rest
}) => {
  const footerFormat = format || (showTime ? 'MMM D, YYYY, HH:mm' : 'MMM D, YYYY');
  const ChosenRange = React.useMemo(
    () => (
      <S.ChosenRange>
        {fnsFormat(getDateFromString(value?.from), footerFormat, intl.locale)}
        <Icon component={<ArrowRightS />} />
        {fnsFormat(getDateFromString(value?.to), footerFormat, intl.locale)}
      </S.ChosenRange>
    ),
    [value, footerFormat, intl.locale]
  );
  return (
    <S.Container className="ds-date-range-picker-footer" {...rest}>
      {ChosenRange}
      <S.ActionsPlaceholder />
      <S.Actions>
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
