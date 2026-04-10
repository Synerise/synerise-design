import { type ColumnDef } from '@tanstack/react-table';

export type DataType = {
  key: string;
  address: string;
  age: number;
  name: string;
  children?: DataType[];
};
export const DATA: DataType[] = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '3',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '4',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '5',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '6',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

export const COLUMNS: ColumnDef<DataType>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    id: 'name',
  },
  {
    header: 'Age',
    accessorKey: 'age',
    id: 'age',
  },
  {
    header: 'Address',
    accessorKey: 'address',
    id: 'address',
  },
];

export const SORTABLE_COLUMNS: ColumnDef<DataType>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    id: 'name',
    enableSorting: true,
  },
  {
    header: 'Age',
    accessorKey: 'age',
    id: 'age',
    enableSorting: true,
  },
  {
    header: 'Address',
    accessorKey: 'address',
    id: 'address',
    enableSorting: false,
  },
];

export const EXPANDABLE_DATA: DataType[] = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
    children: [
      {
        key: '1-1',
        name: 'Mike Jr',
        age: 10,
        address: '10 Downing Street',
      },
    ],
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];
