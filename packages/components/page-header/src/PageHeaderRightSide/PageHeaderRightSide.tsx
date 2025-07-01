import React from 'react';

import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Icon, { CloseM } from '@synerise/ds-icon';

import type { PageHeaderProps } from '../PageHeader.types';
import * as S from './PageHeaderRightSide.styles';

type PageHeaderRightSideProps = Pick<
  PageHeaderProps,
  'rightSide' | 'onClose' | 'title' | 'tooltipIcon' | 'handleTooltipClick'
>;

export const PageHeaderRightSide = ({
  rightSide,
  onClose,
}: PageHeaderRightSideProps) => {
  return (
    <S.WrapperPageHeaderRightSide>
      <div>
        {rightSide && rightSide}
        {onClose && (
          <Button type="ghost" mode="single-icon">
            <Icon
              className="page-header__close"
              color={theme.palette['grey-500']}
              component={<CloseM />}
              size={32}
              onClick={onClose}
            />
          </Button>
        )}
      </div>
    </S.WrapperPageHeaderRightSide>
  );
};
