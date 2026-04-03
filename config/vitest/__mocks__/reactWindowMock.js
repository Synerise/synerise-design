import React from 'react';
import { vi } from 'vitest';

const renderItems = (Children, itemCount, itemData) =>
  Array.from({ length: itemCount || 0 }).map((_, index) =>
    React.createElement(Children, { key: index, index, style: {}, data: itemData })
  );

const listMethods = () => ({
  scrollTo: vi.fn(),
  scrollToItem: vi.fn(),
  resetAfterIndex: vi.fn(),
});

export const FixedSizeList = React.forwardRef(({ children: Children, itemCount, itemData }, ref) => {
  React.useImperativeHandle(ref, listMethods);
  return React.createElement('div', null, renderItems(Children, itemCount, itemData));
});

export const VariableSizeList = React.forwardRef(({ children: Children, itemCount, itemData }, ref) => {
  React.useImperativeHandle(ref, listMethods);
  return React.createElement('div', null, renderItems(Children, itemCount, itemData));
});

export const FixedSizeGrid = ({ children }) => children;
export const VariableSizeGrid = ({ children }) => children;
