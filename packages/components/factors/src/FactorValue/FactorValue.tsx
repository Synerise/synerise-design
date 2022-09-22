import * as React from 'react';
import * as S from './FactorValue.style';
import { FactorValueProps } from '../Factors.types';

const FactorValue: React.FC<FactorValueProps> = ({
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
  autoResize,
}) => {
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
        autoResize={autoResize}
        formulaEditor={formulaEditor}
        opened={opened}
        loading={loading}
        onParamsClick={onParamsClick}
        preventAutoloadData={preventAutoloadData}
        getPopupContainerOverride={getPopupContainerOverride}
        onActivate={onActivate}
        onDeactivate={onDeactivate}
        error={error}
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
    formulaEditor,
    opened,
    loading,
    onParamsClick,
    preventAutoloadData,
    getPopupContainerOverride,
    onActivate,
    onDeactivate,
    error,
  ]);

  return <S.FactorInput withoutTypeSelector={withoutTypeSelector}>{inputType}</S.FactorInput>;
};

export default FactorValue;
