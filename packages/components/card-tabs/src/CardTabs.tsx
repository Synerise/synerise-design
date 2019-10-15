import * as React from 'react';
import FileIcon from '@synerise/ds-icon/dist/icons/file-m.svg';
import CardTab from './CardTab/CardTab';
import AddButton from './AddButton/AddButton';

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

export type CardTabsProps = {};
const CardTabs: React.FC<CardTabsProps> = props => {
  return (
    <>
      <CardTab variant={VARIANTS[0]} tag tabIndex={-1} label="Label" disabled />
      <CardTab variant={VARIANTS[1]} tabIndex={-1} label="Label" draggable />
      <CardTab invalid variant={VARIANTS[2]} tabIndex={-1} label="Label" icon={<FileIcon />} />
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
    </>
  );
};
export default CardTabs;
