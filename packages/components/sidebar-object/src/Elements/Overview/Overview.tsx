import React, { useMemo, useState } from 'react';

import Button from '@synerise/ds-button';
import { useTheme } from '@synerise/ds-core';
import { DropdownMenu } from '@synerise/ds-dropdown';
import Icon, { Add3M, AngleDownS, FolderM } from '@synerise/ds-icon';

import Content from '../Content/Content';
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
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(
    () =>
      folders.filter(
        (item) =>
          typeof item[foldersFilterKey] === 'string' &&
          (item[foldersFilterKey] as string)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      ),
    [folders, foldersFilterKey, searchQuery],
  );

  const menuDataSource = useMemo(() => {
    return filteredData.map((item) => ({
      key: `${item[foldersIdKey]}-${item.id}`,
      onClick: () => onFolderSelect(item),
      checked: parentFolder[foldersIdKey] === item[foldersIdKey],
      prefixel: <Icon component={<FolderM />} />,
      // highlight: value,
      text: item[foldersDisplayKey],
      ...item,
    }));
  }, [
    filteredData,
    foldersDisplayKey,
    foldersIdKey,
    onFolderSelect,
    parentFolder,
  ]);

  return (
    <S.OverviewWrapper>
      <S.HeaderWrapper dashed={!!onFolderSelect}>
        {/* @ts-expect-error tbd whether this was meant to be optional or not */}
        {onFolderSelect && (
          <>
            {texts?.folder}:{' '}
            <DropdownMenu
              withSearch
              popoverProps={{
                testId: 'sidebar-object-folders',
              }}
              asChild
              dataSource={menuDataSource}
              itemMatchesSearchQuery={() => true}
              onSearchQueryChange={setSearchQuery}
              footer={
                onAddFolderClick
                  ? {
                      left: (
                        <Button
                          type="ghost"
                          mode="icon-label"
                          onClick={() => onAddFolderClick(searchQuery)}
                        >
                          <Icon
                            component={<Add3M />}
                            size={24}
                            color={theme.palette['grey-500']}
                          />
                          <div>{texts.addFolder}</div>
                        </Button>
                      ),
                    }
                  : undefined
              }
            >
              <Button mode="label-icon" type="ghost">
                {parentFolder?.name}
                <Icon component={<AngleDownS />} />
              </Button>
            </DropdownMenu>
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
