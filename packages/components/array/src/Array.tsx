import React, { useState } from 'react';

import { ArrayProps } from './Array.types';
import * as S from './Array.styles';
import { ArrayModal } from './ArrayModal/ArrayModal';
import { ArrayTrigger } from './ArrayTrigger/ArrayTrigger';
import { useTexts } from './useTexts';

export const Array = ({
  value = [],
  readOnly,
  disabled,
  open,
  onValueChange,
  texts,
  renderCustomTrigger,
  ...htmlAttributes
}: ArrayProps) => {
  //   const [localValue, setLocalValue] = useState(value);
  const [modalVisible, setModalVisible] = useState(open);

  const allTexts = useTexts(texts);

  const handleTriggerClick = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const trigger = renderCustomTrigger ? (
    renderCustomTrigger({
      value,
      readOnly,
      disabled,
      onClick: handleTriggerClick,
      texts: allTexts,
    })
  ) : (
    <ArrayTrigger texts={allTexts} value={value} onClick={handleTriggerClick} />
  );
  return (
    <>
      <S.ArrayWrapper {...htmlAttributes}>{trigger}</S.ArrayWrapper>
      <ArrayModal
        texts={allTexts}
        hideModal={hideModal}
        visible={modalVisible}
        value={value}
        onValueChange={onValueChange}
      />
    </>
  );
};
export default Array;
