import { getRecordSelectionStatus } from './getRecordSelectionStatus';
import type { RowSelection } from '../Table.types';

export const isRecordSelectable = <T>(
  record: T,
  checkRowSelectionStatus?: RowSelection<T>['checkRowSelectionStatus']
) => {
  if (!checkRowSelectionStatus) {
    return true;
  }
  const { unavailable, disabled } = getRecordSelectionStatus(checkRowSelectionStatus, record);
  return !(unavailable || disabled);
};
