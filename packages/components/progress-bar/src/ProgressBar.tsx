import * as React from 'react';
import * as S from './ProgressBar.styles';

interface ProgressBarValue {
  amount: number;
  color?: PROGRESS_BAR_COLORS;
}

interface Props {
  values: ProgressBarValue[];
  showLabel: boolean;
  total?: number;
  description?: string;
}

export enum PROGRESS_BAR_COLORS {
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

const ONE_HOUNDRED = 100;

class ProgressBar extends React.PureComponent<Props> {
  static defaultProps = {
    total: ONE_HOUNDRED,
    showLabel: false,
  };

  getMaxValue(): number {
    const { values } = this.props;
    const orderedByAmount = [...values].sort((a, b) => b.amount - a.amount);
    return orderedByAmount[0].amount;
  }

  getSumOfValues(): number {
    const { values } = this.props;
    return values.map(value => value.amount).reduce((sum, current) => sum + current, 0);
  }

  getTotal(): number {
    const { total } = this.props;
    return this.getSumOfValues() <= total ? total : this.getSumOfValues();
  }

  getMaxValuePercent(): string {
    return `${((this.getMaxValue() / this.getTotal()) * ONE_HOUNDRED).toFixed(2)}%`;
  }

  calcPercent(amount: number): number {
    return (amount / this.getTotal()) * ONE_HOUNDRED;
  }

  isFullFilled(): boolean {
    return this.getTotal() === this.getSumOfValues();
  }

  render() {
    const { showLabel, description, values } = this.props;
    return (
      <S.ProgressBarContainer data-testid="progress-bar-container">
        {showLabel && (
          <span data-testid="progress-bar-label">
            <strong data-testid="progress-bar-max-value">{this.getMaxValue()}</strong>
            <span data-testid="progress-bar-max-percent">{` (${this.getMaxValuePercent()})`}</span>
          </span>
        )}
        <S.ProgressBar fullFilled={this.isFullFilled()} data-testid="progress-bar">
          {values.map(value => (
            <S.ValueBar
              data-testid="progress-bar-value"
              key={`progress-bar-${value.amount}`}
              percent={this.calcPercent(value.amount)}
              color={value.color ? value.color : PROGRESS_BAR_COLORS.GREEN}
            />
          ))}
        </S.ProgressBar>
        {description && <span data-testid="progress-bar-description">{description}</span>}
      </S.ProgressBarContainer>
    );
  }
}

export default ProgressBar;
