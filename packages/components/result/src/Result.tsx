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
    iconColor: 'var(--ds-color-icon-brand-default)',
  },
  warning: {
    IconComponent: WarningL,
    iconColor: 'var(--ds-color-icon-warning-default)',
  },
  error: {
    IconComponent: WarningL,
    iconColor: 'var(--ds-color-icon-danger-default)',
  },
  success: {
    IconComponent: CheckL,
    iconColor: 'var(--ds-color-icon-success-default)',
  },
  progress: {
    IconComponent: TimeL,
    iconColor: 'var(--ds-color-icon-base-default)',
  },
  'no-results': {
    IconComponent: InformationNoSearchResultL,
    iconColor: 'var(--ds-color-icon-base-default)',
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
