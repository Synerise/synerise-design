import React from 'react';
import { FormattedMessage } from 'react-intl';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Scrollbar from '@synerise/ds-scrollbar';
import { InformationCardActionsProps } from './InformationCardActions.types';
import * as S from '../InformationCard.styles';

const NAV_HEIGHT = 61;

export const InformationCardActions = ({
  onHeaderClick,
  navigationLabel,
  items,
  menuProps,
  maxHeight,
}: InformationCardActionsProps) => {
  return (
    <>
      <Dropdown.BackAction
        label={
          navigationLabel || <FormattedMessage id="DS.INFORMATION-CARD.QUICK-ACTIONS" defaultMessage="Quick actions" />
        }
        onClick={onHeaderClick}
      />
      <S.InformationCardActionsWrapper>
        <Scrollbar maxHeight={maxHeight ? maxHeight - NAV_HEIGHT : undefined}>
          <Menu {...menuProps} dataSource={items} />
        </Scrollbar>
      </S.InformationCardActionsWrapper>
    </>
  );
};
