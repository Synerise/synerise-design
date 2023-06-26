import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon, { ArrowDownCircleM, CloseM, DuplicateM, OptionHorizontalM } from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';

import { theme } from '@synerise/ds-core';
import { RangeActionsProps } from './RangeActions.types';
import * as S from './RangeActions.styles';

const RangeActions: React.FC<RangeActionsProps> = ({ texts, onRangeClear, onRangeCopy, onRangePaste }) => {
  const overlay = React.useMemo(() => {
    return (
      <S.ActionsMenu>
        <S.ActionItem
          onClick={(): void => {
            onRangeCopy && onRangeCopy();
          }}
          prefixel={<Icon component={<DuplicateM />} />}
        >
          {texts.copyRange}
        </S.ActionItem>
        <S.ActionItem
          onClick={(): void => {
            onRangePaste && onRangePaste();
          }}
          prefixel={<Icon component={<ArrowDownCircleM />} />}
        >
          {texts.pasteRange}
        </S.ActionItem>
        <S.ActionItem
          onClick={onRangeClear}
          prefixel={
            <div>
              <Icon component={<CloseM />} color={theme.palette['red-600']} />
            </div>
          }
        >
          {texts.clearRange}
        </S.ActionItem>
      </S.ActionsMenu>
    );
  }, [texts, onRangePaste, onRangeCopy, onRangeClear]);
  const trigger = React.useMemo((): React.ReactNode => {
    return (
      <Button mode="single-icon" type="ghost">
        <Icon component={<OptionHorizontalM />} />
      </Button>
    );
  }, []);
  return (
    <Dropdown
      overlay={overlay}
      overlayStyle={{ boxShadow: '0 4px 12px 0 rgba(35, 41, 54, 0.07)' }}
      trigger={['click']}
      align={{ points: ['tr', 'br'] }}
      getPopupContainer={(node): HTMLElement => (node.parentElement != null ? node.parentElement : document.body)}
    >
      {trigger}
    </Dropdown>
  );
};

export default RangeActions;
