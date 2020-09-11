import * as React from 'react';
import { SidebarObjectProps } from './SidebarObject.types';
import Header from './Elements/Header/Header';
import Content from './Elements/Content/Content';
import ObjectSummary from './Elements/ObjectSummary/ObjectSummary';

const SidebarObject: React.FC<SidebarObjectProps> = ({
  avatar,
  name,
  headerPreffix,
  headerTabs,
  inputObject,
  contentTags,
  folders,
  onEdit,
  onDelete,
  onDuplicate,
  onMove,
  onId,
  parentFolder
}) => {
  return (
    <div>
      <Header
        avatar={avatar}
        name={name}
        preffix={headerPreffix}
        tabs={headerTabs}
        exampleFolders={folders}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onEdit={onEdit}
        onMove={onMove}
        onId={onId}
        parentFolder={parentFolder}
      />
      <Content description={<ObjectSummary inputObject={inputObject} />} tags={contentTags}/>
    </div>
  );
};
export default SidebarObject;
