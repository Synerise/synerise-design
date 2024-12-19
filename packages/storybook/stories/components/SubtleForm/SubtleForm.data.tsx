import React from 'react';

export const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};

export const Cities = ['Berlin', 'Chicago', 'Denver', 'Geneva', 'New York'];