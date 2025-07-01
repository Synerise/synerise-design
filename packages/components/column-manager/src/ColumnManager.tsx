import React, { useEffect, useMemo, useState } from 'react';

import Button from '@synerise/ds-button';
import { useTheme } from '@synerise/ds-core';
import Drawer from '@synerise/ds-drawer';
import Icon, { CloseM, SearchM } from '@synerise/ds-icon';
import { Title } from '@synerise/ds-typography';

import * as S from './ColumnManager.styles';
import type { ColumnManagerProps } from './ColumnManager.types';
import { ColumnManagerActions } from './ColumnManagerActions/ColumnManagerActions';
import type {
  Column,
  ColumnManagerItemProps,
} from './ColumnManagerItem/ColumManagerItem.types';
import ColumnManagerList from './ColumnManagerList/ColumnManagerList';
import { useTranslations } from './hooks/useTranslations';
import { matchesSearchQuery } from './utils/matchesSearchQuery';

const ColumnManager = <ColumnType extends Column>({
  columns,
  texts: customTexts,
  onApply,
  visible,
  hide,
  draggable = true,
}: ColumnManagerProps<ColumnType>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentColumns, setCurrentColumns] = useState(columns);
  const texts = useTranslations(customTexts);
  const theme = useTheme();

  useEffect(() => {
    setCurrentColumns(columns);
  }, [columns]);

  useEffect(() => {
    if (!visible) {
      setCurrentColumns(columns);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleApply = () => {
    onApply(currentColumns);
  };

  const handleCancel = () => {
    hide();
  };

  const handleToggleColumn = (id: string, updatedVisible: boolean) => {
    setCurrentColumns(
      currentColumns.map((column) =>
        column.id === id
          ? {
              ...column,
              visible: updatedVisible,
            }
          : column,
      ),
    );
  };

  const handleOrderChange = (
    newOrder: ColumnManagerItemProps<ColumnType>[],
  ) => {
    const idOrder = newOrder.map((item) => item.id);
    const updatedColumns = [...currentColumns].sort(
      (a: Column, b: Column) => idOrder.indexOf(a.id) - idOrder.indexOf(b.id),
    );
    setCurrentColumns(updatedColumns);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredColumns = useMemo(() => {
    return searchQuery
      ? currentColumns.filter((column) =>
          matchesSearchQuery(column.name, searchQuery),
        )
      : currentColumns;
  }, [currentColumns, searchQuery]);

  return (
    <S.ColumnManager visible={visible} width={338} onClose={hide}>
      <Drawer.DrawerHeader>
        <Drawer.DrawerHeaderBar>
          <Title style={{ flex: 1, margin: 0 }} level={4}>
            {texts.title}
          </Title>
          <Button
            data-testid="ds-column-manager-close"
            style={{ marginLeft: '8px' }}
            mode="single-icon"
            type="ghost"
            onClick={hide}
          >
            <Icon component={<CloseM />} />
          </Button>
        </Drawer.DrawerHeaderBar>
      </Drawer.DrawerHeader>
      <S.SearchBar
        onSearchChange={handleSearchChange}
        placeholder={texts.searchPlaceholder}
        value={searchQuery}
        onClearInput={() => handleSearchChange('')}
        iconLeft={
          <Icon component={<SearchM />} color={theme.palette['grey-600']} />
        }
        clearTooltip={(texts.searchClearTooltip as string) || ''}
      />
      <S.ColumnManagerListWrapper>
        <Drawer.DrawerContent style={{ padding: '0', height: '100%' }}>
          <ColumnManagerList
            texts={texts}
            draggable={draggable}
            handleOrderChange={handleOrderChange}
            searchQuery={searchQuery}
            columns={filteredColumns}
            toggleColumn={handleToggleColumn}
          />
        </Drawer.DrawerContent>
      </S.ColumnManagerListWrapper>
      <ColumnManagerActions
        onApply={handleApply}
        onCancel={handleCancel}
        texts={texts}
      />
    </S.ColumnManager>
  );
};
export default ColumnManager;
