import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@synerise/ds-button';
import Icon, { AngleRightS, ArrowRuCircleM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { Text } from '@synerise/ds-typography';

import * as S from '../InformationCard.styles';
import { type InformationCardFooterProps } from './InformationCardFooter.types';

export const InformationCardFooter = ({
  actionButton = false,
  actionButtonCallback,
  actionsMenuButtonLabel,
  actionsMenuButtonOnClick,
  actionButtonTooltipText = '',
  text = '',
}: InformationCardFooterProps) => {
  return (
    <S.FooterWrapper
      data-testid="information-card-footer"
      style={{ alignItems: 'center' }}
    >
      {actionsMenuButtonOnClick && (
        <Button
          type="ghost"
          mode="label-icon"
          onClick={actionsMenuButtonOnClick}
        >
          {actionsMenuButtonLabel || (
            <FormattedMessage
              id="DS.INFORMATION-CARD.QUICK-ACTIONS"
              defaultMessage="Quick actions"
            />
          )}
          <Icon component={<AngleRightS />} />
        </Button>
      )}
      <S.FlexGrow>{text && <Text size="xsmall">{text}</Text>}</S.FlexGrow>
      <S.ActionButtonContainer>
        {(actionButton && actionButton === true && (
          <Tooltip type="default" title={actionButtonTooltipText}>
            <Button
              type="ghost"
              mode="single-icon"
              onClick={actionButtonCallback}
            >
              <ArrowRuCircleM />
            </Button>
          </Tooltip>
        )) ||
          (typeof actionButton === 'function' && actionButton())}
      </S.ActionButtonContainer>
    </S.FooterWrapper>
  );
};
