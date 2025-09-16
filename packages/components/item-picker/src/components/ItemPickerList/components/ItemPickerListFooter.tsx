import React from 'react';

import Button, { type ButtonProps } from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Icon, { RefreshM } from '@synerise/ds-icon';

import { type ItemPickerListTexts } from '../../ItemPickerNew/ItemPickerNew.types';
import * as S from '../ItemPickerList.styles';

type ItemPickerListFooterProps = {
  texts: ItemPickerListTexts;
  refreshButtonProps?: Partial<ButtonProps>;
  onRefresh?: () => void;
};
export const ItemPickerListFooter = ({
  texts,
  refreshButtonProps,
  onRefresh,
}: ItemPickerListFooterProps) => {
  return (
    <>
      {onRefresh && (
        <S.FooterWrapper>
          <S.FooterWrapperLeft />
          <S.FooterWrapperRight>
            <Button
              type="ghost"
              mode="icon-label"
              onClick={onRefresh}
              {...refreshButtonProps}
            >
              <Icon
                component={<RefreshM />}
                size={24}
                color={theme.palette['grey-500']}
              />
              {texts.refreshButtonLabel}
            </Button>
          </S.FooterWrapperRight>
        </S.FooterWrapper>
      )}
    </>
  );
};
