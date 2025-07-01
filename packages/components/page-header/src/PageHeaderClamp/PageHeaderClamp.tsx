import React from 'react';

import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { type PageHeaderProps } from '../PageHeader.types';
import * as S from './PageHeaderClamp.styles';

type PageHeaderClampProps = Pick<
  PageHeaderProps,
  'tooltip' | 'children' | 'title' | 'tooltipIcon' | 'handleTooltipClick'
>;

export const PageHeaderClamp = ({
  tooltip,
  children,
  title,
  tooltipIcon,
  handleTooltipClick,
}: PageHeaderClampProps) => (
  <S.WrapperPageHeaderClamp>
    <S.PageHeaderTitle>{children || title}</S.PageHeaderTitle>
    {tooltip !== undefined && tooltipIcon && (
      <S.PageHeaderTooltipWraper>
        <Tooltip {...tooltip}>
          <Icon component={tooltipIcon} onClick={handleTooltipClick} />
        </Tooltip>
      </S.PageHeaderTooltipWraper>
    )}
  </S.WrapperPageHeaderClamp>
);
