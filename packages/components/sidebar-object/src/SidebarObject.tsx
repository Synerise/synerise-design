import * as React from 'react';
import Tabs from '@synerise/ds-tabs';
import Scrollbar from '@synerise/ds-scrollbar';
import { TabItem } from '@synerise/ds-tabs/dist/Tabs.types';
import { SidebarObjectProps } from './SidebarObject.types';
import Header from './Elements/Header/Header';

const SidebarObject: React.FC<SidebarObjectProps> = ({
  avatar,
  headerPreffix,
  headerTabs,
  inputObject,
  onEdit,
  onDelete,
  onDuplicate,
  onMove,
  onId,
  texts,
  onCloseClick,
  onArrowUp,
  onArrowDown,
  onScrollbar,
  handleTabClick,
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
        {headerTabs[activeTab]?.content}
      </Scrollbar>
    </div>
  );
};
export default SidebarObject;
