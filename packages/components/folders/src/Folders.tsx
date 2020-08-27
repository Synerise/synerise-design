import * as React from 'react';
import Menu from '@synerise/ds-menu';
import Folder from './Elements/Folder/Folder';

export type FoldersProps = {};
const Folders: React.FC<FoldersProps> = props => {
  return (
    <Menu>
      <Folder name="Test" />
      <Folder name="Test" favourite/>
    </Menu>
  );
};
export default Folders;
