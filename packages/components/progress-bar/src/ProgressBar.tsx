import * as React from 'react';
import * as S from './ProgressBar.styles';

interface Value {
  amount: number;
  color?: COLORS;
}

interface Props {
  values: Value[];
  showLabel: boolean;
  total?: number;
  description?: string;
}

export enum COLORS {
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

const PERCENT = 100;

class ProgressBar extends React.PureComponent<Props> {
  static defaultProps = {
    total: PERCENT,
  };

  getMaxValue(): number {
    const { values } = this.props;
    const orderedByAmount = [...values].sort((a, b) => (a.amount <= b.amount ? 1 : -1));
    return orderedByAmount[0].amount;
  }

  getMaxValuePercent(): string {
    const { total } = this.props;
    return `${((this.getMaxValue() / total) * PERCENT).toFixed(2)}%`;
  }

  calcPercent(amount: number): number {
    const { total } = this.props;
    return (amount / total) * 100;
  }

  isFullFilled(): boolean {
    const { total, values } = this.props;
    let sum = 0;
    values.forEach((v: Value) => {
      sum += v.amount;
    });
    return total === sum;
  }

  render() {
    const { showLabel, description, values } = this.props;
    return (
      <S.ProgressBarContainer>
        {showLabel && (
          <span>
            <strong>{this.getMaxValue()}</strong>
            <span>{` (${this.getMaxValuePercent()})`}</span>
          </span>
        )}
        <S.ProgressBar fullFilled={this.isFullFilled()}>
          {values.map((value, index) => (
            <S.ValueBar
              key={`progress-bar-${value.amount}`}
              percent={this.calcPercent(value.amount)}
              color={value.color ? value.color : COLORS.GREEN}
            />
          ))}
        </S.ProgressBar>
        {description && <span>{description}</span>}
      </S.ProgressBarContainer>
    );
  }
}

export default ProgressBar;
