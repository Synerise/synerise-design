import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import * as S from './DailyFilter.styles';
import TimeWindow from '../../Shared/TimeWindow/TimeWindow';
import { RangeActions as RangeActionsMethods } from '../../Shared/TimeWindow/TimeWindow.types';
import { Days } from '../../../date.types';
import { WithTranslations } from '../../../DateRangePicker.types';
import { ValueSelectionModes, WithDisabledProp } from '../../RangeFilter.types';

export interface Props extends WrappedComponentProps, Partial<RangeActionsMethods>, WithTranslations, WithDisabledProp {
  value: string;
  onChange: (v: Days) => {};
  valueSelectionModes: ValueSelectionModes;
}

const DailyFilter: React.FC<Props> = props => {
  const handleChange = (value: Days): void => {
    const { onChange } = props;
    onChange && onChange(value[0] as Days);
  };
  const { value, intl, onRangeCopy, onRangePaste, onRangeClear, texts, valueSelectionModes, disabled } = props;
  return (
    <S.DailyFilterWrapper>
      <TimeWindow
        disabled={disabled}
        texts={texts}
        hideHeader
        numberOfDays={0}
        customDays={{
          0: { label: intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.EVERY_DAY', defaultMessage: 'Every day' }) },
        }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-expect-error: Type 'string' is not assignable to type 'Days'.ts(2322)
        days={value[0] ? value[0] : value}
        onChange={(val: Days): void => {
          handleChange(val);
        }}
        daily
        onRangePaste={onRangePaste}
        onRangeCopy={onRangeCopy}
        onRangeClear={onRangeClear}
        valueSelectionModes={valueSelectionModes}
      />{' '}
    </S.DailyFilterWrapper>
  );
};

export default injectIntl(DailyFilter);
