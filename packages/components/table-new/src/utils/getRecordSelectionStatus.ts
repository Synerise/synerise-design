import { type SelectionConfig } from '../Table.types';

export const getRecordSelectionStatus = <TData>(
  checkRowSelectionStatus: SelectionConfig<TData>['checkRowSelectionStatus'],
  record: TData,
) => {
  const { unavailable, disabled } =
    (checkRowSelectionStatus && checkRowSelectionStatus(record)) || {};
  return { unavailable, disabled };
};
