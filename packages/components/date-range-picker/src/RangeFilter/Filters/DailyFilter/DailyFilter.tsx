import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import * as S from './DailyFilter.styles';
import TimeWindow from '../../Shared/TimeWindow/TimeWindow';
import { RangeActions as RangeActionsMethods } from '../../Shared/TimeWindow/TimeWindow.types';
import { Days } from '../../../date.types';
import { WithTranslations } from '../../../DateRangePicker.types';
import { ValueSelectionModes } from '../../RangeFilter.types';

export interface Props extends WrappedComponentProps, Partial<RangeActionsMethods>, WithTranslations {
  value: string;
  onChange: (v: Days) => {};
  valueSelectionModes: ValueSelectionModes;
}

const DailyFilter: React.FC<Props> = props => {
  const handleChange = (value: Days): void => {
    const { onChange } = props;
    onChange && onChange(value[0] as Days);
  };
  const { value, intl, onRangeCopy, onRangePaste, onRangeClear, texts, valueSelectionModes } = props;
  return (
    <S.DailyFilterWrapper>
      <TimeWindow
        texts={texts}
        hideHeader
        numberOfDays={0}
        customDays={{
          0: { label: intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.EVERY_DAY', defaultMessage: 'Every day' }) },
        }}
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
