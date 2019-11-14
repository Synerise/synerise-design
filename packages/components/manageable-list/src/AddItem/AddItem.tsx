import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import AddM from '@synerise/ds-icon/dist/icons/AddM';
import * as S from './AddItem.styles';

type AddItemProps = {
  onItemAdd: () => void;
  addItemLabel: string | React.ReactNode;
  disabled: boolean;
};

const AddItem: React.FC<AddItemProps> = ({ disabled, onItemAdd, addItemLabel }) => {
  return (
    <S.AddContentButtonWrapper data-testid="add-item-button">
      <Button onClick={onItemAdd} type="dashed" size="large" disabled={disabled}>
        <Icon size={24} component={<AddM />} />
        {addItemLabel}
      </Button>
    </S.AddContentButtonWrapper>
  );
};

export default AddItem;
