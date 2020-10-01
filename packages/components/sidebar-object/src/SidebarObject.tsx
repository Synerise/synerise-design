import * as React from 'react';
import Tabs from '@synerise/ds-tabs';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import Scrollbar from '@synerise/ds-scrollbar';
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
  onArrowUp,
  onArrowDown,
  onFolderSelect,
  onScrollbar,
  autoSize,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const onClearInput = (): void => {
    setValue('');
  };
  return (
    <div>
      <Scrollbar
        maxHeight={600} // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        options={{ suppressScrollY: !onScrollbar }}
      >
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
          onArrowUp={onArrowUp}
          onArrowDown={onArrowDown}
        />
        {activeTab === 0 && (
          <S.HeaderWrapper dashed={!!onFolderSelect}>
            {onFolderSelect && (
              <>
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
                      onClearInput={onClearInput}
                      searchValue={value}
                      onSearchChange={setValue}
                      onFolderSelect={onFolderSelect}
                    />
                  }
                >
                  <Button onClick={(): void => setDropdownVisible(!dropdownVisible)} mode="label-icon" type="ghost">
                    {parentFolder.name}
                    <Icon component={<AngleDownS />} />
                  </Button>
                </Dropdown>
              </>
            )}
          </S.HeaderWrapper>
        )}
        {activeTab === 0 && (
          <Content
            texts={texts}
            autoSize={autoSize}
            textDescription={textDescription}
            description={<ObjectSummary inputObject={inputObject} />}
            tags={contentTags}
          />
        )}
      </Scrollbar>
    </div>
  );
};
export default SidebarObject;
