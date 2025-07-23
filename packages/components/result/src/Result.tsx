import React from 'react';

import Icon, {
  CheckL,
  InfoL,
  InformationNoSearchResultL,
  TimeL,
  WarningL,
} from '@synerise/ds-icon';

import * as S from './Result.styles';
import { type ResultProps } from './Result.types';

const mapTypeToStatus = {
  info: {
    IconComponent: InfoL,
    iconColor: 'blue-600',
  },
  warning: {
    IconComponent: WarningL,
    iconColor: 'yellow-600',
  },
  error: {
    IconComponent: WarningL,
    iconColor: 'red-600',
  },
  success: {
    IconComponent: CheckL,
    iconColor: 'green-600',
  },
  progress: {
    IconComponent: TimeL,
    iconColor: 'grey-600',
  },
  'no-results': {
    IconComponent: InformationNoSearchResultL,
    iconColor: 'grey-600',
  },
};

const Result = ({
  className,
  type,
  title,
  description,
  panel,
  buttons,
  customIcon,
}: ResultProps) => {
  const { IconComponent, ...iconContainerStyles } = mapTypeToStatus[type];
  return (
    <S.ResultContainer className={`ds-result ${className || ''}`}>
      <S.ResultIconContainer>
        {customIcon || (
          <S.StatusIconContainer {...iconContainerStyles}>
            <Icon
              component={<IconComponent />}
              size={mapTypeToStatus['no-results'] ? 48 : 24}
              color={iconContainerStyles.iconColor}
            />
          </S.StatusIconContainer>
        )}
      </S.ResultIconContainer>

      {(title || description) && (
        <S.ResultContent>
          {title && <S.Title>{title}</S.Title>}
          {description && <S.Description>{description}</S.Description>}
        </S.ResultContent>
      )}
      {panel && <S.PanelContainer>{panel}</S.PanelContainer>}
      {buttons && <S.ButtonContainer>{buttons}</S.ButtonContainer>}
    </S.ResultContainer>
  );
};

export default Result;
