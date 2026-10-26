import { v4 } from 'uuid';

export const Row = () => <li key={v4()}>row</li>;
