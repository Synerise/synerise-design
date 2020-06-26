import * as React from 'react';
import * as S from './Flag.styles';
import * as Flags from './icons';
import { FlagProps } from './Flag.types';

const FLAG_SIZE_RATIO = 15 / 21;

const DSFlag: React.FC<FlagProps> = ({ country, size = 24 }) => {
  const code = String(country).replace('-', '').toUpperCase();
  const Flag = Flags[code];
  return (
    <S.FlagContainer className={`ds-flag ds-flag-${country}`} size={size}>
      <Flag width={size} height={FLAG_SIZE_RATIO * size} alt={`${country} Flag`} />
    </S.FlagContainer>
  );
};

export default DSFlag;
