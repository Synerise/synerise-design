import * as React from 'react';
import FileIcon from '@synerise/ds-icon/dist/icons/file-m.svg';
import CardTab from './CardTab/CardTab';

export type CardTabsProps = {};
const CardTabs: React.FC<CardTabsProps> = props => {
  return (
    <>
      <CardTab active tabIndex={-1} title="Label" variant="A" />
      <CardTab active tabIndex={-1} title="Label" draggable />
      <CardTab active tabIndex={-1} title="Label" icon={<FileIcon />} />
      <CardTab active tabIndex={-1} title="Label" variant="B" onChangeName={(): void => {}} />
      <CardTab active tabIndex={-1} title="Label" variant="C" onDuplicateTab={(): void => {}} />
      <CardTab active tabIndex={-1} title="Label" variant="D" onRemoveTab={(): void => {}} />
      <CardTab
        active
        tabIndex={-1}
        title="Label"
        variant="E"
        onChangeName={(): void => {}}
        onDuplicateTab={(): void => {}}
        onRemoveTab={(): void => {}}
      />
    </>
  );
};
export default CardTabs;
