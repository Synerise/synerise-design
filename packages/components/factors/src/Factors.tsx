import * as React from 'react';
import { useIntl } from 'react-intl';
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
// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};

const Factors: React.FC<FactorsProps> = ({
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
  withoutTypeSelector = false,
  texts,
  formulaEditor,
  opened,
  loading,
}) => {
  const { formatMessage } = useIntl();
  const text = React.useMemo(
    () => ({
      datePicker: {
        apply: formatMessage({ id: 'DS.FACTORS.DATE_PICKER.APPLY', defaultMessage: 'Apply' }),
        clearTooltip: formatMessage({ id: 'DS.FACTORS.DATE_PICKER.CLEAR_TOOLTIP', defaultMessage: 'Clear' }),
        inputPlaceholder: formatMessage({
          id: 'DS.FACTORS.DATE_PICKER.INPUT_PLACEHOLDER',
          defaultMessage: 'Select date',
        }),
        now: formatMessage({ id: 'DS.FACTORS.DATE_PICKER.NOW', defaultMessage: 'Now' }),
      },
      dynamicKey: {
        keyPlaceholder: formatMessage({ id: 'DS.FACTORS.DYNAMIC_KEY.KEY_PLACEHOLDER', defaultMessage: 'Key' }),
        valuePlaceholder: formatMessage({ id: 'DS.FACTORS.DYNAMIC_KEY.VALUE_PLACEHOLDER', defaultMessage: 'Value' }),
      },
      formula: {
        buttonPlaceholder: formatMessage({ id: 'DS.FACTORS.FORMULA.BUTTON_PLACEHOLDER', defaultMessage: 'Formula' }),
        defaultName: formatMessage({ id: 'DS.FACTORS.FORMULA.DEFAULT_NAME', defaultMessage: 'Formula' }),
      },
      parameter: {
        searchPlaceholder: formatMessage({ id: 'DS.FACTORS.PARAMETER.SEARCH_PLACEHOLDER', defaultMessage: 'Search' }),
        noResults: formatMessage({ id: 'DS.FACTORS.PARAMETER.NO_RESULTS', defaultMessage: 'No results' }),
        loadingParameter: formatMessage({
          id: 'DS.FACTORS.PARAMETER.LOADING_PARAMETERS',
          defaultMessage: 'Loading parameters',
        }),
      },
      valuePlaceholder: formatMessage({ id: 'DS.FACTORS.VALUE_PLACEHOLDER', defaultMessage: 'Value' }),
      modalApply: formatMessage({ id: 'DS.FACTORS.MODAL_APPLY', defaultMessage: 'Apply' }),
      modalCancel: formatMessage({ id: 'DS.FACTORS.MODAL_CANCEL', defaultMessage: 'Cancel' }),
      modalTitle: formatMessage({ id: 'DS.FACTORS.MODAL_TITLE', defaultMessage: 'Value' }),
      ...texts,
    }),
    [texts, formatMessage]
  );

  const factorType = React.useMemo(() => {
    return selectedFactorType || defaultFactorType;
  }, [selectedFactorType, defaultFactorType]);

  const selectedFactor = React.useMemo(() => {
    return factorTypes[factorType];
  }, [factorType]);

  return (
    <S.Group
      resetMargin
      compact
      withoutTypeSelector={withoutTypeSelector}
      className={`ds-factors ds-factors-${factorType}`}
    >
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
        onParamsClick={onParamsClick}
        selectedFactor={selectedFactor}
        selectedFactorType={factorType}
        textType={textType}
        parameters={parameters}
        autocompleteText={autocompleteText}
        withoutTypeSelector={withoutTypeSelector}
        formulaEditor={formulaEditor}
        texts={text}
        opened={opened}
        loading={loading}
      />
    </S.Group>
  );
};
export default Factors;
