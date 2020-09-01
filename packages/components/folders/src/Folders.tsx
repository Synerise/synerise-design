import * as React from 'react';
import Menu from '@synerise/ds-menu';
import Folder from './Elements/Folder/Folder';
import AddButton from './Elements/AddButton/AddButton';
import './style/index.less';
import { FoldersProps } from './Folders.types';

const Folders: React.FC<FoldersProps> = ({ actionsDisplay, dataSource }: FoldersProps) => {
  return (
    <>
      <AddButton addItemLabel="Add folder" disabled={false} />
      <Menu>
        {dataSource.map(item => (
          <Folder
            key={`${item.id}-${item.name}`}
            name={item.name}
            actionsDisplay={actionsDisplay}
            favourite={!!item.favourite}
            onDelete={item.canDelete ? () => {} : undefined}
            onEdit={item.canUpdate ? () => {} : undefined}
            onFavourite={item.canDuplicate ? () => {} : undefined}
            onSettingsEnter={() => {}}
          />
        ))}
      </Menu>
    </>
  );
};
export default Folders;
