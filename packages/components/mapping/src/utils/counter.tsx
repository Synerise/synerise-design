import React from 'react';

export const renderCounter = (selected: number, total: number) => {
  if (selected === 0) {
    return <>{total} Items</>;
  }
  return <>{selected} Selected</>;
};
