import * as React from 'react';
import * as S from './FactorValue.style';
import { FactorValueProps } from '../Factors.types';

const FactorValue: React.FC<FactorValueProps> = ({
  selectedFactorType,
  value,
  onChangeValue,
  selectedFactor,
  expansibleText,
  parameters,
  autocompleteText,
  withoutTypeSelector = false,
  texts,
}) => {
  const inputType = React.useMemo(() => {
    const InputComponent = selectedFactor.input;

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      <InputComponent
        value={value}
        placeholder={texts.valuePlaceholder}
        onChange={onChangeValue}
        expansibleText={selectedFactorType === 'text' && expansibleText}
        autocompleteText={selectedFactorType === 'text' && autocompleteText}
        parameters={['parameter', 'contextParameter'].indexOf(selectedFactorType) >= 0 && parameters}
        withoutTypeSelector={withoutTypeSelector}
        texts={texts}
      />
    );
  }, [
    selectedFactorType,
    value,
    onChangeValue,
    selectedFactor,
    autocompleteText,
    expansibleText,
    parameters,
    withoutTypeSelector,
    texts,
  ]);

  return <S.FactorInput withoutTypeSelector={withoutTypeSelector}>{inputType}</S.FactorInput>;
};

export default FactorValue;
