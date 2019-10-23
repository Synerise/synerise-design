import * as React from 'react';
import { Input } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';
import { Add3M } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
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

  const createItem = (): void => {
    onItemAdd({ name });
    toggleInput();
  };

  return (
    <S.AddItemLayout data-testid="add-item-button">
      <Button type="ghost" onClick={toggleInput} size="small">
        <Icon component={<Add3M />} size={24} />
        <S.AddItemLabel>{addItemLabel}</S.AddItemLabel>
      </Button>
      {active && (
        <Input
          autoFocus
          value={name}
          onBlur={handleClickOutside}
          onChange={handleNameChange}
          onPressEnter={createItem}
          data-testid="add-item-input"
        />
      )}
    </S.AddItemLayout>
  );
};

export default AddItem;
