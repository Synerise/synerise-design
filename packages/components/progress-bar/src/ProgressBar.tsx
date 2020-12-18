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
    const { showLabel, description, amount, percent, type, status, strokeColor, strokeLinecap, className } = this.props;
    return (
      <S.Container className={`${className || ''} progress-bar-container`} data-testid="progress-bar-container">
        {showLabel && (
          <span className="progress-bar-label" data-testid="progress-bar-label">
            <S.MaxValue data-testid="progress-bar-max-value">{amount}</S.MaxValue>
            <span data-testid="progress-bar-max-percent">{` (${percent}%)`}</span>
          </span>
        )}
        <S.AntdProgressBar
          percent={percent}
          type={type}
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
