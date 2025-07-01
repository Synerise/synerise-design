import React from 'react';

import Icon, {
  CheckM,
  HourglassM,
  InfoM,
  InformationNoSearchResultL,
  WarningM,
} from '@synerise/ds-icon';

import * as S from './Result.styles';
import { type ResultProps } from './Result.types';

const mapTypeToStatus = {
  info: {
    IconComponent: InfoM,
    iconColor: 'blue-600',
    background: 'blue-050',
  },
  warning: {
    IconComponent: WarningM,
    iconColor: 'yellow-600',
    background: 'yellow-100',
  },
  error: {
    IconComponent: WarningM,
    iconColor: 'red-600',
    background: 'red-100',
  },
  success: {
    IconComponent: CheckM,
    iconColor: 'green-600',
    background: 'green-100',
  },
  progress: {
    IconComponent: HourglassM,
    iconColor: 'grey-600',
    background: 'grey-100',
  },
  'no-results': {
    IconComponent: InformationNoSearchResultL,
    iconColor: 'grey-600',
  },
};

const Result: React.FC<ResultProps> = ({
  className,
  type,
  title,
  description,
  panel,
  buttons,
  customIcon = null,
  noSearchResults = false,
}) => {
  const { IconComponent, ...iconContainerStyles } = mapTypeToStatus[type];
  return (
    <S.ResultContainer
      className={`ds-result ${className || ''}`}
      noSearchResults={noSearchResults}
    >
      <S.MainPanel>
        <S.ResultIconContainer>
          {customIcon || (
            <S.StatusIconContainer {...iconContainerStyles}>
              <Icon
                component={<IconComponent />}
                size={mapTypeToStatus['no-results'] ? 48 : 24}
              />
            </S.StatusIconContainer>
          )}
        </S.ResultIconContainer>

        {title && <S.Title>{title}</S.Title>}

        {description && <S.Description>{description}</S.Description>}
        {panel && <S.PanelContainer>{panel}</S.PanelContainer>}
        {buttons && <S.ButtonContainer>{buttons}</S.ButtonContainer>}
      </S.MainPanel>
    </S.ResultContainer>
  );
};

export default Result;
