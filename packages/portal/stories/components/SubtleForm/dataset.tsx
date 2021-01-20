import { StatusProps } from '@synerise/ds-status/dist/Status.types';

export const Cities = ['Berlin', 'Chicago', 'Denver', 'Geneva', 'New York'];
export const Countries: { name: string; code: string; prefix: string }[] = [
  { name: 'Argentina', code: 'AR', prefix: '+123' },
  { name: 'Brazil', code: 'BR', prefix: '+123' },
  { name: 'European Union', code: 'EU', prefix: '+456' },
];
export const Statuses: StatusProps[] = [
  { label: 'Active', type: 'success' },
  { label: 'Inactive', type: 'danger' },
  { label: 'Paused', type: 'warning' },
];
