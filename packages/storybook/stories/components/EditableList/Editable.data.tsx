import React from 'react';

export const dataSource = ['Score', 'Season', 'Theme', 'Departament'];

export const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};

export const validationTypes = {
  none: undefined,
  numberOnly: (val: string) => val && !/^[0-9]+$/.test(val) ? 'Invalid input' : null,
  stringOnly: (val: string) => val && !/^[a-zA-Z_]+$/.test(val) ? 'Invalid input' : null,
}