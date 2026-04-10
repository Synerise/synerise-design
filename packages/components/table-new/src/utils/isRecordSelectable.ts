import type { SelectionConfig } from '../Table.types';
import { getRecordSelectionStatus } from './getRecordSelectionStatus';

export const isRecordSelectable = <TData>(
  record: TData,
  checkRowSelectionStatus?: SelectionConfig<TData>['checkRowSelectionStatus'],
) => {
  if (!checkRowSelectionStatus) {
    return true;
  }
  const { unavailable, disabled } = getRecordSelectionStatus(
    checkRowSelectionStatus,
    record,
  );
  return !(unavailable || disabled);
};
