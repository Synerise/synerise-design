import { v4 as uuid } from 'uuid';

export const Row = () => <li data-trace={uuid()}>row</li>;
