import { v4 as uuid } from 'uuid';

export const Row = () => <li key={uuid()}>row</li>;
