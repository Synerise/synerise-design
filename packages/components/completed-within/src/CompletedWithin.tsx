import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import Icon, { ClockM, Close3S } from '@synerise/ds-icon';

import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip';
import Settings from './Settings/Settings';
import { CompletedWithinProps, Period } from './CompletedWithin.types';
import * as S from './CompleteWithin.styles';

export const DEFAULT_PERIODS = ['SECONDS', 'MINUTES', 'HOURS', 'DAYS', 'MONTHS', 'YEARS'];

const CompletedWithin = ({
  value,
  maxValue,
  onSetValue,
  text,
  periods,
  placeholder,
  tooltip,
  readOnly,
}: CompletedWithinProps) => {
  const intl = useIntl();

  const texts = useMemo(
    () => ({
      header: intl.formatMessage({ id: 'DS.COMPLETED-WITHIN.HEADER', defaultMessage: 'Completed within' }),
      completedLabel: intl.formatMessage({
        id: 'DS.COMPLETED-WITHIN.COMPLETED-WIHITN',
        defaultMessage: 'Completed within',
      }),
      clear: intl.formatMessage({ id: 'DS.COMPLETED-WITHIN.CLEAR', defaultMessage: 'Clear' }),
      periodPlaceholder: intl.formatMessage({
        id: 'DS.COMPLETED-WITHIN.PERIOD-PLACEHOLDER',
        defaultMessage: 'Interval',
      }),
      ...text,
    }),
    [text, intl]
  );

  const getPeriods = useMemo(() => {
    if (periods !== undefined && periods.length) {
      return periods;
    }
    return DEFAULT_PERIODS.map(period => ({
      value: period,
      label: intl.formatMessage({ id: `DS.COMPLETED-WITHIN.${period}`, defaultMessage: period }),
    }));
  }, [periods, intl]);

  const [innerValue, setInnerValue] = useState<string | number | undefined | null>(value.value);
  const [innerPeriod, setInnerPeriod] = useState<Period>(value.period);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const hasValue = useMemo(() => value.value !== undefined && value.value > 0, [value]);

  const handleVisibleChange = useCallback(
    (visible: boolean) => {
      setSettingsVisible(visible);
      setTooltipVisible(false);
      if (!visible && innerValue && innerPeriod) {
        const newValue = maxValue && maxValue < Number(innerValue) ? maxValue : innerValue;
        onSetValue({
          value: Number(newValue),
          period: innerPeriod,
        });
      }
    },
    [innerPeriod, innerValue, maxValue, onSetValue]
  );

  const handleClear = useCallback(() => {
    setInnerPeriod(undefined);
    setInnerValue(undefined);
    onSetValue({ value: undefined, period: undefined });
  }, [onSetValue]);

  const triggerMode = useMemo(() => {
    if (hasValue || placeholder) return 'icon-label';
    return 'single-icon';
  }, [hasValue, placeholder]);

  const triggerLabel = useMemo(() => {
    return hasValue
      ? `${texts.completedLabel} ${value.value} ${
          getPeriods.find(singlePeriod => singlePeriod.value === value.period)?.label
        }`
      : placeholder;
  }, [getPeriods, hasValue, texts, value, placeholder]);

  const trigger = (
    <Tooltip
      type="largeSimple"
      description={tooltip}
      trigger={['hover']}
      onVisibleChange={setTooltipVisible}
      visible={!settingsVisible && tooltipVisible}
    >
      <S.TriggerButton
        data-testid="completed-within-trigger"
        readOnly={readOnly}
        className="ds-completed-within"
        type="tertiary"
        mode={triggerMode}
      >
        <Icon component={<ClockM />} />
        {triggerLabel}
      </S.TriggerButton>
    </Tooltip>
  );

  return (
    <S.CompletedWithinWrapper readOnly={readOnly} withValue={hasValue}>
      {readOnly ? (
        trigger
      ) : (
        <Dropdown
          overlay={
            <Settings
              value={{ value: innerValue !== undefined ? Number(innerValue) : undefined, period: innerPeriod }}
              maxValue={maxValue}
              onValueChange={setInnerValue}
              onPeriodChange={setInnerPeriod}
              text={texts}
              readOnly={readOnly}
              periods={getPeriods}
            />
          }
          trigger={['click']}
          onVisibleChange={handleVisibleChange}
          placement="topLeft"
          overlayStyle={{ maxWidth: '238px', minWidth: '238px' }}
        >
          {trigger}
        </Dropdown>
      )}
      {hasValue && !readOnly && (
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
