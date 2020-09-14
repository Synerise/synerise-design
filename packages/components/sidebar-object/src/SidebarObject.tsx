import * as React from 'react';
import Tabs from '@synerise/ds-tabs';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import { SidebarObjectProps } from './SidebarObject.types';
import Header from './Elements/Header/Header';
import Content from './Elements/Content/Content';
import ObjectSummary from './Elements/ObjectSummary/ObjectSummary';
import DropdownOverlay from './Elements/Header/Dropdown/DropdownOverlay';
import * as S from './Elements/Header/Header.style';

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
  parentFolder,
  texts,
  onCloseClick,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <div>
      <Header
        avatar={avatar}
        name={name}
        preffix={headerPreffix}
        tabs={<Tabs activeTab={activeTab} tabs={headerTabs} handleTabClick={setActiveTab} />}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onEdit={onEdit}
        onMove={onMove}
        onId={onId}
        texts={texts}
        activeTab={activeTab}
        onCloseClick={onCloseClick}
      />
      {activeTab === 0 && (
        <S.HeaderWrapper>
          Folder:{' '}
          <Dropdown
            overlayStyle={{ boxShadow: '0 4px 17px -3px rgba(191,191,191,1)' }}
            overlay={<DropdownOverlay texts={texts} parentFolder={parentFolder} data={folders} />}
          >
            <Button type="ghost">
              {parentFolder.name}
              <Icon component={<AngleDownS />} />
            </Button>
          </Dropdown>
        </S.HeaderWrapper>
      )}
      {activeTab === 0 && (
        <Content texts={texts} description={<ObjectSummary inputObject={inputObject} />} tags={contentTags} />
      )}
    </div>
  );
};
export default SidebarObject;
