import React from 'react';

import Button from '@synerise/ds-button';
import Icon, { ArrowLeftM } from '@synerise/ds-icon';

import type { PageHeaderProps } from '../PageHeader.types';
import * as S from './PageHeaderBack.styles';

type PageHeaderBackProps = Pick<PageHeaderProps, 'goBackIcon' | 'onGoBack'>;

export const PageHeaderBack = ({
  goBackIcon,
  onGoBack,
}: PageHeaderBackProps) => {
  const backIcon = goBackIcon || (
    <Icon
      className="page-header__back"
      color="var(--ds-color-icon-base-default)"
      component={<ArrowLeftM />}
      size={24}
    />
  );

  return (
    <S.WrapperPageHeaderBack>
      <Button type="ghost" mode="single-icon" onClick={onGoBack}>
        {backIcon}
      </Button>
    </S.WrapperPageHeaderBack>
  );
};
