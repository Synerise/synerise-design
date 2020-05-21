import * as React from 'react';
import { StarFillM, StarM } from '@synerise/ds-icon/dist/icons';
import { withTheme } from 'styled-components';
import Icon from '@synerise/ds-icon';
import * as S from './StarCell.styles';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  active?: boolean;
  onClick?: () => void;
  theme: {
    [k: string]: string;
  };
}

const StartCell: React.FC<Props> = ({ children, active, onClick, theme }: Props) => {
  const icon = React.useMemo(() => {
    return active ? (
      <Icon component={<StarFillM />} color={theme.palette['yellow-600']} />
    ) : (
      <Icon component={<StarM />} color={theme.palette['grey-300']} />
    );
  }, [active, theme.palette]);

  return (
    <S.StarCell>
      <S.StarIcon onClick={onClick}>{icon}</S.StarIcon>
      {children}
    </S.StarCell>
  );
};

export default withTheme(StartCell);
