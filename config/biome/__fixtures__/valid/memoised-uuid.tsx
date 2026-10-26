import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

export const Field = () => {
  const id = useMemo(() => uuid(), []);
  return <input id={id} key="field" />;
};
