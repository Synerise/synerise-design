import * as React from 'react';
import Icon from '@synerise/ds-icon';
import AddXl from '@synerise/ds-icon/dist/icons/XL/AddXl';
import SearchNoResultsL from '@synerise/ds-icon/dist/icons/L/SearchNoResultsL';
import InboxNoResultsXl from '@synerise/ds-icon/dist/icons/XL/InboxNoResultsXl';
import InboxNoResultsL from '@synerise/ds-icon/dist/icons/L/InboxNoResultsL';
import SearchNoResultsXl from '@synerise/ds-icon/dist/icons/XL/SearchNoResultsXl';
import AddL from '@synerise/ds-icon/dist/icons/L/AddL';
import * as S from './EmptyStates.styles';
import { EmptyStatesProps } from './EmptyStates.types';

const mapSizeToPx = {
  L: 48,
  XL: 96,
};

const EmptyStates: React.FC<EmptyStatesProps> = ({
  size = 'L',
  label,
  labelPosition = 'right',
  type,
  text,
  button,
  fontSize,
  mode,
}) => {
  const mapTypeToStatus = {
    Add: {
      IconComponent: size === 'L' ? AddL : AddXl,
    },
    NoResults: {
      IconComponent: size === 'L' ? InboxNoResultsL : InboxNoResultsXl,
    },
    SearchNoResults: {
      IconComponent: size === 'L' ? SearchNoResultsL : SearchNoResultsXl,
    },
  };
  const { IconComponent, ...iconContainerStyles } = mapTypeToStatus[type];
  return (
    <S.EmptyStatesWrapper mode={mode} className="ds-empty-states" labelPosition={labelPosition}>
      <S.EmptyStatesIconContainer size={size}>
        <S.StatusIconContainer {...iconContainerStyles}>
          <Icon component={<IconComponent />} size={mapSizeToPx[size]} />
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
