import React from 'react';
import * as S from './FactorValue.style';
import { FactorValueProps } from '../Factors.types';

const FactorValue = ({
  selectedFactorType,
  value,
  onChangeValue,
  onParamsClick,
  selectedFactor,
  textType,
  parameters,
  autocompleteText,
  withoutTypeSelector = false,
  texts,
  formulaEditor,
  opened,
  loading,
  factorKey,
  preventAutoloadData,
  getPopupContainerOverride,
  onActivate,
  onDeactivate,
  error,
  inputProps,
  allowClear,
  readOnly = false,
  getMenuEntryProps,
includeTimezoneOffset,
}: FactorValueProps) => {
  const inputType = React.useMemo(() => {
    const InputComponent: React.ElementType = selectedFactor.input;

    return (
      <InputComponent
        key={`${factorKey}-${selectedFactor.name}`}
        value={value}
        placeholder={texts.valuePlaceholder}
        onChange={onChangeValue}
        textType={textType}
        factorType={selectedFactorType}
        autocompleteText={autocompleteText}
        parameters={['parameter', 'contextParameter'].indexOf(selectedFactorType) >= 0 && parameters}
        withoutTypeSelector={withoutTypeSelector}
        texts={texts}
        inputProps={inputProps}
        formulaEditor={formulaEditor}
        opened={opened}
        loading={loading}
        onParamsClick={onParamsClick}
        preventAutoloadData={preventAutoloadData}
        getPopupContainerOverride={getPopupContainerOverride}
        onActivate={onActivate}
        onDeactivate={onDeactivate}
        error={error}
        allowClear={allowClear}
        readOnly={readOnly}
        getMenuEntryProps={getMenuEntryProps}
        includeTimezoneOffset={includeTimezoneOffset}
      />
    );
  }, [
    selectedFactor.input,
    selectedFactor.name,
    factorKey,
    value,
    texts,
    onChangeValue,
    textType,
    selectedFactorType,
    autocompleteText,
    parameters,
    withoutTypeSelector,
    inputProps,
    formulaEditor,
    opened,
    loading,
    onParamsClick,
    preventAutoloadData,
    getPopupContainerOverride,
    onActivate,
    onDeactivate,
    error,
    allowClear,
    readOnly,
    getMenuEntryProps,
    includeTimezoneOffset,
  ]);
  return (
    <S.FactorInput inputType={selectedFactorType} inputTextType={textType} withoutTypeSelector={withoutTypeSelector}>
      {inputType}
    </S.FactorInput>
  );
};

export default FactorValue;
