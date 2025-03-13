import { useMemo, useState } from 'react';
import type { BaseItemType } from '../Mapping.types';

export const useBatchSelection = <ItemType extends BaseItemType>(
  dataSource: Array<ItemType>,
  hasBatchSelection?: boolean
) => {
  const [selectedItemIds, setSelectedItemIds] = useState<Array<ItemType['id']>>([]);

  const handleBatchCheckboxChange = (newVal: boolean | undefined) => {
    if (newVal === true) {
      setSelectedItemIds(dataSource.map(item => item.id));
      return;
    }
    if (newVal === false) {
      setSelectedItemIds([]);
    }
  };

  const batchSelectionCheckboxState = useMemo(() => {
    if (hasBatchSelection) {
      switch (dataSource.length - selectedItemIds.length) {
        case 0:
          return !!dataSource.length;
        case dataSource.length:
          return false;
        default:
          return undefined;
      }
    }
    return undefined;
  }, [dataSource, selectedItemIds, hasBatchSelection]);

  return {
    selectedItemIds,
    batchSelectionCheckboxState,
    setSelectedItemIds,
    handleBatchCheckboxChange,
  };
};
