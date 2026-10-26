import { v4 as uuid } from 'uuid';

export const Row = ({ id }: { id?: string }) => <li key={id || uuid()}>row</li>;
