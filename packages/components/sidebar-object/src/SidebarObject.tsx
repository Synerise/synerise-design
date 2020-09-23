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
  textDescription,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  return (
    <div>
      <Header
        avatar={avatar}
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
        inputObject={inputObject}
      />
      {activeTab === 0 && (
        <S.HeaderWrapper>
          {texts.folder}:{' '}
          <Dropdown
            overlayStyle={{ boxShadow: '0 4px 17px -3px rgba(191,191,191,1)' }}
            visible={dropdownVisible}
            overlay={
              <DropdownOverlay
                texts={texts}
                parentFolder={parentFolder}
                data={folders}
                onDropdownOutsideClick={(): void => setDropdownVisible(false)}
              />
            }
          >
            <Button onClick={(): void => setDropdownVisible(!dropdownVisible)} type="ghost">
              {parentFolder.name}
              <Icon component={<AngleDownS />} />
            </Button>
          </Dropdown>
        </S.HeaderWrapper>
      )}
      {activeTab === 0 && (
        <Content texts={texts} textDescription={textDescription} description={<ObjectSummary inputObject={inputObject} />} tags={contentTags} />
      )}
    </div>
  );
};
export default SidebarObject;
