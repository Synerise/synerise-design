import * as React from 'react';
import Tabs from '@synerise/ds-tabs';
import Scrollbar from '@synerise/ds-scrollbar';
import { TabItem } from '@synerise/ds-tabs/dist/Tabs.types';
import { SidebarObjectProps } from './SidebarObject.types';
import Header from './Elements/Header/Header';
import * as S from './SidebarObject.style'

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
  withScrollbar,
  handleTabClick,
  footer,
  name,
  onRename,
  activeTab= 0
}) => {
  return (
    <S.SidebarObjectWrapper>
      <Scrollbar
        maxHeight="100vh" // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        options={{ suppressScrollY: !withScrollbar }}
      >
        <Header
          avatar={avatar}
          preffix={headerPreffix}
          tabs={headerTabs?.length ?<Tabs activeTab={activeTab} tabs={headerTabs as TabItem[]} handleTabClick={(index): void  => { handleTabClick(index)}}/> : null}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onEdit={onEdit}
          onMove={onMove}
          onId={onId}
          texts={texts}
          onCloseClick={onCloseClick}
          inputObject={inputObject}
          onArrowUp={onArrowUp}
          onArrowDown={onArrowDown}
          name={name}
          onRename={onRename}
        />
        {headerTabs[activeTab]?.content && <S.ContentContainer>{headerTabs[activeTab]?.content}</S.ContentContainer> }
      </Scrollbar>
      <S.ContentPlaceholder/>
      {!!footer && <S.FooterContainer> {footer} </S.FooterContainer>}
    </S.SidebarObjectWrapper>
  );
};
export default SidebarObject;
