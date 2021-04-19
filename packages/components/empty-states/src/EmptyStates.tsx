import * as React from 'react';
import Icon from '@synerise/ds-icon';
import * as S from './EmptyStates.styles';
import { EmptyStatesProps, EmptyStatesSize } from './EmptyStates.types';

const mapSizeToPx = {
  [EmptyStatesSize.SMALL]: 48,
  [EmptyStatesSize.MEDIUM]: 96,
};

const EmptyStates: React.FC<EmptyStatesProps> = ({
  size = EmptyStatesSize.SMALL,
  label,
  labelPosition = 'right',
  text,
  button,
  fontSize,
  customIcon,
  mode,
}) => {
  return (
    <S.EmptyStatesWrapper mode={mode} className="ds-empty-states" labelPosition={labelPosition}>
      <S.EmptyStatesIconContainer size={size}>
        <S.StatusIconContainer>
          <Icon component={customIcon} size={mapSizeToPx[size]} />
        </S.StatusIconContainer>
      </S.EmptyStatesIconContainer>
      {text && (
        <S.HeaderWrapper size={size} fontSize={fontSize}>
          {text}
        </S.HeaderWrapper>
      )}
      <S.TextWrapper labelPosition={labelPosition}>{label}</S.TextWrapper>
      {button && <S.ButtonWrapper>{button}</S.ButtonWrapper>}
    </S.EmptyStatesWrapper>
  );
};
export default EmptyStates;
