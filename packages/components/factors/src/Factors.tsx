import React, { useMemo } from 'react';

import { BookM, Calendar2M, DynamicKeyM, FormulaM, HashM, ListM, ShowM, TextM } from '@synerise/ds-icon';

import * as S from './style/Factors.style';
import { DefinedFactorTypes, FactorsProps, SelectedFactorType } from './Factors.types';
import FactorTypeSelector from './FactorTypeSelector/FactorTypeSelector';
import FactorValue from './FactorValue/FactorValue';
import DynamicKey from './FactorValue/DynamicKey/DynamicKey';
import DateInput from './FactorValue/Date/Date';
import FormulaInput from './FactorValue/Formula/Formula';
import TextInput from './FactorValue/Text/Text';
import ParameterInput from './FactorValue/Parameter/Parameter';
import NumberInput from './FactorValue/Number/NumberInput';
import DateRangeInput from './FactorValue/DateRange/DateRange';
import { useTexts } from './hooks/useTexts';

export const factorTypes: Record<DefinedFactorTypes, SelectedFactorType> = {
  text: {
    icon: <TextM />,
    name: 'Text',
    input: TextInput,
  },
  number: {
    icon: <HashM />,
    name: 'Number',
    input: NumberInput,
  },
  parameter: {
    icon: <BookM />,
    name: 'Parameter',
    input: ParameterInput,
  },
  contextParameter: {
    icon: <ShowM />,
    name: 'Context parameter',
    input: ParameterInput,
  },
  dynamicKey: {
    icon: <DynamicKeyM />,
    name: 'Dynamic key',
    input: DynamicKey,
  },
  formula: {
    icon: <FormulaM />,
    name: 'Formula',
    input: FormulaInput,
  },
  array: {
    icon: <ListM />,
    name: 'Array',
    input: TextInput,
  },
  date: {
    icon: <Calendar2M />,
    name: 'Date',
    input: DateInput,
  },
  dateRange: {
    icon: <Calendar2M />,
    name: 'Date range',
    input: DateRangeInput,
  },
};
// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};

const Factors = ({
  selectedFactorType,
  setSelectedFactorType = NOOP,
  onChangeValue,
  onParamsClick,
  value,
  defaultFactorType = 'text',
  textType = 'Default',
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
  error,
  inputProps,
  readOnly,
  getMenuEntryProps,
}: FactorsProps) => {
  const allTexts = useTexts(texts);

  const factorType = useMemo(() => {
    return selectedFactorType || defaultFactorType;
  }, [selectedFactorType, defaultFactorType]);

  const selectedFactor = useMemo(() => {
    return factorTypes[factorType];
  }, [factorType]);

  return (
    <S.Group
      resetMargin
      compact
      withoutTypeSelector={withoutTypeSelector}
      className={`ds-factors ds-factors-${factorType}`}
    >
      {selectedFactor && !withoutTypeSelector && setSelectedFactorType && (
        <FactorTypeSelector
          texts={allTexts.factorTypes}
          selectedFactorType={factorType}
          setSelectedFactorType={setSelectedFactorType}
          selectedFactor={selectedFactor}
          availableFactorTypes={availableFactorTypes}
          unavailableFactorTypes={unavailableFactorTypes}
          readOnly={readOnly}
        />
      )}
      <FactorValue
        value={value}
        onChangeValue={onChangeValue}
        onParamsClick={onParamsClick}
        selectedFactor={selectedFactor}
        selectedFactorType={factorType}
        textType={textType}
        parameters={parameters}
        autocompleteText={autocompleteText}
        withoutTypeSelector={withoutTypeSelector}
        formulaEditor={formulaEditor}
        texts={allTexts}
        opened={opened}
        inputProps={inputProps}
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
      />
    </S.Group>
  );
};

export default Factors;
