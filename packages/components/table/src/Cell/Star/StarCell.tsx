import React, { useMemo } from 'react';
import { withTheme } from 'styled-components';

import { useTheme } from '@synerise/ds-core';
import Icon, { StarFillM, StarM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';

import * as S from './StarCell.styles';
import { type StarCellProps } from './StarCell.types';

const StarCell = ({
  children,
  active,
  onClick,
  starTooltip,
  ...htmlAttributes
}: StarCellProps) => {
  const theme = useTheme();
  const icon = useMemo(() => {
    return active ? (
      <Icon component={<StarFillM />} color={theme.palette['yellow-600']} />
    ) : (
      <Icon component={<StarM />} color={theme.palette['grey-300']} />
    );
  }, [active, theme.palette]);

  return (
    <S.StarCell {...htmlAttributes}>
      <Tooltip align={{ offset: [0, 8] }} title={starTooltip}>
        <S.StarredIcon active={active} component={icon} onClick={onClick} />
      </Tooltip>
      {children}
    </S.StarCell>
  );
};

export default withTheme(StarCell);
