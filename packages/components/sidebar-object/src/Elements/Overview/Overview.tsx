import React, { useState } from 'react';

import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { AngleDownS } from '@synerise/ds-icon';

import Content from '../Content/Content';
import DropdownOverlay from '../DropdownOverlay/DropdownOverlay';
import * as S from '../Header/Header.style';
import ObjectSummary from '../ObjectSummary/ObjectSummary';
import { type OverviewObjectProps } from './Overview.types';

const Overview = ({
  inputObject,
  contentTags,
  folders,
  foldersDisplayKey = 'name',
  foldersFilterKey = 'name',
  foldersIdKey = 'id',
  parentFolder,
  texts,
  textDescription,
  onFolderSelect,
  onDescriptionChange,
  descriptionProps = {},
  onAddFolderClick,
}: OverviewObjectProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [value, setValue] = useState('');
  const onClearInput = (): void => {
    setValue('');
  };
  return (
    <S.OverviewWrapper>
      <S.HeaderWrapper dashed={!!onFolderSelect}>
        {onFolderSelect && (
          <>
            {texts?.folder}:{' '}
            <Dropdown
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
                  onFolderSelect={(folder): void => {
                    onFolderSelect && onFolderSelect(folder);
                    setDropdownVisible(false);
                  }}
                  foldersDisplayKey={foldersDisplayKey}
                  foldersFilterKey={foldersFilterKey}
                  foldersIdKey={foldersIdKey}
                  onAddFolderClick={onAddFolderClick}
                />
              }
            >
              <Button
                onClick={(): void => setDropdownVisible(!dropdownVisible)}
                mode="label-icon"
                type="ghost"
              >
                {parentFolder?.name}
                <Icon component={<AngleDownS />} />
              </Button>
            </Dropdown>
          </>
        )}
      </S.HeaderWrapper>
      <Content
        descriptionProps={descriptionProps}
        onFolderSelect={onFolderSelect}
        texts={texts}
        onDescriptionChange={onDescriptionChange}
        textDescription={textDescription}
        mainContent={<ObjectSummary inputObject={inputObject} />}
        tags={contentTags}
      />
    </S.OverviewWrapper>
  );
};
export default Overview;
