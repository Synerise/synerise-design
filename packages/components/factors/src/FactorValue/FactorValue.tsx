import React from 'react';

import { type FactorValueProps } from '../Factors.types';
import * as S from './FactorValue.style';

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
  relativeDateProps,
  arrayProps,
  factorValueExtraProps,
}: FactorValueProps) => {
  const inputType = React.useMemo(() => {
    if (!selectedFactor) {
      return undefined;
    }
    const FactorValueComponent = selectedFactor.component;

    return (
      <FactorValueComponent
        key={`${factorKey}-${selectedFactor.name}`}
        value={value}
        // placeholder={texts.valuePlaceholder}
        onChange={onChangeValue}
        textType={textType}
        factorType={selectedFactorType}
        autocompleteText={autocompleteText}
        parameters={
          ['parameter', 'contextParameter'].indexOf(selectedFactorType) >= 0
            ? parameters
            : undefined
        }
        withoutTypeSelector={withoutTypeSelector}
        texts={texts}
        arrayProps={arrayProps}
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
        inputProps={inputProps}
        factorValueExtraProps={factorValueExtraProps}
        {...relativeDateProps}
      />
    );
  }, [
    selectedFactor,
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
    arrayProps,
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
    relativeDateProps,
    factorValueExtraProps,
  ]);
  return (
    <S.FactorInput
      inputType={selectedFactorType}
      inputTextType={textType}
      withoutTypeSelector={withoutTypeSelector}
    >
      {inputType}
    </S.FactorInput>
  );
};

export default FactorValue;
