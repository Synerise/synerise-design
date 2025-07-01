import React from 'react';
import { type WrappedComponentProps, injectIntl } from 'react-intl';

import { type WithTranslations } from '../../../DateRangePicker.types';
import { type Days } from '../../../date.types';
import {
  type ValueSelectionModes,
  type WithDisabledProp,
} from '../../RangeFilter.types';
import { RANGE_DISPLAY_MODES } from '../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.constants';
import { type RangeDisplayMode } from '../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import TimeWindow from '../../Shared/TimeWindow/TimeWindow';
import { type RangeActions as RangeActionsMethods } from '../../Shared/TimeWindow/TimeWindow.types';
import * as S from './DailyFilter.styles';

export interface Props
  extends WrappedComponentProps,
    Partial<RangeActionsMethods>,
    WithTranslations,
    WithDisabledProp {
  value: string;
  onChange: (v: Days) => void;
  rangeDisplayMode?: RangeDisplayMode;
  valueSelectionModes: ValueSelectionModes;
}

const DailyFilter = (props: Props) => {
  const handleChange = (value: Days): void => {
    const { onChange } = props;
    onChange && onChange(value[0] as Days);
  };
  const {
    value,
    onRangeCopy,
    onRangePaste,
    onRangeClear,
    texts,
    valueSelectionModes,
    disabled,
    rangeDisplayMode,
  } = props;
  const hideHeader = rangeDisplayMode !== RANGE_DISPLAY_MODES.SLIDER;
  const headerOptions =
    rangeDisplayMode === RANGE_DISPLAY_MODES.SLIDER
      ? {
          includeSummary: false,
          includeActions: false,
        }
      : undefined;
  return (
    <S.DailyFilterWrapper>
      <TimeWindow
        disabled={disabled}
        texts={texts}
        hideHeader={hideHeader}
        headerOptions={headerOptions}
        numberOfDays={0}
        customDays={{
          0: { label: texts.everyDay },
        }}
        // @ts-expect-error: Type 'string' is not assignable to type 'Days'.ts(2322)
        days={value[0] ? value[0] : value}
        onChange={(val: Days): void => {
          handleChange(val);
        }}
        daily
        onRangePaste={onRangePaste}
        onRangeCopy={onRangeCopy}
        onRangeClear={onRangeClear}
        rangeDisplayMode={rangeDisplayMode}
        valueSelectionModes={valueSelectionModes}
      />{' '}
    </S.DailyFilterWrapper>
  );
};

export default injectIntl(DailyFilter);
