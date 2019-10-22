import * as React from 'react';
import { Input } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';
import { Add3M } from '@synerise/ds-icon/dist/icons';
import * as S from './AddItem.styles';

type Props = {
  onItemAdd: (addParams: { name: string }) => void;
  addItemLabel: string;
};

const DEFAULT_NAME = '';

const AddItem: React.FC<Props> = ({ onItemAdd, addItemLabel }) => {
  const [active, setActive] = React.useState(false);
  const [name, setName] = React.useState(DEFAULT_NAME);

  const handleClickOutside = (): void => {
    setActive(false);
    setName(DEFAULT_NAME);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const toggleInput = (): void => {
    setActive(!active);
    setName(DEFAULT_NAME);
  };

  const createCatalog = (): void => {
    onItemAdd({ name });
    toggleInput();
  };

  return (
    <S.AddItemLayout>
      <S.AddItemButton onClick={toggleInput} data-testid="add-item-button">
        <Icon component={<Add3M />} size={24} color="#b5bdc3" />
        <S.AddItemLabel>{addItemLabel}</S.AddItemLabel>
      </S.AddItemButton>
      {active && (
        <Input
          autoFocus
          value={name}
          onBlur={handleClickOutside}
          onChange={handleNameChange}
          onPressEnter={createCatalog}
          data-testid="add-item-input"
        />
      )}
    </S.AddItemLayout>
  );
};

export default AddItem;
