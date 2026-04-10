import { type SortDirection } from '@tanstack/react-table';

export const ASCENDING: SortDirection = 'asc';
export const DESCENDING: SortDirection = 'desc';

export const STRING_SORTING_FN = [
  'text',
  'alphanumeric',
  'alphanumericCaseSensitive',
  'textCaseSensitive',
];
