import lensPath from 'ramda/src/lensPath.js';
import set from 'ramda/src/set.js';

export const setFuture = set(lensPath(['future']));
