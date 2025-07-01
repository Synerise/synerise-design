import type { RowSelection } from '../Table.types';
import { getRecordSelectionStatus } from './getRecordSelectionStatus';

export const isRecordSelectable = <T>(
  record: T,
  checkRowSelectionStatus?: RowSelection<T>['checkRowSelectionStatus'],
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
