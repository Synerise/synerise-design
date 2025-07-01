import React from 'react';

import Button from '@synerise/ds-button';
import Divider from '@synerise/ds-divider';
import Icon, { Add3S } from '@synerise/ds-icon';

import * as S from './AddBlankItem.styles';
import { type AddBlankItemProps } from './AddBlankItem.types';

const AddBlankItem = ({
  disabled,
  onItemAdd,
  addItemLabel,
}: AddBlankItemProps) => {
  return (
    <S.AddContentButtonWrapper data-testid="add-item-button">
      <Divider dashed marginTop={8} />
      <Button
        type="ghost-primary"
        mode="icon-label"
        onClick={onItemAdd}
        disabled={disabled}
      >
        <Icon component={<Add3S />} />
        {addItemLabel}
      </Button>
    </S.AddContentButtonWrapper>
  );
};

export default AddBlankItem;
