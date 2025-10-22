import React from 'react';

import Icon, { InfoFillS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { Text } from '@synerise/ds-typography';

import * as S from '../FormField.styles';
import { type FormFieldLabelProps } from '../FormField.types';

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
        <Text ellipsis={{ tooltip: label || children }}>
          {label || children}
        </Text>
        {(tooltip || tooltipConfig) && (
          <Tooltip
            title={tooltip}
            placement="top"
            trigger="hover"
            {...tooltipConfig}
          >
            <S.IconWrapper data-testid="label-tooltip-trigger">
              <Icon size={24} component={<InfoFillS />} />
            </S.IconWrapper>
          </Tooltip>
        )}
      </S.FormFieldLabelWrapper>
    )}
  </>
);
