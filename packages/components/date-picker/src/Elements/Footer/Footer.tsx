import * as React from 'react';
import { injectIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import { Container, Text, Actions, LinkButton } from './Footer.styles';
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
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Text>{text}</Text>
      <Actions>
        {!dateOnly && (
          <LinkButton disabled={!canSwitchMode} onClick={onSwitchMode}>
            {intl.formatMessage({ id: mode === 'time' ? 'SNRS.DATE.SELECT_DATE' : 'SNRS.DATE.SELECT_TIME' })}
          </LinkButton>
        )}
        <Tooltip title={message}>
          <Button disabled={!canApply} type="primary" onClick={onApply}>
            {intl.formatMessage({ id: 'SNRS.ACTIONS.APPLY' })}
          </Button>
        </Tooltip>
      </Actions>
    </Container>
  );
};

export default injectIntl(Footer);
