import React from 'react';

import Button from '@synerise/ds-button';

import * as S from './AddItem.styles';
import { type AddItemProps } from './AddItem.types';

const AddItemComponent = ({
  disabled,
  onItemAdd,
  addItemLabel,
}: AddItemProps) => {
  return (
    <S.AddContentButtonWrapper data-testid="add-item-button">
      <Button.Creator
        onClick={onItemAdd}
        block
        label={addItemLabel}
        disabled={disabled}
      />
    </S.AddContentButtonWrapper>
  );
};

const AddItem = Object.assign(AddItemComponent, {
  AddContentButtonWrapper: S.AddContentButtonWrapper,
});

export default AddItem;
