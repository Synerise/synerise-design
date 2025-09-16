import React, { type ReactNode } from 'react';

import escapeRegEx from '../regex/regex';

export const renderWithHighlight = (
  name: string,
  highlight?: string,
  className = 'string-highlight',
  testId = 'string-highlight',
): ReactNode => {
  if (!highlight || highlight === '') {
    return name;
  }
  const index = name.toLocaleLowerCase().indexOf(highlight.toLocaleLowerCase());
  if (index === -1) {
    return name;
  }
  const escapedHighlight = escapeRegEx(highlight);
  const startOfQuery = name
    .toLocaleLowerCase()
    .search(escapedHighlight.toLowerCase());
  const endOfQuery = startOfQuery + highlight.length;
  const resultArray = [
    name.substring(0, startOfQuery),
    <span key={name} className={className} data-testid={testId}>
      {name.substring(startOfQuery, endOfQuery)}
    </span>,
    name.substring(endOfQuery, name.length),
  ];
  return resultArray;
};
