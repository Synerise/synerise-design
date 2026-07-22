import React from 'react';

import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Icon, {
  ArrowDownCircleM,
  CloseM,
  DuplicateM,
  OptionHorizontalM,
} from '@synerise/ds-icon';

import * as S from './RangeActions.styles';
import { type RangeActionsProps } from './RangeActions.types';

const RangeActions: React.FC<RangeActionsProps> = ({
  texts,
  onRangeClear,
  onRangeCopy,
  onRangePaste,
}) => {
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
              <Icon
                component={<CloseM />}
                color="var(--ds-color-icon-danger-default)"
              />
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
      overlayStyle={{ boxShadow: 'var(--ds-shadows-shadow-1)' }}
      trigger={['click']}
      align={{ points: ['tr', 'br'] }}
      getPopupContainer={(node): HTMLElement =>
        node.parentElement !== null ? node.parentElement : document.body
      }
      asChild
      popoverProps={{
        testId: 'date-range-picker-filter-actions',
      }}
    >
      {trigger}
    </Dropdown>
  );
};

export default RangeActions;
