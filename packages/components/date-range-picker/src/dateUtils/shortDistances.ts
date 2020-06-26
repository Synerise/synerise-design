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

export const shortDistances = moment => {
  moment.updateLocale('en', {
    relativeTime: defaultShortDistance,
  });
  moment.updateLocale('pl', {
    relativeTime: defaultShortDistance,
  });
};
