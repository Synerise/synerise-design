import React, { useMemo } from 'react';

import {
  BookM,
  Calendar2M,
  CalendarSwitchM,
  DynamicKeyM,
  FormulaM,
  HashM,
  ListM,
  ShowM,
  TextM,
} from '@synerise/ds-icon';
import { NOOP } from '@synerise/ds-utils';

import FactorTypeSelector from './FactorTypeSelector/FactorTypeSelector';
import { Array } from './FactorValue/Array/Array';
import DateInput from './FactorValue/Date/Date';
import DateRangeInput from './FactorValue/DateRange/DateRange';
import DynamicKey from './FactorValue/DynamicKey/DynamicKey';
import FactorValue from './FactorValue/FactorValue';
import FormulaInput from './FactorValue/Formula/Formula';
import NumberInput from './FactorValue/Number/NumberInput';
import ParameterInput from './FactorValue/Parameter/Parameter';
import RelativeDateInput from './FactorValue/RelativeDate/RelativeDate';
import TextInput from './FactorValue/Text/Text';
import {
  type DefinedFactorTypes,
  type FactorsProps,
  type MergedFactorTypeMapping,
  type SelectedFactorType,
} from './Factors.types';
import { useTexts } from './hooks/useTexts';
import * as S from './style/Factors.style';

export const DEFAULT_FACTOR_TYPE: DefinedFactorTypes = 'text';

export const FACTOR_TYPE_MAPPING: Record<
  DefinedFactorTypes,
  SelectedFactorType
> = {
  text: {
    icon: <TextM />,
    name: 'Text',
    component: TextInput,
  },
  number: {
    icon: <HashM />,
    name: 'Number',
    component: NumberInput,
  },
  parameter: {
    icon: <BookM />,
    name: 'Parameter',
    component: ParameterInput,
  },
  contextParameter: {
    icon: <ShowM />,
    name: 'Context parameter',
    component: ParameterInput,
  },
  dynamicKey: {
    icon: <DynamicKeyM />,
    name: 'Dynamic key',
    component: DynamicKey,
  },
  formula: {
    icon: <FormulaM />,
    name: 'Formula',
    component: FormulaInput,
  },
  array: {
    icon: <ListM />,
    name: 'Array',
    component: Array,
  },
  date: {
    icon: <Calendar2M />,
    name: 'Date',
    component: DateInput,
  },
  relativeDate: {
    icon: <CalendarSwitchM />,
    name: 'Relative date',
    component: RelativeDateInput,
  },
  dateRange: {
    icon: <Calendar2M />,
    name: 'Date range',
    component: DateRangeInput,
  },
};

const isDefinedFactorType = (type: string): type is DefinedFactorTypes => {
  return (
    (FACTOR_TYPE_MAPPING as Record<string, SelectedFactorType>)[type] !==
    undefined
  );
};

const Factors = ({
  selectedFactorType,
  setSelectedFactorType = NOOP,
  onChangeValue,
  onParamsClick,
  value,
  defaultFactorType = 'text',
  textType = 'default',
  unavailableFactorTypes,
  availableFactorTypes,
  parameters,
  autocompleteText,
  allowClear = true,
  withoutTypeSelector = false,
  texts,
  formulaEditor,
  opened,
  loading,
  factorKey,
  preventAutoloadData,
  onActivate,
  onDeactivate,
  getPopupContainerOverride,
  customFactorValueComponents,
  error,
  inputProps,
  arrayProps,
  readOnly,
  factorValueExtraProps,
  getMenuEntryProps,
}: FactorsProps) => {
  const allTexts = useTexts(texts);
  const factorType = useMemo(() => {
    return selectedFactorType || defaultFactorType;
  }, [selectedFactorType, defaultFactorType]);

  const mergedFactorData = useMemo(() => {
    return (
      Object.entries(FACTOR_TYPE_MAPPING) as [
        DefinedFactorTypes,
        SelectedFactorType,
      ][]
    )
      .map(([type, factorTypeData]) => {
        const mergedData = customFactorValueComponents
          ? { ...factorTypeData, ...customFactorValueComponents[type] }
          : factorTypeData;
        const dataTuple: [DefinedFactorTypes, SelectedFactorType] = [
          type,
          { ...factorTypeData, ...mergedData },
        ];
        return dataTuple;
      })
      .reduce((result, [type, factorTypeData]) => {
        result[type] = factorTypeData;
        return result;
      }, {} as MergedFactorTypeMapping);
  }, [customFactorValueComponents]);

  const selectedFactorData = useMemo(() => {
    return mergedFactorData[
      isDefinedFactorType(factorType) ? factorType : DEFAULT_FACTOR_TYPE
    ];
  }, [mergedFactorData, factorType]);

  return (
    <S.Group
      resetMargin
      compact
      withoutTypeSelector={withoutTypeSelector}
      className={`ds-factors ds-factors-${factorType}`}
    >
      {selectedFactorData && !withoutTypeSelector && setSelectedFactorType && (
        <FactorTypeSelector
          texts={allTexts.factorTypes}
          factorTypeMapping={mergedFactorData}
          selectedFactorType={factorType}
          setSelectedFactorType={setSelectedFactorType}
          selectedFactor={selectedFactorData}
          availableFactorTypes={availableFactorTypes}
          unavailableFactorTypes={unavailableFactorTypes}
          readOnly={readOnly}
        />
      )}
      <FactorValue
        value={value}
        onChangeValue={onChangeValue}
        onParamsClick={onParamsClick}
        selectedFactor={selectedFactorData}
        selectedFactorType={factorType}
        textType={textType}
        parameters={parameters}
        autocompleteText={autocompleteText}
        withoutTypeSelector={withoutTypeSelector}
        formulaEditor={formulaEditor}
        texts={allTexts}
        opened={opened}
        inputProps={inputProps}
        arrayProps={arrayProps}
        loading={loading}
        factorKey={factorKey}
        preventAutoloadData={preventAutoloadData}
        getPopupContainerOverride={getPopupContainerOverride}
        onActivate={onActivate}
        onDeactivate={onDeactivate}
        error={error}
        allowClear={allowClear}
        readOnly={readOnly}
        getMenuEntryProps={getMenuEntryProps}
        factorValueExtraProps={factorValueExtraProps}
      />
    </S.Group>
  );
};

export default Factors;
