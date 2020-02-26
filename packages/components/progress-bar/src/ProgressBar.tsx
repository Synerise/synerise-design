import * as React from 'react';
import Progress, { ProgressProps as AntProgressProps } from 'antd/lib/progress';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';

export interface ProgressProps extends AntProgressProps {
  amount?: number;
  showLabel?: boolean;
  description?: string;
}

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
      <div className={`${className || ''} progress-bar-container`} data-testid="progress-bar-container">
        {showLabel && (
          <span className="progress-bar-label" data-testid="progress-bar-label">
            <strong data-testid="progress-bar-max-value">{amount}</strong>
            <span data-testid="progress-bar-max-percent">{` (${percent}%)`}</span>
          </span>
        )}
        <Progress
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
      </div>
    );
  }
}

export default ProgressBar;
