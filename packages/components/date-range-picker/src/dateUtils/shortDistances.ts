import * as moment from 'moment';

const defaultShortDistance = {
  future: 'in %s',
  past: '%s ',
  s: '%ds',
  ss: '%ds',
  m: '%dm',
  mm: '%dm',
  h: '%dh',
  hh: '%dh',
  d: '%dd',
  dd: '%dd',
  M: '%dM',
  MM: '%dM',
  y: '%dy',
  yy: '%dy',
};

const shortDistances = (m: typeof moment): void => {
  m.updateLocale('en', {
    relativeTime: defaultShortDistance,
  });
  m.updateLocale('pl', {
    relativeTime: defaultShortDistance,
  });
};
export default shortDistances;