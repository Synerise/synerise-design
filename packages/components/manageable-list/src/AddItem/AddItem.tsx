import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import Add1M from '@synerise/ds-icon/dist/icons/Add1M';
import * as S from './AddItem.styles';

type AddItemProps = {
  onItemAdd: () => void;
  addItemLabel: string;
  disabled: boolean;
};

const AddItem: React.FC<AddItemProps> = ({ disabled, onItemAdd, addItemLabel }) => {
  return (
    <S.AddContentButtonWrapper>
      <Button onClick={onItemAdd} type="dashed" size="large" disabled={disabled}>
        <Icon size={24} component={<Add1M />} />
        {addItemLabel}
      </Button>
    </S.AddContentButtonWrapper>
  );
};

export default AddItem;
