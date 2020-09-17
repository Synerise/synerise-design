
export interface Props<T extends unknown> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  header: any;
  activeColumnKey?: string;
  sortColumn: (column: T) => void;
}
