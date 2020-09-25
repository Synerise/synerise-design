import * as React from 'react';
import { BookM, Calendar2M, DynamicKeyM, FormulaM, HashM, ListM, ShowM, TextM } from '@synerise/ds-icon/dist/icons';
import InputNumber from '@synerise/ds-input-number';
import * as S from './style/Factors.style';
import { FactorsProps } from './Factors.types';
import FactorTypeSelector from './FactorTypeSelector/FactorTypeSelector';
import FactorValue from './FactorValue/FactorValue';
import DynamicKey from './FactorValue/DynamicKey/DynamicKey';
import DateInput from './FactorValue/Date/Date';
import FormulaInput from './FactorValue/Formula/Formula';
import TextInput from './FactorValue/Text/Text';
import ParameterInput from './FactorValue/Parameter/Parameter';

export const factorTypes = {
  text: {
    icon: <TextM />,
    name: 'Text',
    input: TextInput,
  },
  number: {
    icon: <HashM />,
    name: 'Number',
    input: InputNumber,
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
};

const Factors: React.FC<FactorsProps> = ({
  selectedFactorType,
  setSelectedFactorType,
  onChangeValue,
  value,
  defaultFactorType = 'text',
  textType = 'Default',
  unavailableFactorTypes,
  availableFactorTypes,
  parameters,
  autocompleteText,
  withoutTypeSelector = false,
  texts,
  formulaEditor,
  opened,
}) => {
  const factorType = React.useMemo(() => {
    return selectedFactorType || defaultFactorType;
  }, [selectedFactorType, defaultFactorType]);

  const selectedFactor = React.useMemo(() => {
    return factorTypes[factorType];
  }, [factorType]);

  return (
    <S.Group resetMargin compact withoutTypeSelector={withoutTypeSelector} className={`ds-factors ds-factors-${factorType}`}>
      {!withoutTypeSelector && (
        <FactorTypeSelector
          selectedFactorType={factorType}
          setSelectedFactorType={setSelectedFactorType}
          selectedFactor={selectedFactor}
          availableFactorTypes={availableFactorTypes}
          unavailableFactorTypes={unavailableFactorTypes}
        />
      )}
      <FactorValue
        value={value}
        onChangeValue={onChangeValue}
        selectedFactor={selectedFactor}
        selectedFactorType={factorType}
        textType={textType}
        parameters={parameters}
        autocompleteText={autocompleteText}
        withoutTypeSelector={withoutTypeSelector}
        formulaEditor={formulaEditor}
        texts={texts}
        opened={opened}
      />
    </S.Group>
  );
};
export default Factors;
