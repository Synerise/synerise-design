import { generateUuid } from '@synerise/ds-utils';

export const Row = () => <li key={generateUuid()}>row</li>;
