import React from 'react';
import { useTheme } from '@synerise/ds-core';
import * as S from './ProgressBar.styles';
import { ProgressProps } from './ProgressBar.types';

const ProgressBar = ({
  showLabel = false,
  description = '',
  amount,
  percent,
  type = 'line',
  status = 'normal',
  strokeColor,
  strokeLinecap = 'round',
  className,
  thick,
  thin,
  labelFormatter,
  containerStyles,
  style,
  maxPercent = true,
  ...rest
}: ProgressProps) => {
  const theme = useTheme();
  const maxBorderWidth = () => {
    if (percent === 100) {
      return maxPercent;
    }
    return false;
  };

  return (
    <S.Container
      className={`${className || ''} progress-bar-container`}
      data-testid="progress-bar-container"
      style={{ ...containerStyles, ...style }}
      {...rest}
    >
      {showLabel &&
        (labelFormatter ? (
          labelFormatter(amount, percent)
        ) : (
          <span className="progress-bar-label" data-testid="progress-bar-label">
            <S.MaxValue data-testid="progress-bar-max-value">{amount}</S.MaxValue>
            <span data-testid="progress-bar-max-percent">{` (${percent}%)`}</span>
          </span>
        ))}
      <S.AntdProgressBar
        percent={percent}
        maxPercent={maxBorderWidth()}
        type={type}
        thin={thin || thick}
        status={status}
        strokeColor={strokeColor || theme.palette['green-500']}
        strokeLinecap={strokeLinecap}
        showInfo={false}
      />
      {description && (
        <span className="progress-bar-description" data-testid="progress-bar-description">
          {description}
        </span>
      )}
    </S.Container>
  );
};

export default ProgressBar;
