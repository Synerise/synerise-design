import React, { useMemo } from 'react';

import Icon, { StarFillM, StarM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';

import * as S from './StarCell.styles';
import type { StarCellProps } from './StarCell.types';

const StarCell = ({
  children,
  active,
  onClick,
  starTooltip,
  ...htmlAttributes
}: StarCellProps) => {
  const icon = useMemo(() => {
    return active ? (
      <Icon
        component={<StarFillM />}
        color="var(--ds-color-icon-warning-default)"
      />
    ) : (
      <Icon component={<StarM />} color="var(--ds-color-icon-base-muted)" />
    );
  }, [active]);

  return (
    <S.StarCell {...htmlAttributes}>
      <Tooltip title={starTooltip}>
        <S.StarredIcon active={active} component={icon} onClick={onClick} />
      </Tooltip>
      {children}
    </S.StarCell>
  );
};

export { StarCell };
