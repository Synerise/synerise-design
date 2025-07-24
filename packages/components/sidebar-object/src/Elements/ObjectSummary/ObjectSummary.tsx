import React from 'react';

import Description, { DescriptionRow } from '@synerise/ds-description';

import { type ObjectSummaryProps } from './ObjectSummary.types';

const ObjectSummary = ({ inputObject }: ObjectSummaryProps) => {
  const keys = Object.keys(inputObject) as Array<keyof typeof inputObject>;
  return (
    <Description>
      {keys.map((key) => (
        <DescriptionRow
          key={key}
          label={key === 'id' ? key.toUpperCase() : key}
          value={inputObject[key]}
        />
      ))}
    </Description>
  );
};

export default ObjectSummary;
