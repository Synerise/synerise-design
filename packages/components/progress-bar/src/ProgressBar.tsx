import React from 'react';
import * as S from './ProgressBar.styles';
import { ProgressProps } from './ProgressBar.types';

class ProgressBar extends React.PureComponent<ProgressProps> {
  static defaultProps = {
    type: 'line',
    status: 'normal',
    strokeLinecap: 'round',
    strokeColor: '#76dc25',
    showLabel: false,
    description: '',
    maxPercent: true,
  };

  render(): React.ReactNode {
    const {
      showLabel,
      description,
      amount,
      percent,
      type,
      status,
      strokeColor,
      strokeLinecap,
      className,
      thick,
      labelFormatter,
      containerStyles,
      maxPercent,
    } = this.props;
    const maxBorderWidth = (): boolean | undefined => {
      if (percent === 100) {
        return maxPercent;
      }
      return false;
    };

    return (
      <S.Container
        className={`${className || ''} progress-bar-container`}
        data-testid="progress-bar-container"
        style={containerStyles}
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
          thick={thick}
          status={status}
          strokeColor={strokeColor}
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
  }
}

export default ProgressBar;
