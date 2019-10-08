import * as React from 'react';
import Progress from 'antd/lib/progress';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';

interface Props {
  amount: number;
  percent: number;
  type: PROGRESS_TYPE;
  status: PROGRESS_STATUS;
  strokeLinecap: PROGRESS_STROKE_LINECAP;
  strokeColor: PROGRESS_COLORS;
  showLabel: boolean;
  description: string;
}

export enum PROGRESS_STATUS {
  SUCCESS = 'success',
  EXCEPTION = 'exception',
  NORMAL = 'normal',
  ACTIVE = 'active',
}

export enum PROGRESS_STROKE_LINECAP {
  ROUND = 'round',
  SQUARE = 'square',
}

export enum PROGRESS_TYPE {
  LINE = 'line',
  CIRCLE = 'circle',
  DASHBOARD = 'dashboard',
}

export enum PROGRESS_COLORS {
  CYAN = '#13c2bc',
  FERN = '#25dc44',
  GREEN = '#76dc25',
  MARS = '#ff6c4d',
  ORANGE = '#fd9f05',
  PINK = '#ff4d67',
  PURPLE = '#6d2ed3',
  RED = '#ff5a4d',
  VIOLET = '#ce2feb',
  YELLOW = '#ffc300',
}

class ProgressBar extends React.PureComponent<Props> {
  static defaultProps = {
    type: PROGRESS_TYPE.LINE,
    status: PROGRESS_STATUS.NORMAL,
    strokeLinecap: PROGRESS_STROKE_LINECAP.ROUND,
    strokeColor: PROGRESS_COLORS.GREEN,
    showLabel: false,
    description: '',
  };

  render(): React.ReactNode {
    const { showLabel, description, amount, percent, type, status, strokeColor, strokeLinecap } = this.props;
    return (
      <div className="progress-bar-container" data-testid="progress-bar-container">
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
