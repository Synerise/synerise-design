import React from 'react';

import Icon, { InfoFillS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { Text } from '@synerise/ds-typography';

import * as S from './MetricCard.styles';
import type { MetricCardProps } from './MetricCard.types';

const MetricCard = ({
  title,
  headerRightSide,
  hoverValue,
  displayValue,
  tooltip,
  tooltipConfig,
  greyBackground,
  isLoading,
  errorMessage,
  copyValue,
  texts,
  ...htmlAttributes
}: MetricCardProps) => {
  const hasValue = Boolean(hoverValue) || Boolean(displayValue);
  const tooltipVisible = Boolean(tooltip || tooltipConfig);
  const [hover, setHover] = React.useState(false);

  const showSkeleton = isLoading && !hasValue && !errorMessage;

  const showError = errorMessage && !hasValue && !isLoading;
  const showContent = !showSkeleton && !showError;

  return (
    <S.MetricContainer greyBackground={greyBackground} {...htmlAttributes}>
      <S.MetricHeaderBar>
        <S.TitleWrapper header={Boolean(headerRightSide)}>
          <Text ellipsis={{ tooltip: title }}>{title}</Text>
          {tooltipVisible && (
            <Tooltip
              title={tooltip}
              placement="top"
              trigger="hover"
              {...tooltipConfig}
            >
              <S.IconWrapper>
                <Icon size={24} component={<InfoFillS />} />
              </S.IconWrapper>
            </Tooltip>
          )}
        </S.TitleWrapper>
        {headerRightSide && (
          <S.HeaderRightSide>{headerRightSide}</S.HeaderRightSide>
        )}
      </S.MetricHeaderBar>
      <S.MetricContent
        data-testid="ds-metric-card"
        className={hover ? 'hovered' : ''}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        copyable={hasValue}
      >
        {showSkeleton && (
          <S.MetricSkeleton
            size="S"
            width="M"
            height={32}
            numberOfSkeletons={1}
          />
        )}

        {showError && (
          <S.MetricInlineAlert type="alert" message={errorMessage} />
        )}
        {showContent && (
          <S.MetricValue ellipsis={{ tooltip: hoverValue || displayValue }}>
            <S.WrapperFormattedNumber>{displayValue}</S.WrapperFormattedNumber>
            <S.WrapperNumber>{hoverValue || displayValue}</S.WrapperNumber>
          </S.MetricValue>
        )}

        {typeof copyValue === 'string' && hover && (
          <S.WrapperCopyIcon>
            <S.CopyIcon copyValue={copyValue} texts={texts} />
          </S.WrapperCopyIcon>
        )}
      </S.MetricContent>
    </S.MetricContainer>
  );
};

export default MetricCard;
