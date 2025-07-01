import { type RowSelection } from '../Table.types';

export const getRecordSelectionStatus = <T>(
  checkRowSelectionStatus: RowSelection<T>['checkRowSelectionStatus'],
  record: T,
) => {
  const { unavailable, disabled } =
    (checkRowSelectionStatus && checkRowSelectionStatus(record)) || {};
  return { unavailable, disabled };
};
