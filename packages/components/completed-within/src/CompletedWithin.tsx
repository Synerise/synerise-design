import * as React from 'react';
import { ClockM, Close3S } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip';
import { useIntl } from 'react-intl';
import { CompletedWithinProps, Period } from './CompletedWithin.types';
import Settings from './Settings/Settings';
import * as S from './CompleteWithin.styles';

export const DEFAULT_PERIODS = ['INTERVAL', 'SECONDS', 'MINUTES', 'HOURS', 'DAYS', 'MONTHS', 'YEARS'];

const CompletedWithin: React.FC<CompletedWithinProps> = ({ value, onSetValue, texts, periods }) => {
  const intl = useIntl();

  const getPeriods = React.useMemo(() => {
    if (periods !== undefined && periods.length) {
      return periods;
    }
    return DEFAULT_PERIODS.map(period => ({
      value: period,
      label: intl.formatMessage({ id: `DS.COMPLETED-WITHIN.${period}`, defaultMessage: period }),
    }));
  }, [periods, intl]);

  const [innerValue, setInnerValue] = React.useState(value.value || 0);
  const [innerPeriod, setInnerPeriod] = React.useState<Period>(value.period || getPeriods[0].value);

  const handleVisibleChange = React.useCallback(
    (visible: boolean) => {
      if (!visible && innerValue > 0) {
        onSetValue({ value: innerValue, period: innerPeriod });
      }
    },
    [innerPeriod, innerValue, onSetValue]
  );

  const handleClear = React.useCallback(() => {
    setInnerPeriod(getPeriods[0].value);
    setInnerValue(0);
    onSetValue({ value: 0, period: getPeriods[0].value });
  }, [getPeriods, onSetValue]);

  const triggerMode = React.useMemo(() => {
    if (value.value === 0) return 'single-icon';
    return 'icon-label';
  }, [value]);

  const triggerLabel = React.useMemo(() => {
    return (
      value.value > 0 &&
      `${texts.completedLabel} ${value.value} ${
        getPeriods.find(singlePeriod => singlePeriod.value === value.period)?.label
      }`
    );
  }, [getPeriods, texts, value]);

  return (
    <S.CompletedWithinWrapper withValue={value.value > 0}>
      <Dropdown
        overlay={
          <Settings
            value={{ value: innerValue, period: innerPeriod }}
            onValueChange={setInnerValue}
            onPeriodChange={setInnerPeriod}
            texts={texts}
            periods={getPeriods}
          />
        }
        trigger={['click']}
        onVisibleChange={handleVisibleChange}
        placement="topLeft"
      >
        <S.TriggerButton className="ds-completed-within" type="tertiary" mode={triggerMode}>
          <Icon component={<ClockM />} />
          {triggerLabel}
        </S.TriggerButton>
      </Dropdown>
      {value.value > 0 && (
        <Tooltip title={texts.clear}>
          <S.ClearButton mode="single-icon" type="ghost" onClick={handleClear} data-testid="clear-button">
            <Icon component={<Close3S />} />
          </S.ClearButton>
        </Tooltip>
      )}
    </S.CompletedWithinWrapper>
  );
};
export default CompletedWithin;
