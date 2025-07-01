import React from 'react';

import Scrollbar from '@synerise/ds-scrollbar';
import Tabs from '@synerise/ds-tabs';
import { type TabItem } from '@synerise/ds-tabs/dist/Tabs.types';

import Header from './Elements/Header/Header';
import { HeaderType } from './Elements/Header/Header.types';
import * as S from './SidebarObject.style';
import { type SidebarObjectProps } from './SidebarObject.types';

const SidebarObject = ({
  avatar,
  headerPreffix,
  headerTabs,
  inputObject,
  inlineEditInputProps,
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
  inputObjectIdKey = 'id',
  additionalNode,
  activeTab = 0,
  headerType = HeaderType.READONLY,
  typeButtons,
  onCancelClick,
  onApplyClick,
}: SidebarObjectProps) => {
  return (
    <S.SidebarObjectWrapper>
      <Header
        avatar={avatar}
        preffix={headerPreffix}
        tabs={
          headerTabs?.length ? (
            <Tabs
              activeTab={activeTab}
              tabs={headerTabs as TabItem[]}
              handleTabClick={(index): void => {
                handleTabClick && handleTabClick(index);
              }}
            />
          ) : null
        }
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onEdit={onEdit}
        onMove={onMove}
        onId={onId}
        texts={texts}
        onCloseClick={onCloseClick}
        onCancelClick={onCancelClick}
        onApplyClick={onApplyClick}
        inputObject={inputObject}
        inputObjectIdKey={inputObjectIdKey || 'id'}
        inlineEditInputProps={inlineEditInputProps}
        onArrowUp={onArrowUp}
        onArrowDown={onArrowDown}
        name={name}
        additionalNode={additionalNode}
        onRename={onRename}
        type={headerType}
        typeButtons={typeButtons}
      />
      <Scrollbar
        absolute
        maxHeight="100vh"
        // @ts-expect-error Property 'options' does not exist on type
        options={{ suppressScrollY: !withScrollbar }}
      >
        {headerTabs[activeTab]?.content && (
          <S.ContentContainer>
            {headerTabs[activeTab]?.content}
          </S.ContentContainer>
        )}
      </Scrollbar>
      <S.ContentPlaceholder />
      {!!footer && <S.FooterContainer> {footer} </S.FooterContainer>}
    </S.SidebarObjectWrapper>
  );
};
export default SidebarObject;
