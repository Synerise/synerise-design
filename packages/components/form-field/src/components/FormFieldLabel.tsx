import React from 'react';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { InfoFillS } from '@synerise/ds-icon';
import { Text } from '@synerise/ds-typography';

import * as S from '../FormField.styles';
import { FormFieldLabelProps } from '../FormField.types';

export const FormFieldLabel = ({
  id,
  label,
  tooltip,
  tooltipConfig,
  children,
  ...htmlAttributes
}: FormFieldLabelProps) => (
  <>
    {(label || children) && (
      <S.FormFieldLabelWrapper htmlFor={id} {...htmlAttributes}>
        <Text ellipsis={{ tooltip: label || children }}>{label || children}</Text>
        {(tooltip || tooltipConfig) && (
          <Tooltip title={tooltip} placement="top" trigger="hover" transitionName="zoom-big-fast" {...tooltipConfig}>
            <S.IconWrapper data-testid="label-tooltip-trigger">
              <Icon size={24} component={<InfoFillS />} />
            </S.IconWrapper>
          </Tooltip>
        )}
      </S.FormFieldLabelWrapper>
    )}
  </>
);
