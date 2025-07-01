import lensPath from 'ramda/src/lensPath';
import set from 'ramda/src/set';

export const setFuture = set(lensPath(['future']));
