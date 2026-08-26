import React from 'react';
import { FormattedMessage } from 'react-intl';

import Dropdown from '@synerise/ds-dropdown';
import ListItem, { ListWrapper } from '@synerise/ds-list-item';
import Scrollbar from '@synerise/ds-scrollbar';

import * as S from '../InformationCard.styles';
import { type InformationCardActionsProps } from './InformationCardActions.types';

const NAV_HEIGHT = 61;

export const InformationCardActions = ({
  onHeaderClick,
  navigationLabel,
  items,
  maxHeight,
}: InformationCardActionsProps) => {
  return (
    <>
      <Dropdown.BackAction
        label={
          navigationLabel || (
            <FormattedMessage
              id="DS.INFORMATION-CARD.QUICK-ACTIONS"
              defaultMessage="Quick actions"
            />
          )
        }
        onClick={onHeaderClick}
      />
      <S.InformationCardActionsWrapper>
        <Scrollbar maxHeight={maxHeight ? maxHeight - NAV_HEIGHT : undefined}>
          <ListWrapper>
            {items.map((item, index) => (
              <ListItem key={item.itemKey ?? item.key ?? index} {...item} />
            ))}
          </ListWrapper>
        </Scrollbar>
      </S.InformationCardActionsWrapper>
    </>
  );
};
