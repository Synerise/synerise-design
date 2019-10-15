import * as React from 'react';
import FileIcon from '@synerise/ds-icon/dist/icons/file-m.svg';
import Sortable from 'react-sortablejs';
import CardTab from './CardTab/CardTab';
import AddButton from './AddButton/AddButton';
import * as S from './CardTabs.styles';

const VARIANTS = [
  {
    tag: 'A',
    color: 'yellow-500',
  },
  {
    tag: 'B',
    color: 'green-500',
  },
  {
    tag: 'C',
    color: 'orange-500',
  },
  {
    tag: 'D',
    color: 'blue-500',
  },
];

export type CardTabsProps = {
  onChangeOrder: () => void;
  sortableTags: () => void;
};

const CardTabs: React.FC<CardTabsProps> = ({ onChangeOrder, sortableTags }) => {
  const handleOrderChange = (order, sortable, event): void => {
    console.log(order, sortable);
    onChangeOrder();
  };

  return (
    <S.CardTabsContainer>
      <Sortable className="ds-card-tags-sortable" onChange={handleOrderChange} options={{ disabled: !sortableTags }}>
        <CardTab variant={VARIANTS[0]} tag tabIndex={-1} label="Label" disabled />
        <CardTab variant={VARIANTS[1]} tabIndex={-1} label="Label" draggable />
        <CardTab invalid variant={VARIANTS[2]} tabIndex={-1} label="Label" prefixIcon={<FileIcon />} />
        <CardTab invalid active variant={VARIANTS[3]} tag tabIndex={-1} label="Label" onChangeName={(): void => {}} />
        <CardTab active variant={VARIANTS[0]} tag tabIndex={-1} label="Label" onDuplicateTab={(): void => {}} />
        <CardTab active variant={VARIANTS[1]} tag tabIndex={-1} label="Label" onRemoveTab={(): void => {}} />
        <CardTab
          tabIndex={-1}
          variant={VARIANTS[2]}
          tag
          label="Label"
          onChangeName={(): void => {}}
          onDuplicateTab={(): void => {}}
          onRemoveTab={(): void => {}}
        />
        <AddButton onClick={(): void => {}} />
      </Sortable>
    </S.CardTabsContainer>
  );
};
export default CardTabs;
