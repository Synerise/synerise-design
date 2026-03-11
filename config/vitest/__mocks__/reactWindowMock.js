import React from 'react';

export const FixedSizeList = ({ children, itemCount, itemData }) =>
  React.createElement(
    'div',
    null,
    Array.isArray(itemData)
      ? itemData.map((item, index) => children({ index, style: {}, data: itemData }))
      : Array.from({ length: itemCount || 0 }).map((_, index) =>
        children({ index, style: {}, data: itemData })
      )
  );

export const VariableSizeList = ({ children, itemCount, itemData }) =>
  React.createElement(
    'div',
    null,
    Array.from({ length: itemCount || 0 }).map((_, index) =>
      children({ index, style: {}, data: itemData })
    )
  );

export const FixedSizeGrid = ({ children }) => children;
export const VariableSizeGrid = ({ children }) => children;
