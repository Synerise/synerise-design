import uniqueId from 'lodash/uniqueId';

export const Row = () => <li key={uniqueId('row-')}>row</li>;
