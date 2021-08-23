import * as React from 'react';
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
      rightLabel,
      aboveLeftLabel,
      aboveRightLabel,
      tooltipHint = 'tooltip',
    } = this.props;
    return (
      <S.Container
        className={`${className || ''} progress-bar-container`}
        data-testid="progress-bar-container"
        style={containerStyles}
      >
        {(aboveLeftLabel || aboveRightLabel) && (
          <S.LabelsAboveWrapper isLeftLabel={!!aboveLeftLabel} isRightLabel={!!aboveRightLabel}>
            {aboveLeftLabel && (
              <S.Label 
                label={<span>{aboveLeftLabel}</span>} 
                tooltipConfig={{offset:"small", title:tooltipHint, align:{ offset: [0, 4] } }} 
                className="label-left" />
            )}
            {aboveRightLabel && <span className="label-right">{aboveRightLabel}</span>}
          </S.LabelsAboveWrapper>
        )}
        {(showLabel || rightLabel) && (
          <S.LabelsWrapper isLeftLabel={!!showLabel} isRightLabel={!!rightLabel}>
            {showLabel &&
              (labelFormatter ? (
                labelFormatter(amount, percent)
              ) : (
                <span className="progress-bar-label" data-testid="progress-bar-label">
                  <S.MaxValue data-testid="progress-bar-max-value">{amount}</S.MaxValue>
                  <span data-testid="progress-bar-max-percent">{` (${percent}%)`}</span>
                </span>
              ))}
            {rightLabel && <S.TotalValue data-testid="progress-bar-total-value">{rightLabel}</S.TotalValue>}
          </S.LabelsWrapper>
        )}
        <S.AntdProgressBar
          percent={percent}
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
