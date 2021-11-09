import * as React from 'react';

import { withTheme } from 'styled-components';
import Icon, { StarFillM, StarM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import * as S from './StarCell.styles';
import { Props } from './StarCell.types';

const StartCell: React.FC<Props> = ({ children, active, onClick, theme, starTooltip }: Props) => {
  const icon = React.useMemo(() => {
    return active ? (
      <Icon component={<StarFillM />} color={theme.palette['yellow-600']} />
    ) : (
      <Icon component={<StarM />} color={theme.palette['grey-300']} />
    );
  }, [active, theme.palette]);

  return (
    <S.StarCell>
      <Tooltip align={{ offset: [0, 8] }} title={starTooltip}>
        <S.StarredIcon active={active} component={icon} onClick={onClick} />
      </Tooltip>
      {children}
    </S.StarCell>
  );
};

export default withTheme(StartCell);
