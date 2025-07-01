import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@synerise/ds-button';
import Icon, { HideM, TaskCheckM } from '@synerise/ds-icon';

import * as S from './Mapping.styles';
import type { BaseItemType, MappingProps } from './Mapping.types';
import { BatchSelectionHeader, RowSelection, TitleRow } from './components';
import { useBatchSelection } from './hooks/useBatchSelection';
import { useTexts } from './hooks/useTexts';
import { renderCounter as defaultRenderCounter } from './utils/counter';

const Mapping = <ItemType extends BaseItemType>({
  batchSelection,
  dataSource,
  leftTitle,
  leftTitleTooltip,
  rightTitle,
  rightTitleTooltip,
  leftComponent,
  rightComponent,
  centerComponent,
  texts,
  ...htmlAttributes
}: MappingProps<ItemType>) => {
  const hasCenterComponent = !!centerComponent;
  const hasSelection = !!batchSelection;
  const isCompact = dataSource.length === 1;
  const [selectionEnabled, setSelectionEnabled] = useState(false);
  const allTexts = useTexts(texts);
  const {
    selectedItemIds,
    setSelectedItemIds,
    handleBatchCheckboxChange,
    batchSelectionCheckboxState,
  } = useBatchSelection(dataSource, hasSelection);

  const {
    actionButtons,
    onSelectionChange,
    renderCounter = defaultRenderCounter,
  } = batchSelection || {};

  const handleItemSelection = (checked: boolean, id: ItemType['id']) => {
    if (checked) {
      setSelectedItemIds([...selectedItemIds, id]);
    } else {
      setSelectedItemIds(selectedItemIds.filter((itemId) => itemId !== id));
    }
  };

  const toggleBatchButton = useCallback(
    (newState: boolean) => {
      setSelectionEnabled(newState);
      setSelectedItemIds([]);
    },
    [setSelectedItemIds],
  );

  const batchButton = useMemo(() => {
    return (
      <Button
        data-testid="toggle-bulk-actions"
        type="ghost"
        mode="icon-label"
        onClick={() => toggleBatchButton(!selectionEnabled)}
      >
        {selectionEnabled ? (
          <>
            <Icon component={<HideM />} /> {allTexts.disableBatchSelection}
          </>
        ) : (
          <>
            <Icon component={<TaskCheckM />} /> {allTexts.enableBatchSelection}
          </>
        )}
      </Button>
    );
  }, [
    allTexts.disableBatchSelection,
    allTexts.enableBatchSelection,
    selectionEnabled,
    toggleBatchButton,
  ]);

  useEffect(() => {
    onSelectionChange && onSelectionChange(selectedItemIds);
  }, [onSelectionChange, selectedItemIds]);

  return (
    <S.MappingWrapper isCompact={isCompact} {...htmlAttributes}>
      {batchSelection && (
        <BatchSelectionHeader
          checkboxState={batchSelectionCheckboxState}
          onChange={handleBatchCheckboxChange}
          actionButtons={actionButtons}
          batchButton={batchButton}
          enabled={selectionEnabled}
          counter={renderCounter(selectedItemIds.length, dataSource.length)}
        />
      )}
      {(leftTitle || rightTitle) && (
        <TitleRow
          leftTitle={leftTitle}
          rightTitle={rightTitle}
          leftTitleTooltip={leftTitleTooltip}
          rightTitleTooltip={rightTitleTooltip}
          hasCenterComponent={hasCenterComponent}
          hasSelection={hasSelection && selectionEnabled}
        />
      )}
      {dataSource.map((item, index) => (
        <S.MappingRow key={item.id}>
          {hasSelection && selectionEnabled && (
            <RowSelection
              checkboxState={selectedItemIds.includes(item.id)}
              itemId={item.id}
              onChange={handleItemSelection}
            />
          )}
          <S.MappingRowLeft>{leftComponent({ item, index })}</S.MappingRowLeft>
          {hasCenterComponent && (
            <S.MappingRowCenter>
              {centerComponent({ item, index })}
            </S.MappingRowCenter>
          )}
          <S.MappingRowRight>
            {rightComponent({ item, index })}
          </S.MappingRowRight>
        </S.MappingRow>
      ))}
    </S.MappingWrapper>
  );
};
export default Mapping;
