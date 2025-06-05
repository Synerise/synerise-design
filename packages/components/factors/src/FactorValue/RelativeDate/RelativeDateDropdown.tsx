import React, { useEffect, useMemo, useState } from 'react';
import Button from '@synerise/ds-button';
import { InputGroup } from '@synerise/ds-input';
import Select from '@synerise/ds-select/dist/Select';
import InputNumber from '@synerise/ds-input-number';

import {
  RelativeDateFactorTexts,
  RelativeDateUnit,
  RelativeDateValueType,
  RelativeTimeRelation,
} from '../../Factors.types';
import { AFTER, BEFORE, DEFAULT_VALUE, INTERVALS, TIME_RELATIONS } from './RelativeDate.const';
import * as S from './RelativeDateDropdown.styles';
import { getTranslation } from './RelativeDate.utils';

type RelativeDateDropdownProps = {
  value?: RelativeDateValueType;
  texts: RelativeDateFactorTexts;
  onApply: (value: RelativeDateValueType) => void;
  onCancel: () => void;
  availableUnits?: RelativeDateUnit[];
};

const getRelationForModifier = (value: number) => {
  return value < 0 ? BEFORE : AFTER;
};

export const RelativeDateDropdown = ({
  onApply,
  onCancel,
  value: relativeDateValue,
  texts,
  availableUnits,
}: RelativeDateDropdownProps) => {
  const defaultTimeRelation = relativeDateValue ? getRelationForModifier(relativeDateValue.temporalModifier) : BEFORE;
  const defaultTemporalUnit =
    relativeDateValue?.temporalUnit || (availableUnits?.length ? availableUnits : INTERVALS)[0];
  const defaultModifier = Math.abs(relativeDateValue?.temporalModifier || DEFAULT_VALUE);

  const [timeRelation, setTimeRelation] = useState(defaultTimeRelation);
  const [temporalUnit, setTemporalUnit] = useState(defaultTemporalUnit);
  const [temporalModifier, setTemporalModifier] = useState<number>(defaultModifier);

  useEffect(() => {
    setTimeRelation(relativeDateValue ? getRelationForModifier(relativeDateValue.temporalModifier) : BEFORE);
    setTemporalUnit(relativeDateValue?.temporalUnit || INTERVALS[0]);
    setTemporalModifier(Math.abs(relativeDateValue?.temporalModifier || DEFAULT_VALUE));
  }, [relativeDateValue]);

  const isApplyEnabled = temporalModifier && temporalUnit !== undefined;

  const handleApply = () => {
    const finalModifier = timeRelation === BEFORE ? -temporalModifier : temporalModifier;
    isApplyEnabled && onApply({ temporalModifier: finalModifier, temporalUnit });
  };

  const temporalUnitOptions = useMemo(() => {
    return (availableUnits?.length ? availableUnits : INTERVALS).map(intervalOption => (
      <Select.Option key={intervalOption} value={intervalOption}>
        {getTranslation(texts, intervalOption)}
      </Select.Option>
    ));
  }, [texts, availableUnits]);

  const timeRelationOptions = useMemo(() => {
    return TIME_RELATIONS.map(option => (
      <Select.Option key={option} value={option}>
        {getTranslation(texts, option)}
      </Select.Option>
    ));
  }, [texts]);

  return (
    <>
      <S.RelativeDateDropdownWrapper data-testid="ds-factors-relative-date-dropdown">
        <InputGroup resetMargin compact>
          <InputNumber
            data-testid="ds-factors-relative-date-modifier"
            defaultValue={1}
            min={1}
            raw
            value={temporalModifier}
            onChange={newTemporalModifier => newTemporalModifier && setTemporalModifier(newTemporalModifier)}
          />
          <Select
            value={temporalUnit}
            data-testid="ds-factors-relative-date-unit"
            defaultValue={defaultTemporalUnit}
            onChange={newTemporalUnit => {
              setTemporalUnit(newTemporalUnit as RelativeDateUnit);
            }}
            dropdownMatchSelectWidth={false}
          >
            {temporalUnitOptions}
          </Select>
        </InputGroup>
        <Select
          value={timeRelation}
          data-testid="ds-factors-relative-date-relation"
          defaultValue={defaultTimeRelation}
          onChange={newTimeRelation => {
            setTimeRelation(newTimeRelation as RelativeTimeRelation);
          }}
          dropdownMatchSelectWidth={false}
        >
          {timeRelationOptions}
        </Select>
        <S.RelativeDateCurrentLabel>{texts.currentDatetime}</S.RelativeDateCurrentLabel>
      </S.RelativeDateDropdownWrapper>
      <S.RelativeDateDropdownFooter>
        <Button type="ghost" onClick={onCancel}>
          {texts.cancel}
        </Button>
        <Button type="primary" onClick={handleApply} disabled={!isApplyEnabled}>
          {texts.apply}
        </Button>
      </S.RelativeDateDropdownFooter>
    </>
  );
};
