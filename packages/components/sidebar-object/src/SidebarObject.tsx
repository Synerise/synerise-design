import * as React from 'react';
import Tabs from '@synerise/ds-tabs';
import Scrollbar from '@synerise/ds-scrollbar';
import { TabItem } from '@synerise/ds-tabs/dist/Tabs.types';
import { SidebarObjectProps } from './SidebarObject.types';
import Header from './Elements/Header/Header';
import Overview from './Elements/Overview/Overview';

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
  handleTabClick,
  disableDefaultTabContent
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <div>
      <Scrollbar
        maxHeight="100vh" // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        options={{ suppressScrollY: !onScrollbar }}
      >
        <Header
          avatar={avatar}
          preffix={headerPreffix}
          tabs={<Tabs activeTab={activeTab} tabs={headerTabs as TabItem[]} handleTabClick={(index): void  => {setActiveTab(index); handleTabClick(index)}}  />}
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
        {activeTab === 0 && !disableDefaultTabContent && (
          <Overview
          contentTags={contentTags}
          folders={folders}
          parentFolder={parentFolder}
          textDescription={textDescription}
          onFolderSelect={onFolderSelect}
          autoSize={autoSize}
          texts={texts}
          inputObject={inputObject}
          />
        )}
        {headerTabs[activeTab]?.content}
      </Scrollbar>
    </div>
  );
};
export default SidebarObject;
