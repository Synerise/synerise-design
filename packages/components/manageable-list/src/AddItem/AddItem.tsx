import * as React from 'react';
import Button from '@synerise/ds-button';

import * as S from './AddItem.styles';
import { AddItemProps } from './AddItem.types';


const AddItem: React.FC<AddItemProps> = ({ disabled, onItemAdd, addItemLabel }) => {
  return (
    <S.AddContentButtonWrapper data-testid="add-item-button">
      <Button.Creator onClick={onItemAdd} block label={addItemLabel} disabled={disabled} />
    </S.AddContentButtonWrapper>
  );
};

export default AddItem;
